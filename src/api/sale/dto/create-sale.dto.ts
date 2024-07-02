import { IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  salesmanId: string;

  @IsUUID()
  clientId: string;
}
