import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('categories')
export class CategoriesController {
    constructor(private service: CategoriesService) { }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('categories-add')
    create(@Body() dto: CategoryDto, @CurrentUser() user: any) {
        return this.service.create(dto, user.id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Patch('categories-update/:id')
    update(
        @Param('id') id: number,
        @Body() dto: CategoryDto,
        @CurrentUser() user: any,
    ) {
        return this.service.update(id, dto, user.id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete('delete/:id')
    remove(@Param('id') id: number) {
        return this.service.remove(+id);
    }


    @Get('categories-list')
    findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search: string
    ) {
        return this.service.findAll(page, limit, search);
    }

    @Get('get/:id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(+id);
    }
}
