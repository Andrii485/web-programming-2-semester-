import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Category } from './entities/category.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed(): Promise<any> {
    const categories: Category[] = [];

    for (let i = 0; i < 10; i++) {
      const category = this.categoryRepository.create({
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
      });
      categories.push(category);
    }

    return await this.categoryRepository.save(categories);
  }

  async drop(): Promise<any> {
    return await this.categoryRepository.delete({});
  }
}
