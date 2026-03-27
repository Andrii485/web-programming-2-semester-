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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Paginate() query: PaginateQuery) {
    return this.productsService.findAll(query);
  }

  @Get(':productId')
  findOne(@Param('productId') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':productId')
  update(
    @Param('productId') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('productId') id: string) {
    return this.productsService.remove(+id);
  }
}
