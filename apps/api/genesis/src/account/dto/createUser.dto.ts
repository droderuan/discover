import { Prisma } from '@discover/models/veritas';
import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO
  implements Omit<Prisma.UserUncheckedCreateInput, 'id'>
{
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}
