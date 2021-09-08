import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { HashModule} from '@discover/shared/nest'

@Module({
  imports: [HashModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
