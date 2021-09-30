import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MeetService } from '../services/meet.service';
import { JwtAuthGuard, RequestWithUser, Public } from '@discover/api/nest';
import { CreateMeetDTO } from '../dto/createMeet.dto';
import { UpdateMeetDTO } from '../dto/updateMeet.dto';

@Controller('meet')
@UseGuards(JwtAuthGuard)
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Public()
  @Get('')
  async getAllMeet() {
    const meets = await this.meetService.findAll();
    return meets;
  }

  @Get('/list/my-meets')
  async getAllSubscribedMeets(@Request() request: RequestWithUser) {
    const meets = await this.meetService.findAllByProfileId(
      request.user.profileId
    );
    return meets;
  }

  @Public()
  @Get('/:id')
  async getOneMeet(@Param() params: { id: string }) {
    const meet = await this.meetService.findOne(Number(params.id));
    return meet;
  }

  @Post('/')
  async createMeet(
    @Request() request: RequestWithUser,
    @Body() body: CreateMeetDTO
  ) {
    const meet = await this.meetService.create(request.user.profileId, body);
    return meet;
  }

  @Put('/')
  async update(
    @Request() request: RequestWithUser,
    @Body() body: UpdateMeetDTO
  ) {
    const meet = await this.meetService.update(request.user.profileId, body);
    return meet;
  }
}
