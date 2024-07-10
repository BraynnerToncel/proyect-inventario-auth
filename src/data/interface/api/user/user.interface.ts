import { IFile } from '../file/file.interface';
import { IRole } from '../role/role.interface';
import {
  ICreatePersonalInformation,
  IPersonalInformation,
} from '../personal-information/personal-nformation.interface';

export interface IUser {
  userId: string;
  userPassword: string;
  username: string;
  userState: boolean;
  role: IRole;
  file?: IFile;
  personalInformation?: IPersonalInformation;
}

export type IUserFindCondition = Partial<Pick<IUser, 'userId' | 'username'>>;

export type ICreateUser = Omit<
  IUser,
  'userId' | 'role' | 'userState' | 'file' | 'personalInformation'
> &
  Pick<IRole, 'roleId'> &
  Partial<Pick<IFile, 'fileId'>> &
  ICreatePersonalInformation;

export type IUpdateUser = Partial<ICreateUser> &
  Partial<Record<'newPassword', string>> &
  Partial<Record<'role', Pick<IRole, 'roleId'>>> &
  Partial<Record<'file', Pick<IFile, 'fileId'>>>;

export type IUserRestorePassword = Record<'password', string>;
