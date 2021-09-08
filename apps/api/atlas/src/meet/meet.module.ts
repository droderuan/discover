import { Module } from '@nestjs/common';
import { MeetService } from './services/meet/meet.service';
import { MeetController } from './controllers/meet/meet.controller';

@Module({
  providers: [MeetService],
  controllers: [MeetController],
})
export class MeetModule {}
