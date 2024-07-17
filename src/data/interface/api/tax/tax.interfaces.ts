import { IProduct } from '../product/product.interface';

export interface ITax {
  taxId: string;
  taxName: string;
  taxIdentifier: string;
  percentageOfTax: number;
  product: Array<IProduct>;
}

export type ICreateTax = Omit<ITax, 'taxId' | 'product'>;

export type IUpdateTax = Partial<ICreateTax>;
