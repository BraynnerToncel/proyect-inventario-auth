import { IClient } from '@interface/api/client/client.interface';
import { IPersonalInformation } from '../personal-information/personal-nformation.interface';
import { ETypeOfPayment } from '@constant/type-of-payment/type-of-payment.constant';
import { ISaleDetail } from '../sale-datail/sale-detail.interface';
import { IProduct } from '../product/product.interface';

export interface ISale {
  saleId: string;
  saleDate: Date;
  subtotal: number;
  totalpayable: number;
  saleTypeOfPayment: ETypeOfPayment;
  saleMoneyReceived: number;
  saleMoneyChange: number;
  saleDetailTotalTaxes: number;
  personalInformation: IPersonalInformation;
  client: IClient;
  saleDetails: Array<ISaleDetail>;
}

export type ICreateSale = Pick<
  ISale,
  'saleMoneyReceived' | 'saleTypeOfPayment'
> & {
  clientId: string;
  products: Array<Products>;
};

type Products = Pick<IProduct, 'productId'> & Pick<ISaleDetail, 'quantity'>;
export type IUpdateSale = Partial<ICreateSale>;
