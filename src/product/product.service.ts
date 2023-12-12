import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './models/product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Review, ReviewDocument } from '../review/shemas/review.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly product: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return await this.product.create(dto);
  }

  async findById(id: string): Promise<ProductDocument | null> {
    return await this.product.findById(id).exec();
  }

  async deleteById(id: string): Promise<ProductDocument | null> {
    return await this.product.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateProductDto,
  ): Promise<ProductDocument | null> {
    return await this.product.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.product
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec()) as unknown as (ProductDocument & {
      review: Review[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
