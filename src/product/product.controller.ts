import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './models/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './const';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);

    if (product) {
      return product;
    }

    throw new NotFoundException(PRODUCT_NOT_FOUND);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    const updatedProduct = await this.productService.updateById(id, dto);
    if (updatedProduct) {
      return updatedProduct;
    }
    throw new NotFoundException(PRODUCT_NOT_FOUND);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productService.deleteById(id);
    if (deletedProduct) {
      return deletedProduct;
    }
    throw new NotFoundException(PRODUCT_NOT_FOUND);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return await this.productService.findWithReviews(dto);
  }
}
