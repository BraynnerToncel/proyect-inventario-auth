import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
