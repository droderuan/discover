import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, CredentialsAuthGuard } from '@discover/api-nest';
import { User } from '@discover/models-veritas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(CredentialsAuthGuard)
  @Post('/credentials')
  async byCredentials(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }

  @UseGuards(CredentialsAuthGuard)
  @Post('/google')
  async byGoogle(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }

  @UseGuards(CredentialsAuthGuard)
  @Post('/facebook')
  async byFacebook(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }
}
