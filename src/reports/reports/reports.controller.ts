import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ApiSecurity } from '@nestjs/swagger';
import { ValidPermission } from '@constant/permissions/permissions.constant';
import { PermissionRequired } from '@decorator/permission.decorator';

@ApiSecurity('x-token')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @PermissionRequired(ValidPermission.settings_users_create)
  @Get(':saleId/generate-pdf')
  async generatePdfReport(
    @Res() response: Response,
    @Param('saleId') saleId: string,
  ) {
    try {
      const docDefinition = await this.reportsService.getBillData(saleId);
      const pdfStream = await this.reportsService.generatePdf(docDefinition);

      response.setHeader('Content-Type', 'application/pdf');
      response.send(pdfStream);
    } catch (error) {
      console.error('Error generating PDF:', error);
      response.status(500).send('Error generating PDF');
    }
  }
}
