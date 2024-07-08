import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Taxes {
  @PrimaryGeneratedColumn('uuid')
  taxesId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  taxesName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  percentageOfTax: number;
}
