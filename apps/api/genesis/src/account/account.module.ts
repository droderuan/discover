import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './providers/account.service';
import { HashModule } from '@discover/api-nest';

@Module({
  imports: [HashModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
