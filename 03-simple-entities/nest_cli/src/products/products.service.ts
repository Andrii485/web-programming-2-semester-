import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, type Paginated, type PaginateQuery } from 'nestjs-paginate';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productsRepository, {
      sortableColumns: ['id', 'name', 'price', 'created_at'],
      searchableColumns: ['name', 'description'],
      defaultSortBy: [['created_at', 'DESC']],
      relations: ['category'],
      filterableColumns: {
        category_id: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.productsRepository.delete(id);
  }
}
