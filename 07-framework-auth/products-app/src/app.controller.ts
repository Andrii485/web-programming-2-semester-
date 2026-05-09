import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiOperation, ApiTags, ApiSecurity } from '@nestjs/swagger';

@ApiTags('products')
@ApiSecurity('oauth2')
@Controller('products')
export class AppController {

  @Get('/public')
  @Unprotected()
  @ApiOperation({ summary: 'Public endpoint' })
  getPublic(): string {
    return 'Public endpoint';
  }

  @Get()
  @Roles({ roles: ['products-app:ProductsApiViewer'] })
  @ApiOperation({ summary: 'Get all products' })
  findAll(): object {
    return [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
  }

  @Get(':id')
  @Roles({ roles: ['products-app:ProductsApiViewer'] })
  @ApiOperation({ summary: 'Get product by id' })
  findOne(@Param('id') id: string): object {
    return { id, name: 'Product ' + id };
  }

  @Post()
  @Roles({ roles: ['products-app:ProductsApiWriter'] })
  @ApiOperation({ summary: 'Create product' })
  create(@Body() body: any): object {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Product created', data: body };
  }

  @Put(':id')
  @Roles({ roles: ['products-app:ProductsApiWriter'] })
  @ApiOperation({ summary: 'Update product' })
  update(@Param('id') id: string, @Body() body: any): object {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Product updated', id, data: body };
  }

  @Delete(':id')
  @Roles({ roles: ['products-app:ProductsApiWriter'] })
  @ApiOperation({ summary: 'Delete product' })
  remove(@Param('id') id: string): object {
    return { message: 'Product deleted', id };
  }
}
