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
  fileUrl: IFile;
}

export interface ICreateCompany
  extends Pick<
    ICompany,
    | 'companyName'
    | 'companyNit'
    | 'companyAddress'
    | 'companyPhone'
    | 'companyEmail'
    | 'companyWebsite'
    | 'fileUrl'
  > {}

export interface IUpdateCompany extends Partial<ICreateCompany> {}
