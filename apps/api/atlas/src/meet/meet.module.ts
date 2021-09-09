import { Module } from '@nestjs/common';
import { MeetService } from './services/meet.service';
import { MeetController } from './controllers/meet.controller';
import { TagModule } from '../tag/tag.module';
import { AuthModule } from '@discover/shared/nest';

@Module({
  imports: [TagModule, AuthModule],
  providers: [MeetService],
  controllers: [MeetController],
})
export class MeetModule {}
