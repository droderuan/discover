import { VeritasModule } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { TagModule } from '../tag/tag.module';
import { MeetModule } from '../meet/meet.module';
import { PlatformModule } from '../platform/platform.module';

@Module({
  imports: [VeritasModule, TagModule, MeetModule, PlatformModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
