import { ITax } from '../tax/tax.interfaces';

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
  tax: Array<ITax>;
}

export type ICreateProduct = Omit<
  IProduct,
  'productId' | 'tax' | 'productCode'
> &
  Record<'tax', Array<Pick<ITax, 'taxId'>>>;

export type IUpdateProduct = Partial<ICreateProduct>;
