import { VeritasService } from '@discover/models-veritas';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from '../dto/createUser.dto';
import { HashService } from '@discover/api-nest';

@Injectable()
export class AccountService {
  constructor(
    private prisma: VeritasService,
    private hashService: HashService
  ) {}

  async checkUnusedEmail(email: string): Promise<boolean> {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return existUser ? true : false;
  }

  async createAccount(data: CreateUserDTO) {
    if (data.password !== data.password) {
      throw new BadRequestException(
        'Password does not match with password confirmation'
      );
    }

    const existUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('E-mail already in use');
    }

    const { password } = data;

    const hashedPassword = await this.hashService.hash(password);

    return this.prisma.user.create({
      data: {
        email: data.email,
        id: uuid(),
        password: hashedPassword,
        profile: {
          create: {},
        },
      },
      select: {
        profile: true,
        email: true,
        id: true,
      },
    });
  }
}
