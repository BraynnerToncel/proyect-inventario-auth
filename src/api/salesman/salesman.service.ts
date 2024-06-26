import { Injectable } from '@nestjs/common';
import {
  ICreateSalesMan,
  ISalesman,
  IUpdateSalesMan,
} from '@interface/api/salesman/salesman.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Salesman } from '@entity/api/salesman/salesman.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SalesmanService {
  @InjectRepository(Salesman)
  private readonly repositorioSalesman: Repository<Salesman>;
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createSalesman: ICreateSalesMan): Promise<ISalesman> {
    const { salesmanId } = await this.repositorioSalesman.save({
      ...createSalesman,
    });
    const salesman = await this.repositorioSalesman.findOne({
      where: { salesmanId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'salesman/data',
      data: { ...salesman },
    });
    return salesman;
  }

  async findAll() {
    return await this.repositorioSalesman.find();
  }

  async findOne(salesmanId: string) {
    return await this.repositorioSalesman.findOne({ where: { salesmanId } });
  }

  async update(
    salesmanId: string,
    updateSalesman: IUpdateSalesMan,
  ): Promise<ISalesman> {
    await this.repositorioSalesman.save({ salesmanId, ...updateSalesman });
    const salesman = await this.repositorioSalesman.findOne({
      where: { salesmanId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'salesman/data',
      data: { ...salesman },
    });
    return salesman;
  }

  async remove(id: string) {
    return `This action removes a #${id} salesman`;
  }
}
