import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(databaseConfig), CategoriesModule, SubcategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
