import { IClient } from '@interface/api/client/client.interface';
import { IPersonalInformation } from '../personal-information/personal-nformation.interface';
import { ETypeOfPayment } from '@constant/type-of-payment/type-of-payment.constant';

export interface ISale {
  saleId: string;
  saleDate: Date;
  totalpayable: number;
  saleTypeOfPayment: ETypeOfPayment;
  saleMoneyReceived: number;
  saleMoneyChange: number;
  personalInformation: IPersonalInformation;
  client: IClient;
}

export interface ICreateSale extends Partial<ISale> {
  clientId: string;
  personalInformationId: string;
}
export type IUpdateSale = Partial<ICreateSale>;
