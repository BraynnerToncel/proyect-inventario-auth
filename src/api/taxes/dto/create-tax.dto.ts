import { IsNumber, IsString } from 'class-validator';

export class CreateTaxDto {
  @IsString()
  taxesName: string;

  @IsNumber()
  percentageOfTax: number;

  @IsString()
  taxesIdentifier: string;
}
