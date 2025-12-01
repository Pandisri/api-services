import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategories } from './subcategories.entity';
import { Repository } from 'typeorm';
import { SubCategoryDto } from './dto/subcategory.dto';

@Injectable()
export class SubcategoriesService {

    constructor(@InjectRepository(SubCategories) private repo: Repository<SubCategories>) { }

    private makeSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    // add sub  category

    async create(dto: SubCategoryDto, userId: number) {
        const slug = this.makeSlug(dto.name);
        const exists = await this.repo.findOne({ where: { slug } });

        if (exists) {
            return {
                status: false,
                message: "Sub Category already exists",
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
            message: "Sub Category added successfully",
        };
    }


    // Update Sub Category
    async update(id: number, dto: SubCategoryDto, userId: number) {
        const subCategory = await this.findOne(id);

        if (!subCategory) {
            return {
                status: false,
                message: "Sub Category not found",
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
                    message: "Sub Category name already exists",
                };
            }

            subCategory.name = dto.name;
            subCategory.slug = newSlug;
        }

        subCategory.updated_by = userId;

        await this.repo.save(subCategory);

        return {
            status: true,
            message: "Sub Category updated successfully",
        };
    }


    // Get Sub Category by ID
    async findOne(id: number) {
        const category = await this.repo.findOne({ where: { id } });
        if (!category) throw new NotFoundException('Sub Category not found');
        return category;
    }


    // Delete Sub Category
    async remove(id: number) {
        const category = await this.findOne(id);
        return this.repo.remove(category);
    }


    // Get All Sub Categories
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
}
