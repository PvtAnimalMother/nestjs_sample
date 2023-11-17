import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, Review } from './shemas/review.schema';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

class Leak {}

const leaks = [];

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    return await this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<ReviewDocument | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    return await this.reviewModel.find({ productId }).exec();
  }

  async deleteByProductId(productId: string) {
    leaks.push(new Leak());
    return this.reviewModel.deleteMany({ productId }).exec();
  }
}
