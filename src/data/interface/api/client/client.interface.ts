export interface IClient {
  clientId: string;
  clientIdentificacion: string;
  clientName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhoneNumber: string;
}

export type ICreateClient = Omit<IClient, 'clientId'>;

export type IUpdateClient = Partial<ICreateClient>;
