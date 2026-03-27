import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Paginate, type PaginateQuery } from 'nestjs-paginate';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.categoriesService.findAll(query);
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':categoryId')
  update(
    @Param('categoryId') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('categoryId') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Get(':categoryId/products')
  findProducts(@Param('categoryId') id: string) {
    return this.categoriesService.findProductsByCategory(+id);
  }
}
