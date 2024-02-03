import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageModel, PageSchema } from './models/page.model';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  imports: [
    MongooseModule.forFeature([{ name: PageModel.name, schema: PageSchema }]),
  ],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
