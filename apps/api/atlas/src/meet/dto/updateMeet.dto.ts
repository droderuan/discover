import { Prisma } from '@discover/models-veritas';
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

export class UpdateMeetDTO
  implements Omit<Prisma.MeetUncheckedUpdateInput, 'profileId'>
{
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
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
  @IsOptional()
  categoryId: number;

  @IsNumber({}, { each: true })
  platformIds: number[];

  @ValidateNested()
  @Type(() => CreateTagDTO)
  tagNames: CreateTagDTO[];
}
