import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CategoriesService } from './modules/categories/categories.service';
import { CategoriesController } from './modules/categories/categories.controller';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(databaseConfig), CategoriesModule],
  controllers: [AppController, CategoriesController],
  providers: [AppService, CategoriesService],
})
export class AppModule {}
