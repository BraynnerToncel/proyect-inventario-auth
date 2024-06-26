import {
  IsInt,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(4)
  @MaxLength(45)
  productName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(45)
  productDescription: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'productCost must be a valid number' })
  @IsPositive({ message: 'productCost must be a positive number' })
  productCost: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'productUnitValue must be a valid number' })
  @IsPositive({ message: 'productUnitValue must be a positive number' })
  productUnitValue: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'productWholesaleValue must be a valid number' })
  @IsPositive({ message: 'productWholesaleValue must be a positive number' })
  productWholesaleValue: number;

  @IsInt()
  stock: number;
}
