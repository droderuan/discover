import { VeritasModule } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { AccountModule } from '../account/account.module';

@Module({
  imports: [VeritasModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
