import { Module } from '@nestjs/common';
import { MeetService } from './services/meet.service';
import { MeetController } from './controllers/meet.controller';
import { TagModule } from '../tag/tag.module';
import { AuthModule } from '@discover/api/nest';
import { PlatformModule } from '../platform/platform.module';

@Module({
  imports: [TagModule, AuthModule, PlatformModule],
  providers: [MeetService],
  controllers: [MeetController],
})
export class MeetModule {}
