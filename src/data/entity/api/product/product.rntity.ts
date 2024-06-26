import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  productName: string;

  @Column({ type: 'text', nullable: true })
  productDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productUnitValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  productWholesaleValue: number;

  @Column({ type: 'int', length: 151, nullable: false })
  stock: number;
}
