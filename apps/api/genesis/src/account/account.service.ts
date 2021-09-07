import {
  User,
  Prisma,
  VeritasService,
} from '@discover/models-veritas';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

@Injectable()
export class AccountService {
  constructor(private prisma: VeritasService) {}

  async checkUnusedEmail(email: string): Promise<{ message: string }> {
    const existUser = this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if(existUser){
      throw new BadRequestException("E-mail exist")
    }

    return { message: 'not exist' }
  }

  async createAccount(data: Prisma.UserCreateInput): Promise<User> {
    const existUser = this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if(existUser){
      throw new BadRequestException('E-mail already in use')
    }

    const { password } = data;

    const newPassword = String(password).concat('_encrypted');

    return this.prisma.user.create({
      data: { 
        ...data,
        id: uuid(),
        password: newPassword
       },
    });
  }
}
