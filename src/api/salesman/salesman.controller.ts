import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { CreateSalesmanDto } from './dto/create-salesman.dto';
import { UpdateSalesmanDto } from './dto/update-salesman.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/routes-public.decorator';

@ApiTags('salesman')
@Controller('salesman')
export class SalesmanController {
  constructor(private readonly salesmanService: SalesmanService) {}

  @Post()
  @Public()
  create(@Body() createSalesmanDto: CreateSalesmanDto) {
    return this.salesmanService.create(createSalesmanDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.salesmanService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesmanService.findOne(id);
  }

  @Public()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalesmanDto: UpdateSalesmanDto,
  ) {
    return this.salesmanService.update(id, updateSalesmanDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesmanService.remove(id);
  }
}
