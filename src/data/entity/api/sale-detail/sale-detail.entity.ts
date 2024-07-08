import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sale } from '../sale/sale.entity';
import { Product } from '../product/product.entity';

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn('uuid')
  saleDetailId: string;

  @ManyToOne(() => Sale, (sale) => sale.saleDetails)
  sale: Sale;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;
}
