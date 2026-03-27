import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { CategoriesSeeder } from './categories/categories.seeder';
import { ProductsSeeder } from './products/products.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'nest_products_db',
      entities: [Category, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Product]),
  ],
}).run([CategoriesSeeder, ProductsSeeder]);
