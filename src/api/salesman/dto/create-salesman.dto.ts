import { IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateSalesmanDto {
  @IsString()
  @MaxLength(255)
  salesmanName: string;

  @IsString()
  @MaxLength(255)
  salesmanLastName: string;

  @IsEmail()
  @MaxLength(255)
  salesmanEmail: string;

  @IsString()
  @MaxLength(20)
  salesmanPhoneNumber: string;
}
