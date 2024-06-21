import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role/role.entity';
import { File } from '../file/file.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  userFullName: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  userLastName: string;

  @Column({ type: 'varchar', length: 24, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 32, nullable: false })
  userEmail: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  userPassword: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  userState: boolean;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => File, (file) => file.user)
  @JoinColumn()
  file: File;
}
