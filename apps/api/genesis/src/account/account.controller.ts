import { Prisma } from '@discover/models-veritas';
import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/')
  async createUser(@Body() accountData: Prisma.UserCreateInput) {
    return this.accountService.createAccount(accountData);
  }
}
