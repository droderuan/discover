import { Module } from '@nestjs/common';
import { HashService } from './providers/hash.service';

@Module({
  providers: [HashService],
  exports: [HashService]
})
export class HashModule {}
