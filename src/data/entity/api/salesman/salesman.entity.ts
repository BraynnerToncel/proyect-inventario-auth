import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../sale/sale.entity';

@Entity()
export class Salesman {
  @PrimaryGeneratedColumn('uuid')
  salesmanId: string;

  @Column({ type: 'varchar', length: 255 })
  salesmanName: string;

  @Column({ type: 'varchar', length: 255 })
  salesmanLastName: string;

  @Column({ type: 'varchar', length: 255 })
  salesmanEmail: string;

  @Column({ type: 'varchar', length: 20 })
  salesmanPhoneNumber: string;

  @OneToMany(() => Sale, (sale) => sale.salesman)
  sales: Sale[];
}
