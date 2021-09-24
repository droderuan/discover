import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, CredentialsStrategy } from '@discover/shared/nest';
import { User } from '@discover/models-veritas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(CredentialsStrategy)
  @Post('/credentials')
  async byCredentials(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }

  @UseGuards(CredentialsStrategy)
  @Post('/google')
  async byGoogle(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }

  @UseGuards(CredentialsStrategy)
  @Post('/facebook')
  async byFacebook(@Request() req) {
    return this.authService.getJWT(req.user as User);
  }
}
