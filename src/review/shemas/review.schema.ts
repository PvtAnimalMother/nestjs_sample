import { ProductModel } from '../../product/models/product.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId, ref: ProductModel.name })
  productId: string;
  // @Prop({ type: Types.ObjectId, ref: ProductModel.name })
  // product: ProductModel;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
