import { Prisma, VeritasService } from '@discover/models/veritas';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PlatformService } from '../../platform/providers/platform.service';
import { TagService } from '../../tag/providers/tag.service';
import { CreateMeetDTO } from '../dto/createMeet.dto';
import { UpdateMeetDTO } from '../dto/updateMeet.dto';

@Injectable()
export class MeetService {
  constructor(
    private prisma: VeritasService,
    private tagService: TagService,
    private platformService: PlatformService
  ) {}

  private meetSelect: Prisma.MeetSelect = {
    id: true,
    title: true,
    description: true,
    followCount: true,
    bannerUrl: true,
    startAt: true,
    endAt: true,
    recurrent: true,
    enabled: true,
    profile: {
      select: {
        id: true,
        name: true,
        secondName: true,
      },
    },
    tags: {
      select: {
        typedName: true,
      },
    },
    category: {
      select: {
        name: true,
      },
    },
    platforms: {
      select: {
        platform: {
          select: {
            name: true,
          },
        },
      },
    },
  };

  async findAll() {
    return this.prisma.meet.findMany({
      select: this.meetSelect,
    });
  }

  async findAllByProfileId(profileId: number) {
    return this.prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        meets: true,
        subscriptions: {
          select: {
            meet: true,
          },
        },
      },
    });
  }

  async findOne(meetId: number) {
    return this.prisma.meet.findUnique({
      where: { id: meetId },
      select: this.meetSelect,
    });
  }

  async create(profileId: number, meet: CreateMeetDTO) {
    const { tagNames } = meet;
    const platformIds = meet.platformIds;
    const meetInfo = { ...meet };

    delete meetInfo.tagNames;
    delete meetInfo.categoryId;
    delete meetInfo.platformIds;

    const existPlatform = await this.platformService.exist(platformIds);

    if (!existPlatform) {
      throw new BadRequestException('Some platform does not exist');
    }

    const tagsToSave = await Promise.all(
      tagNames.map(async (tag) => {
        const savedTag = await this.tagService.findOne(tag.name);

        return {
          typedName: savedTag.typedName,
          tagId: savedTag.tag.id,
        } as Prisma.MeetTagCreateManyMeetInput;
      })
    );

    const meetToCreate: Prisma.MeetCreateInput = {
      ...meetInfo,
      startAt: new Date(meetInfo.startAt),
      category: {
        connect: {
          id: meetInfo.categoryId || 1,
        },
      },
      tags: {
        createMany: {
          data: tagsToSave,
        },
      },
      profile: {
        connect: {
          id: Number(profileId),
        },
      },
      platforms: {
        createMany: {
          data: platformIds.map((id) => ({ platformId: id })),
        },
      },
    };

    return await this.prisma.meet.create({
      data: meetToCreate,
      select: this.meetSelect,
    });
  }

  async update(profileId: number, meet: UpdateMeetDTO) {
    const meetInfo = { ...meet };
    const { tagNames } = meet;
    const platformIds = meet.platformIds;
    const meetId = meetInfo.id;

    const existPlatform = await this.platformService.exist(platformIds);

    if (!existPlatform) {
      throw new BadRequestException('Some platform does not exist');
    }

    delete meetInfo.tagNames;
    delete meetInfo.categoryId;
    delete meetInfo.id;
    delete meetInfo.platformIds;

    const meetToUpdate = await this.prisma.meet.findFirst({
      where: { id: meet.id, profileId: profileId },
      include: {
        category: true,
        tags: {
          select: {
            tag: true,
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
      tagNames.map(async (tag) => {
        const savedTag = await this.tagService.findOne(tag.name);

        return {
          create: {
            typedName: savedTag.typedName,
            tag: {
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
      category: {
        connect: {
          id: meetInfo.categoryId || 1,
        },
      },
      platforms: {
        createMany: {
          data: platformIds.map((id) => ({ platformId: id })),
        },
      },
      ...(tagNames.length > 0 && {
        tags: {
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
