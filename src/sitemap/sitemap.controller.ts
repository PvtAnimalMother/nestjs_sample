import { Controller, Get, Header } from '@nestjs/common';
import { PageService } from '../page/page.service';
import { ConfigService } from '@nestjs/config';
import { format, subDays } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './const';

@Controller('sitemap')
export class SitemapController {
  domain: string;
  constructor(
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {
    this.domain = this.configService.get('DOMAIN') ?? '';
  }

  @Get('xml')
  @Header('Content-Type', 'text/xml')
  async sitemap() {
    const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx";
    let res = [
      {
        loc: `${this.domain}`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
      {
        loc: `${this.domain}/courses`,
        lastmod: format(subDays(new Date(), 1), formatString),
        changefreq: 'daily',
        priority: '1.0',
      },
    ];
    const pages = await this.pageService.findAll();
    res = res.concat(
      pages.map(({ firstCategory, alias, updatedAt }) => {
        return {
          loc: `${this.domain}${CATEGORY_URL[firstCategory]}/${alias}`,
          lastmod: format(
            updatedAt ? new Date(updatedAt) : new Date(),
            formatString,
          ),
          changefreq: 'weekly',
          priority: '0.7',
        };
      }),
    );
    const builder = new Builder({
      xmldec: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    });
    return builder.buildObject({
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
        url: res,
      },
    });
  }
}
