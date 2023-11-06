import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { ReviewModule } from '../review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { initMongoDBConfig } from '../configs/mongo.config';
import { PageModule } from '../page/page.module';
import { UsrModule } from './usr/usr.module';

@Module({
  imports: [
    AuthModule,
    PageModule,
    ProductModule,
    ReviewModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: initMongoDBConfig,
    }),
    UsrModule,
  ],
})
export class AppModule {}
