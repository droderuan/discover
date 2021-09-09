import { Module } from '@nestjs/common';
import { TagService } from './providers/tag.service';
import { TagController } from './controllers/tag.controller';

@Module({
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
