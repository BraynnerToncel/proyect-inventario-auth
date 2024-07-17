import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Generated,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tax } from '../tax/tax.entity';
import { SedeCompany } from '../sede-company/sede-company.entity';

@Entity()
@Index(['productName', 'productDescription'], { unique: true })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  @Generated('increment')
  productCode: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  productName: string;

  @Column({ type: 'text', nullable: true })
  productDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  productCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  productUnitValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  productWholesaleValue: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'int', nullable: false })
  minWholesaleQuantity: number;

  @ManyToMany(() => Tax, (tax) => tax.product)
  @JoinTable({ name: 'product_has_taxes' })
  tax: Array<Tax>;

  @ManyToOne(() => SedeCompany, (sedeCompany) => sedeCompany.product)
  @JoinColumn({ name: 'sedeId' })
  sede: SedeCompany;
}
