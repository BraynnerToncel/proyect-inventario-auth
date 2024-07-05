import { IClient } from '@interface/api/client/client.interface';
import { IPersonalInformation } from '../personal-information/personal-nformation.interface';

export interface ISale {
  saleId: string;
  saleDate: Date;
  total: number;
  personalInformation: IPersonalInformation;
  client: IClient;
}

export interface ICreateSale extends Partial<ISale> {
  clientId: string;
  personalInformationId: string;
}
export type IUpdateSale = Partial<ICreateSale>;
