import { IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  personalInformationId: string;

  @IsUUID()
  clientId: string;
}
