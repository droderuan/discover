import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, LocalAuthGuard } from '@discover/shared/nest';
import { User } from '@discover/models-veritas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user as User);
  }
}
