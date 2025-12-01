import { Module } from '@nestjs/common';
import { SubcategoriesController } from './subcategories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategories } from './subcategories.entity';
import { SubcategoriesService } from './subcategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategories])],
  controllers: [SubcategoriesController],
   providers: [SubcategoriesService],
      exports: [SubcategoriesService],
})
export class SubcategoriesModule {}
