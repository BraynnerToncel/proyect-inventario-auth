import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('sale')
@ApiSecurity('x-token')
@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @PermissionRequired(ValidPermission.settings_users_create)
  @Post(':userId')
  create(
    @Body() createSaleDto: CreateSaleDto,
    @Param('userId') userId: string,
  ) {
    return this.saleService.create(userId, createSaleDto);
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }
}
