import { Prisma } from '@discover/models/veritas';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsDateString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTagDTO } from '../../tag/dto/createTag.dto';

export class CreateMeetDTO
  implements Omit<Prisma.MeetUncheckedCreateInput, 'profileId'>
{
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  startAt: string;

  @IsDateString()
  @IsOptional()
  endAt?: string;

  @IsBoolean()
  @IsOptional()
  recurrent?: boolean;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsBoolean()
  @IsOptional()
  hasEnded?: boolean;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsNumber()
  categoryId: number;

  @IsNumber({}, { each: true })
  platformIds: number[];

  @ValidateNested()
  @Type(() => CreateTagDTO)
  tagNames: CreateTagDTO[];
}
