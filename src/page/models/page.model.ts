import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<PageModel>;

export enum TopLevelCategory {
  Courses = 1,
  Services = 2,
  Books = 3,
  Products = 4,
}

export class Advantage {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export class HHData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

@Schema({})
export class PageModel {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop()
  title: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  category: string;

  @Prop({ type: () => HHData, required: false })
  hh?: HHData;

  @Prop({ type: () => [Advantage] })
  advantages: Advantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];
}

const PageSchema = SchemaFactory.createForClass(PageModel);

PageSchema.index({ title: 'text', seoText: 'text' });

export { PageSchema };
