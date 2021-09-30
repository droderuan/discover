import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, VeritasService } from '@discover/models/veritas';
import { HashService } from '../../hash/providers/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: VeritasService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    const comparedPasswords = await this.hashService.compareHash(
      pass,
      user.password
    );

    if (user && comparedPasswords) {
      delete user.password;
      return user;
    }

    return null;
  }

  async getJWT(user: User) {
    const userProfile = await this.prisma.profile.findFirst({
      where: {
        userId: user.id,
      },
    });

    const payload = { sub: userProfile.id };
    return {
      access_token: this.jwtService.sign(payload),
      profile: userProfile,
    };
  }
}
