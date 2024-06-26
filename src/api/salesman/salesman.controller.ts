import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';

@Controller('salesman')
export class SalesmanController {
  constructor(private readonly salesmanService: SalesmanService) {}

  @Post()
  create(@Body() createSalesmanDto: CreateSalesmanDto) {
    return this.salesmanService.create(createSalesmanDto);
  }

  @Get()
  findAll() {
    return this.salesmanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesmanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesmanDto: UpdateSalesmanDto) {
    return this.salesmanService.update(+id, updateSalesmanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesmanService.remove(+id);
  }
}
