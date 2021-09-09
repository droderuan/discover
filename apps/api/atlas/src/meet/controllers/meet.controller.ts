import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { MeetService } from '../services/meet.service';
import { JwtAuthGuard, RequestWithUser } from '@discover/shared/nest'
import { CreateMeetDTO } from '../dto/createMeet.dto';

@Controller('meet')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Get('/:id')
  async getOneMeet(
    @Param() params: { id: string },
  ) {
    const meet = await this.meetService.listOneMeet(Number(params.id));
    return meet;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async  createMeet(
    @Request() request: RequestWithUser,
    @Body() body: CreateMeetDTO
  ) {
    const meet = await this.meetService.createMeet(request.user.profileId, body);
    return meet;
  }
}