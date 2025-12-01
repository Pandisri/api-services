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

  // Create Category
  async create(dto: CategoryDto, userId: number) {
    const slug = this.makeSlug(dto.name);

    const exists = await this.repo.findOne({ where: { slug } });

    if (exists) {
      return {
        status: false,
        message: "Category already exists",
      };
    }

    const category = this.repo.create({
      name: dto.name,
      slug,
      created_by: userId
    });
    await this.repo.save(category);

    return {
      status: true,
      message: "Category added successfully",
    };
  }


  // Update Category
  async update(id: number, dto: CategoryDto, userId: number) {
    const category = await this.findOne(id);

    if (!category) {
      return {
        status: false,
        message: "Category not found",
      };
    }

    // If name is changed → check duplicate slug
    if (dto.name) {
      const newSlug = this.makeSlug(dto.name);

      const exists = await this.repo.findOne({
        where: { slug: newSlug },
      });

      // If another category already uses this slug
      if (exists && exists.id !== id) {
        return {
          status: false,
          message: "Category name already exists",
        };
      }

      category.name = dto.name;
      category.slug = newSlug;
    }

    category.updated_by = userId;

    await this.repo.save(category);

    return {
      status: true,
      message: "Category updated successfully",
    };
  }


  // Get All Categories
  async findAll(page = 1, limit = 10, search = "") {
    const skip = (page - 1) * limit;

    const query = this.repo
      .createQueryBuilder('category')
      .orderBy('category.created_at', 'DESC')
      .skip(skip)
      .take(limit);

    // Search filter
    if (search) {
      query.where('category.name LIKE :search', { search: `%${search}%` });
    }

    const [data, total] = await query.getManyAndCount();


    return {
      status: true,
      message: "Categories fetched successfully",
      data,
    };
  }

  // Get Category by ID
  async findOne(id: number) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }


  // Delete Category
  async remove(id: number) {
    const category = await this.findOne(id);
    return this.repo.remove(category);
  }

}
