import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { File } from '../file/file.entity';
import { PersonalInformation } from '../personal-information/personal-information.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 151, nullable: false })
  userPassword: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  userState: boolean;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @ManyToOne(() => Role, (role) => role.user, { nullable: false })
  @JoinColumn({ name: 'roleRoleId' })
  role: Role;

  @OneToOne(() => File, (file) => file.user, { nullable: true })
  @JoinColumn({ name: 'fileFileId' })
  file: File;

  @OneToOne(
    () => PersonalInformation,
    (personalInformation) => personalInformation.user,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'personalInformationId' })
  personalInformation: PersonalInformation;
}
