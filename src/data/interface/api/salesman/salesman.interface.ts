export interface ISalesman {
  salesmanId: string;
  salesmanName: string;
  salesmanLastName: string;
  salesmanEmail: string;
  salesmanPhoneNumber: string;
}

export type ICreateSalesMan = Omit<ISalesman, 'salesmanId'>;

export type IUpdateSalesMan = Partial<ICreateSalesMan>;
