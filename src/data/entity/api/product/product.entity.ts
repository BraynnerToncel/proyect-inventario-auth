import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

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
}
