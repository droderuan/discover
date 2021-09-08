import { Module } from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
