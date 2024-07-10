import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PermissionRequired } from '@decorator/permission.decorator';
import { ValidPermission } from '@constant/permissions/permissions.constant';

@ApiTags('Product')
@ApiSecurity('x-token')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PermissionRequired(ValidPermission.settings_users_create)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @PermissionRequired(ValidPermission.settings_users_create)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
