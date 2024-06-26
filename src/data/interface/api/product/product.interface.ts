export interface IPdroduct {
  productId: string;
  productName: string;
  productDescription: string;
  productCost: number;
  productUnitValue: number;
  productWholesaleValue: number;
  stock: number;
}

export type ICreateProduct = Omit<IPdroduct, 'productId'>;

export type IUpdateProduct = Partial<ICreateProduct>;
