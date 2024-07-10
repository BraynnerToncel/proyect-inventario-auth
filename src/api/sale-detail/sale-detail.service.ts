import { BadRequestException, Injectable } from '@nestjs/common';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@entity/api/sale/sale.entity';
import { Product } from '@entity/api/product/product.entity';
import { DataSource, Repository } from 'typeorm';
import { Client } from '@entity/api/client/client.entity';
import { PersonalInformation } from '@entity/api/personal-information/personal-information.entity';
import { formatInTimeZone } from 'date-fns-tz';
import { ICreateSale } from '@interface/api/sale/sale.interface';

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
  @InjectRepository(PersonalInformation)
  private personlInformationRepository: Repository<PersonalInformation>;
  constructor(private readonly dataSource: DataSource) {}

  async create(
    personalInformationId: string,
    createSaleDetailDto: ICreateSale,
  ) {
    const { clientId, products, saleTypeOfPayment, saleMoneyReceived } =
      createSaleDetailDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const client = await this.clientRepository.findOne({
        where: { clientId },
      });

      const personalInformation =
        await this.personlInformationRepository.findOne({
          where: { personalInformationId },
        });

      const now = new Date();
      const nowInColombia = formatInTimeZone(
        now,
        'America/Bogota',
        'yyyy-MM-dd HH:mm:ss.SSSXXX',
      );

      const sale = this.saleRepository.create({
        saleDate: new Date(nowInColombia),
        personalInformation,
        client,
        saleTypeOfPayment: saleTypeOfPayment,
        saleMoneyReceived,
        totalpayable: 0,
        saleMoneyChange: 0,
      });

      for (const productDto of products) {
        const { productId, quantity } = productDto;
        const product = await this.productRepository.findOne({
          where: { productId },
          loadEagerRelations: false,
          relations: { tax: true },
        });
        const cantMin = product.minWholesaleQuantity;
        const existingSaleDetail = await this.saleDetailRepository.findOne({
          where: { sale, product },
        });

        if (existingSaleDetail) {
          throw new BadRequestException(
            `Product ${productId} is already included in this sale`,
          );
        }

        const unitPrice =
          quantity >= cantMin
            ? product.productWholesaleValue
            : product.productUnitValue;
        const subtotal = unitPrice * quantity;

        let saleDetailTotalTaxes = 0;

        for (const tax of product.tax) {
          saleDetailTotalTaxes += subtotal * (tax.percentageOfTax / 100);
        }
        console.log(saleDetailTotalTaxes);

        sale.totalpayable += subtotal + saleDetailTotalTaxes;

        product.stock -= quantity;

        await this.productRepository.save(product);

        const saleDetail = this.saleDetailRepository.create({
          sale,
          product,
          quantity,
          unitPrice,
          subtotal,
          saleDetailTotalTaxes,
          total: subtotal + saleDetailTotalTaxes,
        });

        console.log('saleDetail :>> ', saleDetail);

        await queryRunner.manager.save(saleDetail);
      }

      sale.saleMoneyChange = saleMoneyReceived - sale.totalpayable;
      await this.saleRepository.save(sale);

      await queryRunner.commitTransaction();
      return 'create';
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
}
