import { Injectable } from '@nestjs/common';
import {
  ICreateCompany,
  IUpdateCompany,
} from '@interface/api/company/company.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@entity/api/company/company.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CompanyService {
  @InjectRepository(Company)
  private readonly repositoryCompany: Repository<Company>;
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createCompany: ICreateCompany) {
    const { companyId } = await this.repositoryCompany.save({
      ...createCompany,
    });
    const company = await this.repositoryCompany.findOne({
      where: { companyId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'company/data',
      data: { ...company },
    });
    return company;
  }

  async findAll() {
    return await this.repositoryCompany.find();
  }

  async findOne(companyId: string) {
    return await this.repositoryCompany.findOne({
      where: { companyId },
    });
  }

  async update(companyId: string, updateCompany: IUpdateCompany) {
    await this.repositoryCompany.save({ companyId, ...updateCompany });

    const company = await this.repositoryCompany.findOne({
      where: { companyId },
    });

    this.eventEmitter.emit('emit', {
      channel: 'company/data',
      data: { ...company },
    });

    return company;
  }
}
