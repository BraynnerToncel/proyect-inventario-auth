import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { SedeCompany } from '../sede-company/sede-company.entity';

@Entity()
@Index(['taxName'], { unique: true })
export class Tax {
  @PrimaryGeneratedColumn('uuid')
  taxId: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  taxIdentifier: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  taxName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentageOfTax: number;

  @ManyToMany(() => Product, (product) => product.tax)
  product: Array<Product>;

  @ManyToOne(() => SedeCompany, (sedeCompany) => sedeCompany.tax)
  @JoinColumn({ name: 'sedeId' })
  sede: SedeCompany;
}
