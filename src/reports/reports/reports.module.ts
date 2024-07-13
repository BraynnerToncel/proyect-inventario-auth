// reports.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './reports.service';
import { SaleView } from '@entity/view/sale/sale-view.entity';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleView]), // Importa la entidad SaleView aquí
    // Otras importaciones necesarias
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
