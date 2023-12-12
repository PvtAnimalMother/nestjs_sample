import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { BaseModel } from 'src/common/models/base.model';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristics {
  @Prop()
  name: string;

  @Prop()
  value: string;
}

@Schema()
export class ProductModel extends BaseModel {
  @Prop()
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice?: number;

  @Prop()
  credit: number;

  @Prop()
  description: string;

  @Prop()
  adventeges: string;

  @Prop()
  disadvantages: string;

  @Prop()
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop({ type: () => [ProductCharacteristics], _id: false })
  characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
