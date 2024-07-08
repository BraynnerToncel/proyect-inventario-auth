import { IFile } from '../file/file.interface';

export interface ICompany {
  companyId: string;
  companyName: string;
  companyNit: number;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyDescription?: string;
  companyWebsite: string;
  file?: IFile;
}

export type ICreateCompany = Omit<
  ICompany,
  'companyId' | 'file' | 'companyDescription'
> &
  Partial<Pick<IFile, 'fileId'>> & {
    companyDescription?: string;
  };

export type IUpdateCompany = Partial<ICreateCompany>;
