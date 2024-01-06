import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { TopLevelCategory } from '../models/page.model';

class HHDataDto {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

class AdvantageDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreatePageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  alias: string;

  @IsOptional()
  @Type(() => HHDataDto)
  hh?: HHDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => AdvantageDto)
  adventeges: AdvantageDto[];

  @IsString()
  category: string;

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
