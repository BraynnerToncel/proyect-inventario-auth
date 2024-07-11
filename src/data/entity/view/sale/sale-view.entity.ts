import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT
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
        'saleDetailTotalTaxes', sd."saleDetailTotalTaxes",
        'total', sd."total",
        'productCode', p."productCode",
        'taxesIdentifier', t."taxesIdentifier"
      )) AS saleDetail,
      jsonb_build_object(
        'saleDate', s."saleDate",
        'totalpayable', s."totalpayable",
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
  client: object;

  @ViewColumn()
  saleDetail: object;

  @ViewColumn()
  sale: object;
}
