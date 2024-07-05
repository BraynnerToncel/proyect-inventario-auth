import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(46)
  userPassword: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  personalInformationFullName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  personalInformationLastName: string;

  @IsEmail()
  personalInformationEmail: string;

  @IsString()
  personalInformationCellNumber: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  personalInformationAddres: string;

  @IsString()
  personalInformationidentification: string;

  @IsUUID()
  roleId: string;

  @IsUUID()
  @IsOptional()
  fileId?: string;
}
