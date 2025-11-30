import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private repo: Repository<Categories>) { }

    private makeSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    async create(dto: CategoryDto){
        const slug = this.makeSlug(dto.name);

        const category = this.repo.create({
            name: dto.name,
            slug
        });
        return this.repo.save(category);
    }

    async findAll() {
    return this.repo.find();
  }

  async findOne(id: number){
        const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }


    async update(id: number, dto: CategoryDto) {
    const category = await this.findOne(id);

    if (dto.name) {
      category.name = dto.name;
      category.slug = this.makeSlug(dto.name);
    }

    return this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.repo.remove(category);
  }
  
}
