import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ICreateTax,
  ITax,
  IUpdateTax,
} from '@interface/api/tax/tax.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from '@entity/api/tax/tax.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TaxesService {
  @InjectRepository(Tax)
  private readonly repositoryTaxes: Repository<Tax>;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createTax: ICreateTax) {
    const { taxId } = await this.repositoryTaxes.save({
      ...createTax,
    });

    const taxes = await this.repositoryTaxes.findOne({
      where: { taxId },
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

  async findOne(taxId: string) {
    return await this.repositoryTaxes.findOne({
      where: { taxId },
    });
  }

  async update(taxId: string, updateTax: IUpdateTax): Promise<ITax> {
    await this.repositoryTaxes.save({ taxId, ...updateTax });
    const taxes = await this.repositoryTaxes.findOne({
      where: { taxId },
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
