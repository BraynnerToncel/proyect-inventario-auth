import { ITaxes } from '../taxes/taxes.interfaces';

export interface IProduct {
  productId: string;
  productName: string;
  productDescription: string;
  productCost: number;
  productUnitValue: number;
  productWholesaleValue: number;
  stock: number;
  minWholesaleQuantity: number;
  productCode: number;
  tax: Array<ITaxes>;
}

export type ICreateProduct = Omit<
  IProduct,
  'productId' | 'tax' | 'productCode'
> &
  Record<'tax', Array<Pick<ITaxes, 'taxesId'>>>;

export type IUpdateProduct = Partial<ICreateProduct>;
