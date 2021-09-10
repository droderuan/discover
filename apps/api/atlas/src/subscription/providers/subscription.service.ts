import { VeritasService } from '@discover/models-veritas';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: VeritasService) {}

  async subscribe(profileId: number, meetId: number) {
    const meet = await this.prisma.meet.findFirst({
      where: {
        id: meetId,
        profileId: {
          not: profileId,
        },
        subscriptions: {
          none: {
            profileId,
          },
        },
      },
    });

    if (!meet) {
      throw new BadRequestException(
        'Meet does not exist or the profile is already subscribed or you are trying to subscribe to your own meet'
      );
    }

    await this.prisma.meet.update({
      where: {
        id: meetId,
      },
      data: {
        subscriptions: {
          create: {
            profileId,
          },
        },
        followCount: {
          increment: 1,
        },
      },
    });
  }

  async unSubscribe(profileId: number, meetId: number) {
    const meet = await this.prisma.meet.findFirst({
      where: {
        id: meetId,
        profileId: {
          not: profileId,
        },
        subscriptions: {
          some: {
            profileId,
          },
        },
      },
    });

    if (!meet) {
      throw new BadRequestException(
        'Meet does not exist or the profile is already unSubscribed or you are trying to unSubscribe to your own meet'
      );
    }

    await this.prisma.meet.update({
      where: {
        id: meetId,
      },
      data: {
        subscriptions: {
          delete: {
            profileId_meetId: {
              meetId,
              profileId,
            },
          },
        },
        followCount: {
          increment: 1,
        },
      },
    });
  }
}
