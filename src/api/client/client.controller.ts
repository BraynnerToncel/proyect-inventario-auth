import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('Client')
@ApiSecurity('x-token')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @PermissionRequired(ValidPermission.settings_users_create)
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @PermissionRequired(ValidPermission.settings_users_create)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @PermissionRequired(ValidPermission.settings_users_create)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  @PermissionRequired(ValidPermission.settings_users_create)
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @PermissionRequired(ValidPermission.settings_users_create)
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
