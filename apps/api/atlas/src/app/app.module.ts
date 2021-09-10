import { VeritasModule } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { TagModule } from '../tag/tag.module';
import { MeetModule } from '../meet/meet.module';
import { PlatformModule } from '../platform/platform.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    VeritasModule,
    TagModule,
    MeetModule,
    PlatformModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
