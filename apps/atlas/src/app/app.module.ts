import { VeritasConnectionService } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VeritasConnectionService],
})
export class AppModule {}
