import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalInformation } from './create-personal-information.dto';

export class UpdatePersonalInformation extends PartialType(
  CreatePersonalInformation,
) {}
