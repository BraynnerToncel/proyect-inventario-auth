import { IProduct } from '../product/product.interface';

export interface ITaxes {
  taxesId: string;
  taxesName: string;
  taxesIdentifier: string;
  percentageOfTax: number;
  product: Array<IProduct>;
}

export type ICreateTax = Omit<ITaxes, 'taxesId' | 'product'>;

export type IUpdateTax = Partial<ICreateTax>;
