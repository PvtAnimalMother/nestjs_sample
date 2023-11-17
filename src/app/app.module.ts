import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { ReviewModule } from '../review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { initMongoDBConfig } from '../configs/mongo.config';
import { PageModule } from '../page/page.module';

@Module({
  imports: [
    UserModule,
    PageModule,
    ProductModule,
    ReviewModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: initMongoDBConfig,
    }),
  ],
})
export class AppModule {}
