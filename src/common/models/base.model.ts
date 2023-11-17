import { Prop } from '@nestjs/mongoose';
import { now } from 'mongoose';

export class BaseModel {
  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}
