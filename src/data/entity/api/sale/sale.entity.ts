import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Salesman } from '../salesman/salesman.entity';
import { Client } from '../client/client.entity';
import { SaleDetail } from '../sale-detail/sale-detail.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @CreateDateColumn({ type: 'timestamp' })
  saleDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @ManyToOne(() => Salesman, (salesman) => salesman.sales)
  @JoinColumn({ name: 'salesmanId' })
  salesman: Salesman;

  @ManyToOne(() => Client, (client) => client.sales)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetails: Array<SaleDetail>;
}
