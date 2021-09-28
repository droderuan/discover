import { Module } from '@nestjs/common';
import { SubscriptionService } from './providers/subscription.service';
import { SubscriptionController } from './controllers/subscription.controller';
import { AuthModule } from '@discover/api-nest';

@Module({
  providers: [SubscriptionService, AuthModule],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
