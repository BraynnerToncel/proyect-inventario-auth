import { Client } from '@entity/api/client/client.entity';
import { Product } from '@entity/api/product/product.entity';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';
import { Sale } from '@entity/api/sale/sale.entity';
import { User } from '@entity/api/user/user.entity';
import { ICreateSale } from '@interface/api/sale/sale.interface';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { formatInTimeZone } from 'date-fns-tz';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SaleService {
  @InjectRepository(Sale)
  private readonly repositorySale: Repository<Sale>;

  @InjectRepository(Client)
  private readonly repositoryClient: Repository<Client>;

  @InjectRepository(User)
  private readonly repositoryUser: Repository<User>;

  @InjectRepository(Product)
  private readonly repositoryProduct: Repository<Product>;

  @InjectRepository(SaleDetail)
  private readonly repositorySaleDetail: Repository<SaleDetail>;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: string, createSale: ICreateSale) {
    const { clientId, products, saleMoneyReceived, saleTypeOfPayment } =
      createSale;

    const productMap = new Map<
      string,
      { productId: string; quantity: number }
    >();
    products.forEach(({ productId, quantity }) => {
      if (productMap.has(productId)) {
        productMap.get(productId)!.quantity += quantity;
      } else {
        productMap.set(productId, { productId, quantity });
      }
    });
    const unifiedProducts = Array.from(productMap.values());

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const client = await this.repositoryClient.findOne({
        where: { clientId },
      });

      if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      const user = await this.repositoryUser.findOne({
        where: { userId },
        relations: { personalInformation: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const now = new Date();
      const nowInColombia = formatInTimeZone(
        now,
        'America/Bogota',
        'yyyy-MM-dd HH:mm:ss.SSSXXX',
      );

      const sale = this.repositorySale.create({
        saleDate: new Date(nowInColombia),
        saleMoneyReceived,
        saleTypeOfPayment,
        personalInformation: user.personalInformation,
        client,
        saleMoneyChange: 0,
        subtotal: 0,
        saleDetailTotalTaxes: 0,
      });

      await queryRunner.manager.save(sale);
      let totalPayable = 0;

      for (const productDto of unifiedProducts) {
        const { productId, quantity } = productDto;
        const product = await this.repositoryProduct.findOne({
          where: { productId },
          relations: { tax: true },
        });
        if (!product) {
          throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        if (product.stock < quantity) {
          throw new ConflictException(
            `Insufficient stock for product with ID ${productId}, there are only ${product.stock} `,
          );
        }

        const unitPrice =
          quantity >= product.minWholesaleQuantity
            ? product.productWholesaleValue
            : product.productUnitValue;

        const subtotal = unitPrice * quantity;

        let saleDetailTotalTaxes = 0;
        product.tax.forEach((tax) => {
          saleDetailTotalTaxes += (tax.percentageOfTax / 100) * subtotal;
        });

        const total = subtotal + saleDetailTotalTaxes;

        product.stock -= quantity;

        await this.repositoryProduct.save(product);

        const saleDetail = this.repositorySaleDetail.create({
          sale: sale,
          product: product,
          quantity: productDto.quantity,
          unitPrice: unitPrice,
          subtotal: subtotal,
          saleDetailTotalTaxes: saleDetailTotalTaxes,
          total: total,
        });

        totalPayable += total;

        await queryRunner.manager.save(saleDetail);

        sale.totalpayable = totalPayable;
        sale.saleMoneyChange = saleMoneyReceived - totalPayable;
        sale.subtotal = subtotal;
        sale.saleDetailTotalTaxes = saleDetailTotalTaxes;

        if (sale.saleMoneyChange < 0) {
          throw new ConflictException(
            ` Money received is insufficient for the total amount to be paid, it is needed: ${sale.saleMoneyChange}`,
          );
        }
      }

      await queryRunner.manager.save(sale);

      await queryRunner.commitTransaction();

      this.eventEmitter.emit('emit', {
        channel: 'sale/data',
        data: {
          sale,
        },
      });

      return sale;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
