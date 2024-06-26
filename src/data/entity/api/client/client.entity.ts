import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  clientId: string;

  @Column({ type: 'varchar', length: 255 })
  clientIdentificacion: string;

  @Column({ type: 'varchar', length: 255 })
  clientName: string;

  @Column({ type: 'varchar', length: 255 })
  clientLastName: string;

  @Column({ type: 'varchar', length: 255 })
  clientEmail: string;

  @Column({ type: 'varchar', length: 20 })
  clientPhoneNumber: string;
}
