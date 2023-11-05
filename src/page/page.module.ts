import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModel, PageSchema } from './models/page.model';

@Module({
  controllers: [PageController],
  imports: [
    MongooseModule.forFeature([{ name: PageModel.name, schema: PageSchema }]),
  ],
})
export class PageModule {}
