import { IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MaxLength(255)
  clientIdentificacion: string;

  @IsString()
  @MaxLength(255)
  clientName: string;

  @IsString()
  @MaxLength(255)
  clientLastName: string;

  @IsEmail()
  @MaxLength(255)
  clientEmail: string;

  @IsString()
  @MaxLength(20)
  clientPhoneNumber: string;
}
