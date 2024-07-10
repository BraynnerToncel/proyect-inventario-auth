import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '@entity/api/sale/sale.entity';
import { Client } from '@entity/api/client/client.entity';
import { User } from '@entity/api/user/user.entity';
import { Product } from '@entity/api/product/product.entity';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Client, User, Product, SaleDetail]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
