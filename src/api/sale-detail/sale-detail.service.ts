import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@entity/api/sale/sale.entity';
import { Product } from '@entity/api/product/product.entity';
import { DataSource, Repository } from 'typeorm';
import { ISaleDetail } from '@interface/api/sale-datail/sale-detail.interface';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { Client } from '@entity/api/client/client.entity';
import { Salesman } from '@entity/api/salesman/salesman.entity';
import { formatInTimeZone } from 'date-fns-tz';

@Injectable()
export class SaleDetailService {
  @InjectRepository(SaleDetail)
  private saleDetailRepository: Repository<SaleDetail>;
  @InjectRepository(Sale)
  private saleRepository: Repository<Sale>;
  @InjectRepository(Product)
  private productRepository: Repository<Product>;
  @InjectRepository(Client)
  private clientRepository: Repository<Client>;
  @InjectRepository(Salesman)
  private salesmanRepository: Repository<Salesman>;
  constructor(private readonly dataSource: DataSource) {}

  async create(
    createSaleDetailDto: CreateSaleDetailDto,
  ): Promise<ISaleDetail[]> {
    const { clientId, salesmanId, products } = createSaleDetailDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log('products :>> ', products);
    try {
      const client = await queryRunner.manager.findOne(Client, {
        where: { clientId },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      const salesman = await queryRunner.manager.findOne(Salesman, {
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

      const sale = await queryRunner.manager.save(Sale, {
        saleDate: new Date(nowInColombia),
        salesman,
        client,
      });

      await queryRunner.commitTransaction();
      console.log('sale :>> ', sale);

      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all saleDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saleDetail`;
  }

  update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    return `This action updates a #${id} saleDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleDetail`;
  }
}
