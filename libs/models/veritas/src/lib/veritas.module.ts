import { Global, Module } from '@nestjs/common';
import { VeritasService } from './veritas.service';

@Global()
@Module({
  controllers: [],
  providers: [VeritasService],
  exports: [VeritasService],
})
export class VeritasModule {}
