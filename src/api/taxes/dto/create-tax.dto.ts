import { IsNumber, IsString } from 'class-validator';

export class CreateTaxDto {
  @IsString()
  taxName: string;

  @IsNumber()
  percentageOfTax: number;

  @IsString()
  taxIdentifier: string;
}
