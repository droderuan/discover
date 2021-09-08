import { Prisma } from "@discover/models-veritas";
import { IsString, IsOptional } from "class-validator";

export class UpdateUserProfileDTO implements Prisma.ProfileUncheckedUpdateInput {
  @IsString()
  name?: string

  @IsString()
  @IsOptional()
  secondName?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  profileImage?: string
}