import { VeritasModule } from '@discover/models-veritas';
import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../account/account.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [VeritasModule, AuthModule, AccountModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
