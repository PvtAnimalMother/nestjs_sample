import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../models/page.model';

export class FindPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}
