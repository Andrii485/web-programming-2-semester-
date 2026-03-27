import {
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Name of the product', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the product', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the product', required: false })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'URL to the image for the product',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    required: false,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  category_id?: number;
}
