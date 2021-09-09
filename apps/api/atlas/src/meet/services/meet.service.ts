import { Prisma, VeritasService } from '@discover/models-veritas';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TagService } from '../../tag/providers/tag.service';
import { CreateMeetDTO } from '../dto/createMeet.dto';
import { UpdateMeetDTO } from '../dto/updateMeet.dto';

@Injectable()
export class MeetService {
  constructor(private prisma: VeritasService, private tagService: TagService) {}

  private meetSelect = {
    id: true,
    title: true,
    description: true,
    followCount: true,
    bannerUrl: true,
    startAt: true,
    endAt: true,
    recurrent: true,
    enabled: true,
    MeetTag: {
      select: {
        typedName: true,
        Tag: {
          select: {
            name: true,
          },
        },
      },
    },
    Category: {
      select: {
        name: true,
      },
    },
  };

  async findAll() {
    return this.prisma.meet.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        followCount: true,
        bannerUrl: true,
        startAt: true,
        endAt: true,
        recurrent: true,
        enabled: true,
        MeetTag: {
          select: {
            typedName: true,
            Tag: {
              select: {
                name: true,
              },
            },
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findOne(meetId: number) {
    return this.prisma.meet.findUnique({
      where: { id: meetId },
      select: {
        id: true,
        title: true,
        description: true,
        followCount: true,
        bannerUrl: true,
        startAt: true,
        endAt: true,
        recurrent: true,
        enabled: true,
        MeetTag: {
          select: {
            typedName: true,
            Tag: {
              select: {
                name: true,
              },
            },
          },
        },
        Category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async create(profileId: number, meet: CreateMeetDTO) {
    const { tags } = meet;

    const tagsToSave = await Promise.all(
      tags.map(async (tag) => {
        const savedTag = await this.tagService.findOne(tag.name);

        return {
          typedName: savedTag.typedName,
          tagId: savedTag.tag.id,
        } as Prisma.MeetTagCreateManyMeetInput;
      })
    );

    const meetInfo = { ...meet };

    delete meetInfo.tags;
    delete meetInfo.categoryId;

    const meetToCreate: Prisma.MeetCreateInput = {
      ...meetInfo,
      startAt: new Date(meetInfo.startAt),
      Category: {
        connect: {
          id: meetInfo.categoryId || 1,
        },
      },
      MeetTag: {
        createMany: {
          data: tagsToSave,
        },
      },
      Profile: {
        connect: {
          id: Number(profileId),
        },
      },
    };

    return await this.prisma.meet.create({
      data: meetToCreate,
      select: this.meetSelect,
    });
  }

  async update(profileId: number, meet: UpdateMeetDTO) {
    const { tags } = meet;
    const meetInfo = { ...meet };
    const meetId = meetInfo.id;

    delete meetInfo.tags;
    delete meetInfo.categoryId;
    delete meetInfo.id;

    const meetToUpdate = await this.prisma.meet.findFirst({
      where: { id: meet.id, profileId: profileId },
      include: {
        Category: true,
        MeetTag: {
          select: {
            Tag: true,
            typedName: true,
          },
        },
      },
    });

    await this.prisma.meetTag.deleteMany({
      where: {},
    });

    if (!meetToUpdate) {
      throw new BadRequestException('Meet does not exist');
    }

    const tagsToSave = await Promise.all(
      tags.map(async (tag) => {
        const savedTag = await this.tagService.findOne(tag.name);

        return {
          create: {
            typedName: savedTag.typedName,
            Tag: {
              connect: {
                id: savedTag.tag.id,
              },
            },
          },
          where: {
            meetId_tagId: {
              meetId: meetId,
              tagId: savedTag.tag.id,
            },
          },
        } as Prisma.MeetTagCreateOrConnectWithoutMeetInput;
      })
    );

    const updatedMeet: Prisma.MeetUpdateInput = {
      ...meetInfo,
      startAt: new Date(meetInfo.startAt),
      Category: {
        connect: {
          id: meetInfo.categoryId || 1,
        },
      },
      ...(tags.length > 0 && {
        MeetTag: {
          connectOrCreate: tagsToSave,
        },
      }),
    };

    return await this.prisma.meet.update({
      where: { id: meetId },
      data: updatedMeet,
      select: this.meetSelect,
    });
  }
}
