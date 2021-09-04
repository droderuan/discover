import { Injectable } from '@nestjs/common';
import { User, Prisma, VeritasConnectionService } from "@discover/models-veritas"

@Injectable()
export class AppService {

  constructor(private prisma: VeritasConnectionService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
}
