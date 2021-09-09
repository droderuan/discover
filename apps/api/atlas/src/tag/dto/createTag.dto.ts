import { Prisma } from "@discover/models-veritas";
import { IsString,  IsOptional,  } from "class-validator";

export class CreateTagDTO implements Prisma.TagUncheckedCreateInput {
  @IsString()
  @IsOptional()
  name: string
}
