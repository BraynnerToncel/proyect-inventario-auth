import { Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salesman } from '@entity/api/salesman/salesman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salesman])],
  controllers: [SalesmanController],
  providers: [SalesmanService],
})
export class SalesmanModule {}
