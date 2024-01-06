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
import { PageModel } from './models/page.model';
import { FindPageDto } from './dto/find-page.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { PageService } from './page.service';
import { PAGE_NOT_FOUND } from './const';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('top-page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post('create')
  async create(@Body() dto: CreatePageDto) {
    return await this.pageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.pageService.findById(id);

    if (page) {
      return page;
    }

    throw new NotFoundException(PAGE_NOT_FOUND);
  }

  @Get('findByAlias/:alias')
  async findByAlias(@Param('alias') alias: string) {
    const page = await this.pageService.findByAlias(alias);

    if (page) {
      return page;
    }

    throw new NotFoundException(PAGE_NOT_FOUND);
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: PageModel,
  ) {
    const updatedPage = await this.pageService.updateById(id, dto);
    if (updatedPage) {
      return updatedPage;
    }
    throw new NotFoundException(PAGE_NOT_FOUND);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedPage = await this.pageService.deleteById(id);
    if (deletedPage) {
      return deletedPage;
    }
    throw new NotFoundException(PAGE_NOT_FOUND);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindPageDto) {
    return await this.pageService.findByFirstCategory(dto);
  }
}
