import { BaseModel } from './../../common/models/base.model';
import { ProductModel } from '../../product/models/product.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review extends BaseModel {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  // @Prop()
  @Prop({ type: Types.ObjectId, ref: ProductModel.name })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
