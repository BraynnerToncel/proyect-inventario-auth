import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateTax,
  ITaxes,
  IUpdateTax,
} from '@interface/api/taxes/taxes.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxes } from '@entity/api/taxes/taxes.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TaxesService {
  @InjectRepository(Taxes)
  private readonly repositoryTaxes: Repository<Taxes>;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createTax: ICreateTax) {
    const { taxesId } = await this.repositoryTaxes.save({
      ...createTax,
    });

    const taxes = await this.repositoryTaxes.findOne({
      where: { taxesId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'taxes/data',
      data: { ...taxes },
    });
    return taxes;
  }

  async findAll() {
    return await this.repositoryTaxes.find();
  }

  async findOne(taxesId: string) {
    return await this.repositoryTaxes.findOne({
      where: { taxesId },
    });
  }

  async update(taxesId: string, updateTax: IUpdateTax): Promise<ITaxes> {
    await this.repositoryTaxes.save({ taxesId, ...updateTax });
    const taxes = await this.repositoryTaxes.findOne({
      where: { taxesId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'taxes/data',
      data: { ...taxes },
    });
    return taxes;
  }

  async remove(taxesId: string) {
    const deleteResult: DeleteResult =
      await this.repositoryTaxes.delete(taxesId);

    if (deleteResult.affected === 0) {
      throw new BadRequestException(`Not found role with id ${taxesId}`);
    }

    this.eventEmitter.emit('emit', {
      channel: 'taxes/data',
      data: { taxesId, isDelete: true },
    });

    return taxesId;
  }
}
