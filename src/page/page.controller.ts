import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PageModel } from './models/page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class PageController {
  @Post('create')
  async create(@Body() dto: Omit<PageModel, '_id'>) {}

  @Get(':id')
  async get(@Param('id') id: string) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: PageModel) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {}
}
