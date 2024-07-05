import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { SaleDetail } from '../sale-detail/sale-detail.entity';
import { PersonalInformation } from '../personal-information/personal-information.entity';
import { Client } from '../client/client.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  saleId: string;

  @CreateDateColumn({ type: 'timestamp' })
  saleDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @ManyToOne(
    () => PersonalInformation,
    (personalInformation) => personalInformation.sales,
  )
  @JoinColumn({ name: 'personalInformationId' })
  personalInformation: PersonalInformation;

  @ManyToOne(() => Client, (client) => client.sales)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale)
  saleDetails: Array<SaleDetail>;
}
