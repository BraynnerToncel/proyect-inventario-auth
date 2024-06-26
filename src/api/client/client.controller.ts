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
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorator/routes-public.decorator';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Public()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
