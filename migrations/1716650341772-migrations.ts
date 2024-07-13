import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716650341772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("permissionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissionName" character varying(100) NOT NULL, "permissionDescription" character varying(200) NOT NULL, "permissionState" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_86b314be9c1be5c62b3a9d97ae4" PRIMARY KEY ("permissionId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("roleId" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleName" character varying(45) NOT NULL, "roleDescription" character varying(100) NOT NULL, "roleState" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_703705ba862c2bb45250962c9e1" PRIMARY KEY ("roleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("fileId" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying(50) NOT NULL, "fileType" character varying NOT NULL DEFAULT true, "fileUrl" character varying NOT NULL, "fileLength" character varying(50) NOT NULL, CONSTRAINT "PK_f620cbf511fcf9b5970d187fdca" PRIMARY KEY ("fileId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "taxes" ("taxesId" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxesName" character varying(255) NOT NULL, "percentageOfTax" numeric(5,2) NOT NULL, CONSTRAINT "PK_cf4ba02c0ec220847f2f9dfa38b" PRIMARY KEY ("taxesId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "productCode" integer NOT NULL, "productName" character varying(255) NOT NULL, "productDescription" text, "productCost" numeric(10,2) NOT NULL, "productUnitValue" numeric(10,2) NOT NULL, "productWholesaleValue" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "minWholesaleQuantity" integer NOT NULL, CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale_detail" ("saleDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "saleDetailTotalTaxes" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "saleSaleId" uuid, "productProductId" uuid, CONSTRAINT "PK_d508e7c5bb31f30b0bbbca121d5" PRIMARY KEY ("saleDetailId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "client" ("clientId" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientIdentificacion" character varying(255) NOT NULL, "clientName" character varying(255) NOT NULL, "clientLastName" character varying(255) NOT NULL, "clientEmail" character varying(255) NOT NULL, "clientPhoneNumber" character varying(20) NOT NULL, CONSTRAINT "PK_6ed9067942d7537ce359e172ff6" PRIMARY KEY ("clientId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sale" ("saleId" uuid NOT NULL DEFAULT uuid_generate_v4(), "saleDate" TIMESTAMP NOT NULL DEFAULT now(), "totalpayable" numeric(10,2), "saleTypeOfPayment" "public"."sale_saletypeofpayment_enum" NOT NULL, "saleMoneyReceived" numeric(10,2) NOT NULL, "saleMoneyChange" numeric(10,2) NOT NULL, "personalInformationId" uuid, "clientId" uuid, CONSTRAINT "PK_61e9fc39f22df5682850ea649f2" PRIMARY KEY ("saleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "personal_information" ("personalInformationId" uuid NOT NULL DEFAULT uuid_generate_v4(), "personalInformationLastName" character varying(32) NOT NULL, "personalInformationFullName" character varying(255) NOT NULL, "personalInformationEmail" character varying(32) NOT NULL, "personalInformationCellNumber" character varying(255) NOT NULL, "personalInformationAddres" character varying(32) NOT NULL, "personalInformationidentification" character varying(32) NOT NULL, CONSTRAINT "PK_d27ae7d71f575273c8c637804f8" PRIMARY KEY ("personalInformationId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userPassword" character varying(151) NOT NULL, "userState" boolean NOT NULL DEFAULT true, "username" character varying(255) NOT NULL, "roleRoleId" uuid NOT NULL, "fileFileId" uuid, "personalInformationId" uuid, CONSTRAINT "REL_e9ac21f63535580f0c50b22817" UNIQUE ("fileFileId"), CONSTRAINT "REL_3f04cee14c74af225aeb27f722" UNIQUE ("personalInformationId"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("companyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "companyNit" integer NOT NULL, "companyAddress" character varying NOT NULL, "companyPhone" character varying NOT NULL, "companyEmail" character varying NOT NULL, "companyDescription" text, "companyWebsite" character varying NOT NULL, "fileUrlFileId" uuid, CONSTRAINT "REL_0dd101cc0fe82f57bb70e67dba" UNIQUE ("fileUrlFileId"), CONSTRAINT "PK_81611e86d930483997273420166" PRIMARY KEY ("companyId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_has_permissions" ("roleRoleId" uuid NOT NULL, "permissionPermissionId" uuid NOT NULL, CONSTRAINT "PK_af15ccac31be8675c639966fd4c" PRIMARY KEY ("roleRoleId", "permissionPermissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3beb30d0cc8790859f16ad9ff9" ON "roles_has_permissions" ("roleRoleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7a49bb3774e053242dee39cc5e" ON "roles_has_permissions" ("permissionPermissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "product_has_taxes" ("productProductId" uuid NOT NULL, "taxesTaxesId" uuid NOT NULL, CONSTRAINT "PK_a5c11724de484b31de784464ebb" PRIMARY KEY ("productProductId", "taxesTaxesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_15793adccf6ad178920c6b12d4" ON "product_has_taxes" ("productProductId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d89ce12af2dd6534ff1464f0ad" ON "product_has_taxes" ("taxesTaxesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "sale_detail" ADD CONSTRAINT "FK_5577177eb9ed86f21c841e04b0c" FOREIGN KEY ("saleSaleId") REFERENCES "sale"("saleId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale_detail" ADD CONSTRAINT "FK_c58161fdb7d682ef0e3fdd275ce" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_7aeed9d9c66d6fda0c7e5f3ecec" FOREIGN KEY ("personalInformationId") REFERENCES "personal_information"("personalInformationId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_1f170accf5236a71106a84ed97b" FOREIGN KEY ("clientId") REFERENCES "client"("clientId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e9ac21f63535580f0c50b228179" FOREIGN KEY ("fileFileId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3f04cee14c74af225aeb27f722a" FOREIGN KEY ("personalInformationId") REFERENCES "personal_information"("personalInformationId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_0dd101cc0fe82f57bb70e67dba0" FOREIGN KEY ("fileUrlFileId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_3beb30d0cc8790859f16ad9ff96" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_7a49bb3774e053242dee39cc5e1" FOREIGN KEY ("permissionPermissionId") REFERENCES "permission"("permissionId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_has_taxes" ADD CONSTRAINT "FK_15793adccf6ad178920c6b12d44" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_has_taxes" ADD CONSTRAINT "FK_d89ce12af2dd6534ff1464f0ade" FOREIGN KEY ("taxesTaxesId") REFERENCES "taxes"("taxesId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`CREATE VIEW "user_view" AS 
SELECT 
  "u"."userId" AS "userId", 
  "pi"."personalInformationFullName" AS "userFullName", 
  "pi"."personalInformationLastName" AS "userLastName", 
  "pi"."personalInformationEmail" AS "userEmail", 
  "u"."username" AS "username", 
  "u"."userState" AS "userState", 
  "r"."roleName" AS "roleName", 
  "f"."fileUrl" AS "fileUrl"
FROM 
  "user" "u"
INNER JOIN 
  "personal_information" "pi" ON "u"."personalInformationId" = "pi"."personalInformationId"
INNER JOIN 
  "role" "r" ON "u"."roleRoleId" = "r"."roleId"
LEFT JOIN 
  "file" "f" ON "u"."fileFileId" = "f"."fileId"
GROUP BY 
  "u"."userId", 
  "pi"."personalInformationFullName", 
  "pi"."personalInformationLastName", 
  "pi"."personalInformationEmail", 
  "u"."username", 
  "u"."userState", 
  "r"."roleName", 
  "f"."fileUrl"
`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'user_view',
        'SELECT \n      "u"."userId" AS "userId", \n      "pi"."personalInformationFullName" AS "userFullName", \n      "pi"."personalInformationLastName" AS "userLastName", \n      "pi"."personalInformationEmail" AS "userEmail", \n      "u"."username" AS "username", \n      "u"."userState" AS "userState", \n      "r"."roleName" AS "roleName", \n      "f"."fileUrl" AS "fileUrl"\n    FROM \n      "user" "u"\n    INNER JOIN \n      "personal_information" "pi" ON "u"."personalInformationId" = "pi"."personalInformationId"\n    INNER JOIN \n      "role" "r" ON "u"."roleRoleId" = "r"."roleId"\n    LEFT JOIN \n      "file" "f" ON "u"."fileFileId" = "f"."fileId"\n    GROUP BY \n      "u"."userId", \n      "pi"."personalInformationFullName", \n      "pi"."personalInformationLastName", \n      "pi"."personalInformationEmail", \n      "u"."username", \n      "u"."userState", \n      "r"."roleName", \n      "f"."fileUrl"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'user_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "user_view"`);
    await queryRunner.query(
      `ALTER TABLE "product_has_taxes" DROP CONSTRAINT "FK_d89ce12af2dd6534ff1464f0ade"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_has_taxes" DROP CONSTRAINT "FK_15793adccf6ad178920c6b12d44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_7a49bb3774e053242dee39cc5e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_3beb30d0cc8790859f16ad9ff96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_0dd101cc0fe82f57bb70e67dba0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_3f04cee14c74af225aeb27f722a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e9ac21f63535580f0c50b228179"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_1f170accf5236a71106a84ed97b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_7aeed9d9c66d6fda0c7e5f3ecec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale_detail" DROP CONSTRAINT "FK_c58161fdb7d682ef0e3fdd275ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale_detail" DROP CONSTRAINT "FK_5577177eb9ed86f21c841e04b0c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d89ce12af2dd6534ff1464f0ad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_15793adccf6ad178920c6b12d4"`,
    );
    await queryRunner.query(`DROP TABLE "product_has_taxes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a49bb3774e053242dee39cc5e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3beb30d0cc8790859f16ad9ff9"`,
    );
    await queryRunner.query(`DROP TABLE "roles_has_permissions"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "personal_information"`);
    await queryRunner.query(`DROP TABLE "sale"`);
    await queryRunner.query(`DROP TABLE "client"`);
    await queryRunner.query(`DROP TABLE "sale_detail"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "taxes"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
