import { BadRequestException, Injectable } from '@nestjs/common';
import { SaleDetail } from '@entity/api/sale-detail/sale-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '@entity/api/sale/sale.entity';
import { Product } from '@entity/api/product/product.entity';
import { DataSource, Repository } from 'typeorm';
import { ISaleDetail } from '@interface/api/sale-datail/sale-detail.interface';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { Client } from '@entity/api/client/client.entity';
import { formatInTimeZone } from 'date-fns-tz';
import { PersonalInformation } from '@entity/api/personal-information/personal-information.entity';

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
    createSaleDetailDto: CreateSaleDetailDto,
  ): Promise<ISaleDetail[]> {
    const { clientId, products } = createSaleDetailDto;
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
        `"yyyy-MM-dd HH:mm:ss.SSSXXX"`,
      );

      const sale = await this.saleRepository.save({
        saleDate: new Date(nowInColombia),
        personalInformation,
        client,
      });

      const createdSaleDetails: ISaleDetail[] = [];

      for (const productDto of products) {
        const { productId, quantity } = productDto;
        const product = await this.productRepository.findOne({
          where: { productId },
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

        sale.total = (sale.total || 0) + subtotal;

        product.stock -= quantity;

        await this.productRepository.save(product);
        await this.saleRepository.save(sale);

        const saleDetail = this.saleDetailRepository.create({
          sale,
          product,
          quantity,
          unitPrice,
          subtotal,
        });

        const savedSaleDetail =
          await this.saleDetailRepository.save(saleDetail);
        createdSaleDetails.push(savedSaleDetail);
      }

      await queryRunner.commitTransaction();
      return createdSaleDetails;
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
