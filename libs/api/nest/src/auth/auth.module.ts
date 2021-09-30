import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './Providers/auth.service';
import { JwtStrategy } from './Strategies/jwt.strategy';
import { CredentialsStrategy } from './Strategies/credentials.strategy';
import { VeritasModule } from '@discover/models/veritas';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [
    VeritasModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
    HashModule,
  ],
  providers: [AuthService, CredentialsStrategy, JwtStrategy],
  exports: [AuthService, CredentialsStrategy, JwtStrategy],
})
export class AuthModule {}
