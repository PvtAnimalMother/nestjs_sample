import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './shemas/review.schema';
import { ReviewService } from './review.service';
import { TelegramModule } from '../telegram/telegram.module';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    TelegramModule,
  ],
  providers: [ReviewService],
})
export class ReviewModule {}
