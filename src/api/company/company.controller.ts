import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('Campany')
@ApiSecurity('x-token')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @PermissionRequired(ValidPermission.settings_users_create)
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @PermissionRequired(ValidPermission.settings_users_create)
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @PermissionRequired(ValidPermission.settings_users_create)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Put(':id')
  @PermissionRequired(ValidPermission.settings_users_create)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }
}
