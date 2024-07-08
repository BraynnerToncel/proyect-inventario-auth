import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../file/file.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  companyId: string;

  @Column()
  companyName: string;

  @Column()
  companyNit: number;

  @Column()
  companyAddress: string;

  @Column()
  companyPhone: string;

  @Column()
  companyEmail: string;

  @Column({ type: 'text', nullable: true })
  companyDescription?: string;

  @Column()
  companyWebsite: string;

  @OneToOne(() => File)
  @JoinColumn()
  fileUrl: File;
}
