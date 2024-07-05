import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/routes-public.decorator';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';

@ApiTags('Sale Detail')
@Controller('sale-detail')
export class SaleDetailController {
  constructor(private readonly saleDetailService: SaleDetailService) {}

  @Post(':personalInformationId')
  @Public()
  create(
    @Body() createSaleDetailDto: CreateSaleDetailDto,
    @Param('personalInformationId') personalInformationId: string,
  ) {
    return this.saleDetailService.create(
      personalInformationId,
      createSaleDetailDto,
    );
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
}
