import {
  IsString,
  IsOptional,
  IsEmail,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  companyName: string;

  @IsNumber()
  companyNit: number;

  @IsString()
  companyAddress: string;

  @IsString()
  companyPhone: string;

  @IsEmail()
  companyEmail: string;

  @IsString()
  @IsOptional()
  companyDescription?: string;

  @IsString()
  companyWebsite: string;

  @IsUUID()
  @IsOptional()
  fileUrl?: string;
}
