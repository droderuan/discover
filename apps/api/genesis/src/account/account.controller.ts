import { Prisma } from '@discover/models-veritas';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/check-email/:email')
  async checkIfEmailAlreadyExist(
    @Param() params: Prisma.UserWhereUniqueInput
  ) {
    const exist = await this.accountService.checkUnusedEmail(params.email);
    return { exist };
  }
  
  @Post('/')
  async createUser(@Body() accountData: CreateUserDTO ) {
    return this.accountService.createAccount(accountData);
  }

}
