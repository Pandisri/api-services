import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { SubCategoryDto } from './dto/subcategory.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('subcategories')
export class SubcategoriesController {
    constructor(private service: SubcategoriesService) { }


    @UseGuards(JwtAuthGuard, AdminGuard)
    @Post('subCategories-add')
    create(@Body() dto: SubCategoryDto, @CurrentUser() user: any) {
        return this.service.create(dto, user.id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Patch('subCategories-update/:id')
    update(
        @Param('id') id: number,
        @Body() dto: SubCategoryDto,
        @CurrentUser() user: any,
    ) {
        return this.service.update(id, dto, user.id);
    }

    @UseGuards(JwtAuthGuard, AdminGuard)
    @Delete('subCategories-delete/:id')
    remove(@Param('id') id: number) {
        return this.service.remove(+id);
    }


    @Get('subCategories-list')
    findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search') search: string
    ) {
        return this.service.findAll(page, limit, search);
    }

    @Get('subCategories/:id')
    findOne(@Param('id') id: number) {
        return this.service.findOne(+id);
    }

}
