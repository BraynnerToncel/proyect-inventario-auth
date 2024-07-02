import { IsUUID, IsInt, Min, IsArray } from 'class-validator';

export class CreateSaleDetailDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  salesmanId: string;

  @IsArray()
  products: Array<ProductQuantityDto>;
}

export class ProductQuantityDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
