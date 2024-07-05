import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '@entity/api/sale/sale.entity';
import { Client } from '@entity/api/client/client.entity';
import { PersonalInformation } from '@entity/api/personal-information/personal-information.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Client, PersonalInformation])],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
