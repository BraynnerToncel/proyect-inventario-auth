import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('Sale Detail')
@ApiSecurity('x-token')
@Controller('sale-detail')
export class SaleDetailController {
  constructor(private readonly saleDetailService: SaleDetailService) {}

  @Post(':personalInformationId')
  @PermissionRequired(ValidPermission.settings_users_create)
  create(
    @Body() createSaleDetailDto: CreateSaleDetailDto,
    @Param('personalInformationId') personalInformationId: string,
  ) {
    return this.saleDetailService.create(
      personalInformationId,
      createSaleDetailDto,
    );
  }

  @Get()
  @PermissionRequired(ValidPermission.settings_users_create)
  findAll() {
    return this.saleDetailService.findAll();
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleDetailService.findOne(+id);
  }
}
