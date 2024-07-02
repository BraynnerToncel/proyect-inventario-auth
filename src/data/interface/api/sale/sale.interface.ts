import { IClient } from '@interface/api/client/client.interface';
import { ISalesman } from '../salesman/salesman.interface';

export interface ISale {
  saleId: string;
  saleDate: Date;
  total: number;
  salesman: ISalesman;
  client: IClient;
}

// export type ICreateSale = Omit<
//   ISale,
//   'salesman' | 'client' | 'saleId' | 'saleDate' | 'total'
// > &
//   Pick<IClient, 'clientId'> &
//   Pick<ISalesman, 'salesmanId'>;

export interface ICreateSale extends Partial<ISale> {
  salesmanId: string;
  clientId: string;
}
export type IUpdateSale = Partial<ICreateSale>;
