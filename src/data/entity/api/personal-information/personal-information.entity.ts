import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Sale } from '../sale/sale.entity';
import { User } from '../user/user.entity';

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn('uuid')
  personalInformationId: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  personalInformationLastName: string;

  @Column({ type: 'varchar', length: 255 })
  personalInformationFullName: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  personalInformationEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  personalInformationCellNumber: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  personalInformationAddres: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  personalInformationidentification: string;

  @OneToMany(() => Sale, (sale) => sale.personalInformation)
  sales: Sale[];

  @OneToOne(() => User, (user) => user.personalInformation)
  user: User;
}
