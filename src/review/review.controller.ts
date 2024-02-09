import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './const';
import { CreateReviewDto } from './dto/create-review.dto';
import { JWTAuthGuard } from '../user/guards/jwt.guard';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) dto: CreateReviewDto) {
    return await this.reviewService.create(dto);
  }

  @Post('notify')
  async notify(
    @Body(new ValidationPipe())
    { name, title, description, rating, productId }: CreateReviewDto,
  ) {
    const message =
      `Product ID: ${productId}\n` +
      `Name: ${name}\n` +
      `Title: ${title}\n` +
      `Description: ${description}\n` +
      `Rating: ${rating}`;
    return await this.telegramService.sendMessage(message);
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Get('byProduct/:productId')
  async getByProductId(
    @Param('productId', IdValidationPipe) productId: string,
  ) {
    return await this.reviewService.findByProductId(productId);
  }
}
