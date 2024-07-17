import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tax } from '../tax/tax.entity';
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';

@Entity()
export class SedeCompany {
  @PrimaryGeneratedColumn('uuid')
  sedeId: string;

  @OneToMany(() => Tax, (tax) => tax.sede)
  tax: Array<Tax>;

  @OneToMany(() => Product, (product) => product.sede)
  product: Array<Product>;

  @OneToMany(() => Client, (client) => client.sede)
  client: Array<Client>;
}
