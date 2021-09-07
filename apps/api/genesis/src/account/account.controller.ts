import { Prisma } from '@discover/models-veritas';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/check-email/:email')
  async checkIfEmailAlreadyExist(
    @Param() params: Prisma.UserWhereUniqueInput
  ): Promise<{ exist: boolean }> {
    const exist = await this.accountService.checkUnusedEmail(params.email);
    return { exist };
  }

  @Post('/')
  async createUser(@Body() accountData: Prisma.UserCreateInput) {
    return this.accountService.createAccount(accountData);
  }
}
