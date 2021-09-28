import { SubscriptionService } from '../providers/subscription.service';
import {
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RequestWithUser } from '@discover/api-nest';

@Controller('subscription')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post('/:meetId')
  async subscribe(
    @Request() request: RequestWithUser,
    @Param() params: { meetId: string }
  ) {
    const meet = await this.subscriptionService.subscribe(
      request.user.profileId,
      Number(params.meetId)
    );
    return meet;
  }

  @Delete('/:meetId')
  async unSubscribe(
    @Request() request: RequestWithUser,
    @Param() params: { meetId: string }
  ) {
    const meet = await this.subscriptionService.unSubscribe(
      request.user.profileId,
      Number(params.meetId)
    );
    return meet;
  }
}
