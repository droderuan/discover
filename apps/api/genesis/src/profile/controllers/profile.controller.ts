import { JwtAuthGuard, RequestWithUser } from '@discover/api/nest';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserProfileDTO } from '../dto/updateUserProfile.dto';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('')
  async getProfile(@Request() request: RequestWithUser) {
    return this.profileService.getUserProfile(request.user.profileId);
  }

  @Patch('')
  async updateProfile(
    @Request() request: RequestWithUser,
    @Body() profileUpdateData: UpdateUserProfileDTO
  ) {
    return this.profileService.updateUserProfile(
      request.user.profileId,
      profileUpdateData
    );
  }

  @Post('/follow/:toFollow')
  async followProfile(
    @Request() request: RequestWithUser,
    @Param() params: { profileId: string; toFollow: string }
  ) {
    return this.profileService.followProfile(
      request.user.profileId,
      Number(params.toFollow)
    );
  }

  @Post('/unfollow/:toFollow')
  async unFollowProfile(
    @Request() request: RequestWithUser,
    @Param() params: { profileId: string; toFollow: string }
  ) {
    return this.profileService.unfollowProfile(
      request.user.profileId,
      Number(params.toFollow)
    );
  }
}
