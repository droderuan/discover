import { JwtAuthGuard } from '@discover/shared/nest';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateUserProfileDTO } from '../dto/updateUserProfile.dto';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:profileId')
  async getProfile(@Param('profileId') profileId: string ) {
    return this.profileService.getUserProfile(profileId);
  }

  @Patch('/:profileId')
  async updateProfile(
    @Param('profileId') profileId: string,
    @Body() profileUpdateData: UpdateUserProfileDTO
    ) {
    return this.profileService.updateUserProfile(profileId, profileUpdateData);
  }

  @Post('/:profileId/follow/:toFollow')
  async followProfile(
    @Param() params: {profileId: string, toFollow: string},
    ) {
    return this.profileService.followProfile(params.profileId, params.toFollow);
  }

  @Post('/:profileId/unfollow/:toFollow')
  async unFollowProfile(
    @Param() params: {profileId: string, toFollow: string},
    ) {
    return this.profileService.unfollowProfile(params.profileId, params.toFollow);
  }
}
