import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed(): Promise<any> {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) {
      console.log('No categories found. Please seed categories first.');
      return;
    }

    const products = [];

    for (let i = 0; i < 50; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const product = this.productRepository.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        category_id: randomCategory.id,
      });
      products.push(product);
    }

    return await this.productRepository.save(products);
  }

  async drop(): Promise<any> {
    return await this.productRepository.delete({});
  }
}
