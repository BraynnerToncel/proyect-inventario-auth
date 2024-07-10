import { ETypeOfPayment } from '@constant/type-of-payment/type-of-payment.constant';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsInt,
  Min,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  clientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductQuantityDto)
  products: Array<ProductQuantityDto>;

  @IsNumber()
  saleTypeOfPayment: ETypeOfPayment;

  @IsNumber()
  saleMoneyReceived: number;
}
export class ProductQuantityDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
