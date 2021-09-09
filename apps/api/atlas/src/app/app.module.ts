import { VeritasModule } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { TagModule } from '../tag/tag.module'
import { MeetModule } from '../meet/meet.module'

@Module({
  imports: [VeritasModule, TagModule, MeetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
