import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Generated,
  Index,
} from 'typeorm';
import { Taxes } from '../taxes/taxes.entity';

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

  @ManyToMany(() => Taxes, (taxes) => taxes.product)
  @JoinTable({ name: 'product_has_taxes' })
  tax: Array<Taxes>;
}
