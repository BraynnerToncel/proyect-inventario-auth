import { Module } from '@nestjs/common';
import { SalesmanService } from './salesman.service';
import { SalesmanController } from './salesman.controller';

@Module({
  controllers: [SalesmanController],
  providers: [SalesmanService],
})
export class SalesmanModule {}
