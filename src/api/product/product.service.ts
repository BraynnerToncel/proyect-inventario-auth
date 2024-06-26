import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from '@interface/api/product/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from '@entity/api/product/product.entity';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly repositoryProduct: Repository<Product>;
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createProduct: ICreateProduct): Promise<IProduct> {
    const { productId } = await this.repositoryProduct.save({
      ...createProduct,
    });
    const product = await this.repositoryProduct.findOne({
      where: { productId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'product/data',
      data: { ...product },
    });
    return product;
  }

  async findAll() {
    return await this.repositoryProduct.find();
  }

  async findOne(productId: string) {
    return await this.repositoryProduct.findOne({
      where: { productId },
    });
  }

  async update(
    productId: string,
    updateProduct: IUpdateProduct,
  ): Promise<IProduct> {
    await this.repositoryProduct.save({ productId, ...updateProduct });
    const product = await this.repositoryProduct.findOne({
      where: { productId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'product/data',
      data: { ...product },
    });
    return product;
  }

  async remove(productId: string) {
    const deleteResult: DeleteResult =
      await this.repositoryProduct.delete(productId);

    if (deleteResult.affected === 0) {
      throw new BadRequestException(`Not found role with id ${productId}`);
    }

    this.eventEmitter.emit('emit', {
      channel: 'role/data',
      data: { productId, isDelete: true },
    });

    return productId;
  }
}
