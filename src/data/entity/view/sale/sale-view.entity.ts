import { ViewEntity, ViewColumn } from 'typeorm';

interface Client {
  clientName: string;
  clientIdentificacion: string;
  clientEmail: string;
}

interface SaleDetail {
  saleDetailId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  saleDetailTotalTaxes: number;
  total: number;
  productCode: string;
  taxesIdentifier: string;
}

interface Sale {
  saleDate: string;
  totalpayable: number;
  saleTypeOfPayment: string;
  saleDetailTotalTaxes: number;
  subtotal: number;
  saleMoneyReceived: number;
  saleMoneyChange: number;
}

@ViewEntity({
  expression: `
    SELECT
      s."saleId" AS "saleId",
      jsonb_build_object(
        'clientName', cl."clientName",
        'clientIdentificacion', cl."clientIdentificacion",
        'clientEmail', cl."clientEmail"
      ) AS client,
      jsonb_agg(DISTINCT jsonb_build_object(
        'saleDetailId', sd."saleDetailId",
        'quantity', sd."quantity",
        'unitPrice', sd."unitPrice",
        'subtotal', sd."subtotal",
        'saleDetailTotalTaxes', sd."saleDetailTotalTaxes",  -- Aquí se usa sd para saleDetailTotalTaxes
        'total', sd."total",
        'productCode', p."productCode",
        'taxesIdentifier', t."taxesIdentifier"
      )) AS "saleDetail",
      jsonb_build_object(
        'saleDate', s."saleDate",
        'totalpayable', s."totalpayable",
        'subtotal' , s."subtotal",
        'saleDetailTotalTaxes' , s."saleDetailTotalTaxes",  -- Aquí se usa s para saleDetailTotalTaxes
        'saleTypeOfPayment', s."saleTypeOfPayment",
        'saleMoneyReceived', s."saleMoneyReceived",
        'saleMoneyChange', s."saleMoneyChange"
      ) AS sale
    FROM
      "sale" s
    INNER JOIN
      "client" cl ON s."clientId" = cl."clientId"
    INNER JOIN
      "sale_detail" sd ON s."saleId" = sd."saleId"
    INNER JOIN
      "product" p ON sd."productProductId" = p."productId"
    LEFT JOIN
      "product_has_taxes" pht ON p."productId" = pht."productProductId"
    LEFT JOIN
      "taxes" t ON pht."taxesTaxesId" = t."taxesId"
    GROUP BY
      s."saleId",
      cl."clientName",
      cl."clientIdentificacion",
      cl."clientEmail",
      s."saleDate",
      s."totalpayable",
      s."saleTypeOfPayment",
      s."saleMoneyReceived",
      s."saleMoneyChange"
  `,
})
export class SaleView {
  @ViewColumn()
  saleId: string;

  @ViewColumn()
  client: Client;

  @ViewColumn()
  saleDetail: SaleDetail[];

  @ViewColumn()
  sale: Sale;
}
