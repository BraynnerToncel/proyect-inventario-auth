import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
@Index(['taxesName'], { unique: true })
export class Taxes {
  @PrimaryGeneratedColumn('uuid')
  taxesId: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  taxesIdentifier: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  taxesName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentageOfTax: number;

  @ManyToMany(() => Product, (product) => product.tax)
  product: Array<Product>;
}
