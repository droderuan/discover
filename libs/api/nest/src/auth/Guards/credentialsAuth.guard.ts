import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CredentialsAuthGuard extends AuthGuard('credentials') {}
