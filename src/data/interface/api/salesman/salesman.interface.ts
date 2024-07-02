import { ISale } from '../sale/sale.interface';

export interface ISalesman {
  salesmanId: string;
  salesmanName: string;
  salesmanLastName: string;
  salesmanEmail: string;
  salesmanPhoneNumber: string;
  sales?: Array<ISale>;
}

export type ICreateSalesMan = Omit<ISalesman, 'salesmanId'>;

export type IUpdateSalesMan = Partial<ICreateSalesMan>;
