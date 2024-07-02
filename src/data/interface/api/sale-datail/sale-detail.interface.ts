import { Product } from '@entity/api/product/product.entity';
import { Sale } from '@entity/api/sale/sale.entity';

export interface ISaleDetail {
  saleDetailId: string;
  sale: Sale;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ICreateSaleDetail {
  saleId: string;
  productId: string;
  quantity: number;
}
