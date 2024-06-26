import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesmanDto } from './create-salesman.dto';

export class UpdateSalesmanDto extends PartialType(CreateSalesmanDto) {}
