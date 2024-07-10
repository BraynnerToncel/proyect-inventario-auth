import { ETypeOfPayment } from '@constant/type-of-payment/type-of-payment.constant';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsInt,
  Min,
  IsArray,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSaleDetailDto {
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

  @IsString()
  personalInformationId: string;
}

export class ProductQuantityDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
