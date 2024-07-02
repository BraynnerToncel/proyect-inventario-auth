import { Client } from '@entity/api/client/client.entity';
import { Sale } from '@entity/api/sale/sale.entity';
import { Salesman } from '@entity/api/salesman/salesman.entity';
import { ICreateSale } from '@interface/api/sale/sale.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { formatInTimeZone } from 'date-fns-tz';
import { Repository } from 'typeorm';

@Injectable()
export class SaleService {
  @InjectRepository(Salesman)
  private readonly repositorySalesman: Repository<Salesman>;

  @InjectRepository(Sale)
  private readonly repositorySale: Repository<Sale>;

  @InjectRepository(Client)
  private readonly repositoryClient: Repository<Client>;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createSale: ICreateSale) {
    const { clientId, salesmanId } = createSale;

    const client = await this.repositoryClient.findOne({
      where: { clientId },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    const salesman = await this.repositorySalesman.findOne({
      where: { salesmanId },
    });
    if (!salesman) {
      throw new NotFoundException(`Salesman with ID ${salesmanId} not found`);
    }
    const now = new Date();
    const nowInColombia = formatInTimeZone(
      now,
      'America/Bogota',
      `"yyyy-MM-dd HH:mm:ss.SSSXXX"`,
    );

    const { saleId } = await this.repositorySale.save({
      ...createSale,
      saleDate: new Date(nowInColombia),
      salesman,
      client,
    });
    const sale = await this.repositorySale.findOne({
      where: { saleId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'sale/data',
      data: { ...sale },
    });
    return sale;
  }

  async findAll() {
    return await this.repositorySale.find({
      relations: ['client', 'salesman'],
    });
  }

  async findOne(saleId: string) {
    return await this.repositorySale.findOne({
      where: { saleId },
      relations: ['client', 'salesman'],
    });
  }
}
