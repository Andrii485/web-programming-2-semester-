import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the category', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL to the image for the category',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  image?: string;
}
