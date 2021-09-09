import { Module } from '@nestjs/common';
import { TagService } from './providers/tag.service';
import { TagController } from './controllers/tag.controller';
import { VeritasModule } from '@discover/models-veritas';

@Module({
  imports: [VeritasModule],
  providers: [TagService],
  controllers: [TagController],
  exports: [TagService],
})
export class TagModule {}
