import { Injectable } from '@nestjs/common';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';

@Injectable()
export class SalesmanService {
  create(createSalesmanDto: CreateSalesmanDto) {
    return 'This action adds a new salesman';
  }

  findAll() {
    return `This action returns all salesman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} salesman`;
  }

  update(id: number, updateSalesmanDto: UpdateSalesmanDto) {
    return `This action updates a #${id} salesman`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesman`;
  }
}
