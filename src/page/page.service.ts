import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageDocument, PageModel } from './models/page.model';
import { FindPageDto } from './dto/find-page.dto';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(PageModel.name)
    private readonly page: Model<PageDocument>,
  ) {}

  async create(dto: CreatePageDto): Promise<PageDocument> {
    return await this.page.create(dto);
  }

  async deleteById(id: string): Promise<PageDocument | null> {
    return await this.page.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: PageModel): Promise<PageDocument | null> {
    return await this.page.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByFirstCategory({ firstCategory }: FindPageDto) {
    return await this.page
      .find({ firstCategory }, { alias: 1, title: 1, secondCategory: 1 })
      .exec();
  }

  async findBySearchRequest(query: string) {
    return await this.page
      .find({
        $text: {
          $search: query,
          $caseSensitive: false,
        },
      })
      .exec();
  }

  async findById(id: string): Promise<PageDocument | null> {
    return await this.page.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<PageDocument | null> {
    return await this.page.findOne({ alias }).exec();
  }
}
