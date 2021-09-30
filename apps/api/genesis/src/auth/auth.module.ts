import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthModule as AuthLibModule } from '@discover/api/nest';

@Module({
  imports: [AuthLibModule],
  controllers: [AuthController],
})
export class AuthModule {}
