import { Controller, Get, Param, Delete } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/routes-public.decorator';
import { PersonalInformationService } from './personal-information.service';

@ApiTags('salesman')
@Controller('salesman')
export class PersonalInformationController {
  constructor(private readonly salesmanService: PersonalInformationService) {}

  // @Post()
  // @Public()
  // create(@Body() createSalesmanDto: CreateSalesmanDto) {
  //   return this.salesmanService.create(createSalesmanDto);
  // }

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

  // @Public()
  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSalesmanDto: UpdateSalesmanDto,
  // ) {
  //   return this.salesmanService.update(id, updateSalesmanDto);
  // }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesmanService.remove(id);
  }
}
