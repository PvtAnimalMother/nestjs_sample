import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { ReviewModule } from '../review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { initMongoDBConfig } from 'src/configs/mongo.config';
import { PageModule } from 'src/page/page.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
