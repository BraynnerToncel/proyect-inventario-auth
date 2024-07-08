export interface ITaxes {
  taxesId: string;
  taxesName: string;
  percentageOfTax: number;
}

export type ICreateTax = Omit<ITaxes, 'taxesId'>;

export type IUpdateTax = Partial<ICreateTax>;
