import { Prisma, VeritasService } from '@discover/models-veritas';
import { Injectable } from '@nestjs/common';
import { TagService } from '../../tag/providers/tag.service';
import { CreateMeetDTO } from '../dto/createMeet.dto';

@Injectable()
export class MeetService {
  constructor(private prisma: VeritasService, private tagService: TagService) {}

  async listOneMeet(meetId: number) {
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

  async createMeet(profileId: number, meet: CreateMeetDTO) {
    const { tags } = meet;

    const tagsToSave = await Promise.all(
      tags.map(async (tag) => {
        const savedTag = await this.tagService.create(tag.name);

        return {
          typedName: savedTag.name,
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
}
