import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristics {
  name: string;
  value: string;
}

@Schema()
export class ProductModel {
  @Prop()
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  price: number;

  @Prop()
  oldPrice: number;

  @Prop()
  credit: number;

  @Prop()
  calculatedRating: number;

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
