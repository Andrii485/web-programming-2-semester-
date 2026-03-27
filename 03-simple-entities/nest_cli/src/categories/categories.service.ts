import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, type Paginated, type PaginateQuery } from 'nestjs-paginate';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Category>> {
    return paginate(query, this.categoriesRepository, {
      sortableColumns: ['id', 'name', 'created_at'],
      searchableColumns: ['name', 'description'],
      defaultSortBy: [['created_at', 'DESC']],
    });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.categoriesRepository.delete(id);
  }

  async findProductsByCategory(categoryId: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }
}
