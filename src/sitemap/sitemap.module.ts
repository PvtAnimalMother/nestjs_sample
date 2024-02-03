import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { PageModule } from '../page/page.module';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [SitemapController],
  providers: [ConfigService],
  imports: [PageModule],
})
export class SitemapModule {}
