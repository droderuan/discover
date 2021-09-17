import { VeritasService } from '@discover/models-veritas';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserProfileDTO } from '../dto/updateUserProfile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: VeritasService) {}

  async getUserProfile(profileId: number) {
    if (!profileId) {
      throw new BadRequestException('Profile id can not be empty');
    }

    return this.prisma.profile.findFirst({
      where: {
        id: Number(profileId),
      },
      select: {
        id: true,
        name: true,
        secondName: true,
        description: true,
        profileImage: true,
        meets: true,
        subscriptions: true,
        categories: true,
        follows: {
          select: {
            followingProfile: {
              select: {
                id: true,
                name: true,
                secondName: true,
                description: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  }

  async updateUserProfile(profileId: number, data: UpdateUserProfileDTO) {
    const userProfile = await this.prisma.profile.findFirst({
      where: {
        id: Number(profileId),
      },
      include: {
        user: true,
      },
    });

    if (!userProfile) {
      throw new BadRequestException('Profile does not exist');
    }

    return this.prisma.profile.update({
      where: {
        id: Number(profileId),
      },
      data,
    });
  }

  async followProfile(userProfileId: number, profileToFollowId: number) {
    if (userProfileId === profileToFollowId) {
      throw new BadRequestException('Can not follow yourself');
    }

    const profilesToConnect = await this.prisma.profile.findMany({
      where: {
        OR: [
          {
            id: Number(userProfileId),
          },
          {
            id: Number(profileToFollowId),
          },
        ],
      },
    });

    if (!profilesToConnect || profilesToConnect.length < 2) {
      throw new BadRequestException(
        'One or more of the profiles does not exist'
      );
    }

    await this.prisma.follow.create({
      data: {
        profileId: Number(userProfileId),
        followProfileId: Number(profileToFollowId),
      },
    });
  }

  async unfollowProfile(userProfileId: number, profileToFollowId: number) {
    if (userProfileId === profileToFollowId) {
      throw new BadRequestException('Can not unFollow yourself');
    }

    const profilesToConnect = await this.prisma.profile.findMany({
      where: {
        OR: [
          {
            id: Number(userProfileId),
          },
          {
            id: Number(profileToFollowId),
          },
        ],
      },
    });

    if (!profilesToConnect || profilesToConnect.length < 2) {
      throw new BadRequestException(
        'One or more of the profiles does not exist'
      );
    }

    await this.prisma.follow.delete({
      where: {
        profileId_followProfileId: {
          profileId: Number(userProfileId),
          followProfileId: Number(profileToFollowId),
        },
      },
    });
  }
}
