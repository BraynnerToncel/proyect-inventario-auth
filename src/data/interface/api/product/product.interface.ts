export interface IProduct {
  productId: string;
  productName: string;
  productDescription: string;
  productCost: number;
  productUnitValue: number;
  productWholesaleValue: number;
  stock: number;
}

export type ICreateProduct = Omit<IProduct, 'productId'>;

export type IUpdateProduct = Partial<ICreateProduct>;
