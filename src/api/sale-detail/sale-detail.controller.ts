import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/routes-public.decorator';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';

@ApiTags('Sale Detail')
@Controller('sale-detail')
export class SaleDetailController {
  constructor(private readonly saleDetailService: SaleDetailService) {}

  @Post(':saleId')
  @Public()
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailService.create(createSaleDetailDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.saleDetailService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleDetailService.findOne(+id);
  }

  @Public()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleDetailDto: UpdateSaleDetailDto,
  ) {
    return this.saleDetailService.update(+id, updateSaleDetailDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleDetailService.remove(+id);
  }
}
