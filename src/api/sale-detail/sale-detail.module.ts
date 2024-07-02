import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';
import { Sale } from '@entity/api/sale/sale.entity';
import { Product } from '@entity/api/product/product.entity';
import { Salesman } from '@entity/api/salesman/salesman.entity';
import { Client } from '@entity/api/client/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleDetail, Sale, Product, Client, Salesman]),
  ],
  controllers: [SaleDetailController],
  providers: [SaleDetailService],
})
export class SaleDetailModule {}
