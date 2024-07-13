import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class PrinterService {
  private pdfMake: any;

  constructor() {
    this.pdfMake = pdfMake;
    this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  createPdf(docDefinition: TDocumentDefinitions): any {
    return this.pdfMake.createPdf(docDefinition);
  }
}
