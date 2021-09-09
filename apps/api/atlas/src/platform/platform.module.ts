import { Module } from '@nestjs/common';
import { PlatformService } from './providers/platform.service';
import { PlatformController } from './controllers/platform.controller';

@Module({
  providers: [PlatformService],
  controllers: [PlatformController],
  exports: [PlatformService],
})
export class PlatformModule {}
