import { ISale } from '../sale/sale.interface';

export interface IClient {
  clientId: string;
  clientIdentificacion: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhoneNumber: string;
  sales?: Array<ISale>;
}

export type ICreateClient = Omit<IClient, 'clientId'>;

export type IUpdateClient = Partial<ICreateClient>;
