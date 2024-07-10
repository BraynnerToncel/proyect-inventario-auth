import { ISale } from '../sale/sale.interface';
import { IProduct } from '../product/product.interface';

export interface ISaleDetail {
  saleDetailId: string;
  sale: ISale;
  product: IProduct;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  saleDetailTotalTaxes: number;
  total: number;
}

export type ICreateSaleDetail = Omit<
  ISaleDetail,
  'saleDetailId' | 'sale' | 'product'
> & {
  saleId: string;
  productId: string;
};
