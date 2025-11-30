import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private service: CategoriesService) { }

    @Post()
    create(@Body() dto: CategoryDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() dto: CategoryDto) {
        return this.service.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(+id);
    }
}
