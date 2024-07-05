import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PersonalInformation } from '@entity/api/personal-information/personal-information.entity';

@Injectable()
export class PersonalInformationService {
  @InjectRepository(PersonalInformation)
  private readonly repositorioSalesman: Repository<PersonalInformation>;
  constructor(private readonly eventEmitter: EventEmitter2) {}

  // async create(createSalesman: ICreateSalesMan): Promise<ISalesman> {
  //   const { salesmanId } = await this.repositorioSalesman.save({
  //     ...createSalesman,
  //   });
  //   const salesman = await this.repositorioSalesman.findOne({
  //     where: { salesmanId },
  //   });
  //   this.eventEmitter.emit('emit', {
  //     channel: 'salesman/data',
  //     data: { ...salesman },

  //   });
  //   return salesman;
  // }

  async findAll() {
    return await this.repositorioSalesman.find();
  }

  async findOne(personalInformationId: string) {
    return await this.repositorioSalesman.findOne({
      where: { personalInformationId },
    });
  }

  // async update(
  //   salesmanId: string,
  //   updateSalesman: IUpdateSalesMan,
  // ): Promise<ISalesman> {
  //   await this.repositorioSalesman.save({ salesmanId, ...updateSalesman });
  //   const salesman = await this.repositorioSalesman.findOne({
  //     where: { salesmanId },
  //   });
  //   this.eventEmitter.emit('emit', {
  //     channel: 'salesman/data',
  //     data: { ...salesman },
  //   });
  //   return salesman;
  // }

  async remove(id: string) {
    return `This action removes a #${id} salesman`;
  }
}
