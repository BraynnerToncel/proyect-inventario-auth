import { ISale } from '../sale/sale.interface';
import { IUser } from '../user/user.interface';

export interface IPersonalInformation {
  personalInformationId: string;
  personalInformationFullName: string;
  personalInformationLastName: string;
  personalInformationEmail: string;
  personalInformationCellNumber: string;
  personalInformationAddres: string;
  personalInformationidentification: string;
  sales?: Array<ISale>;
  user?: IUser;
}

export type ICreatePersonalInformation = Omit<
  IPersonalInformation,
  'personalInformationId' | 'user' | 'sales'
>;

export type IUpdateSalesMan = Partial<ICreatePersonalInformation>;
