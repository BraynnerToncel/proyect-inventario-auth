import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { IClient, ICreateClient } from '@interface/api/client/client.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '@entity/api/client/client.entity';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly repositorioClient: Repository<Client>;
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async create(createClient: ICreateClient): Promise<IClient> {
    const { clientId } = await this.repositorioClient.save({
      ...createClient,
    });
    const client = await this.repositorioClient.findOne({
      where: { clientId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'client/data',
      data: { ...client },
    });
    return client;
  }

  async findAll() {
    return await this.repositorioClient.find();
  }

  async findOne(clientId: string) {
    return await this.repositorioClient.findOne({ where: { clientId } });
  }

  async update(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ): Promise<IClient> {
    await this.repositorioClient.save({ clientId, ...updateClientDto });
    const client = await this.repositorioClient.findOne({
      where: { clientId },
    });
    this.eventEmitter.emit('emit', {
      channel: 'client/data',
      data: { ...client },
    });
    return client;
  }

  async remove(clientId: string) {
    const deleteResult: DeleteResult =
      await this.repositorioClient.delete(clientId);
    if (deleteResult.affected === 0) {
      throw new BadRequestException(`Not found role with id ${clientId}`);
    }

    this.eventEmitter.emit('emit', {
      channel: 'role/data',
      data: { clientId, isDelete: true },
    });

    return clientId;
  }
}
