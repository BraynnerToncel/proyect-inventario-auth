import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import PdfPrinter from 'pdfmake/src/printer'; // Asegúrate de que la ruta es correcta
import { SaleView } from '@entity/view/sale/sale-view.entity';
import { billReport } from './documen/bill.reports';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(SaleView)
    private saleViewRepository: Repository<SaleView>,
  ) {}

  async generatePdf(docDefinition: TDocumentDefinitions): Promise<Buffer> {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts);

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });
  }

  async getBillData(saleId: string): Promise<TDocumentDefinitions> {
    try {
      const saleData = await this.saleViewRepository.findOne({
        where: { saleId },
      });
      if (!saleData) {
        throw new Error('Sale data not found');
      }
      return billReport(saleData);
    } catch (error) {
      console.error('Error retrieving sale data:', error);
      throw new Error('Failed to retrieve sale data');
    }
  }
}
