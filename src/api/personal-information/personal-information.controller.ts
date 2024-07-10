import { Controller, Get, Param, Delete } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { PersonalInformationService } from './personal-information.service';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('salesman')
@Controller('salesman')
export class PersonalInformationController {
  constructor(private readonly salesmanService: PersonalInformationService) {}

  @Get()
  @PermissionRequired(ValidPermission.settings_users_create)
  findAll() {
    return this.salesmanService.findAll();
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesmanService.findOne(id);
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesmanService.remove(id);
  }
}
