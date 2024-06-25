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
      `CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userFullName" character varying(32) NOT NULL, "userLastName" character varying(32) NOT NULL, "username" character varying(24) NOT NULL, "userEmail" character varying(32) NOT NULL, "userPassword" character varying(151) NOT NULL, "userState" boolean NOT NULL DEFAULT true, "roleRoleId" uuid, "fileFileId" uuid, CONSTRAINT "REL_e9ac21f63535580f0c50b22817" UNIQUE ("fileFileId"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
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
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e9ac21f63535580f0c50b228179" FOREIGN KEY ("fileFileId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_3beb30d0cc8790859f16ad9ff96" FOREIGN KEY ("roleRoleId") REFERENCES "role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" ADD CONSTRAINT "FK_7a49bb3774e053242dee39cc5e1" FOREIGN KEY ("permissionPermissionId") REFERENCES "permission"("permissionId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE VIEW "user_view" AS SELECT "u"."userId" AS "userId", "u"."userFullName" AS "userFullName", "u"."userLastName" AS "userLastName", "u"."username" AS "username", "u"."userEmail" AS "userEmail", "u"."userState" AS "userState", "r"."roleName" AS "roleName", "f"."fileUrl" AS "fileUrl" FROM "user" "u" INNER JOIN "role" "r" ON "r"."roleId"="u"."roleRoleId"  LEFT JOIN "file" "f" ON "f"."fileId"="u"."fileFileId" GROUP BY "u"."userId", "u"."userFullName", "u"."userLastName", "u"."userState", "u"."userEmail", "u"."username" , "r"."roleName", "f"."fileUrl"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'user_view',
        'SELECT "u"."userId" AS "userId", "u"."userFullName" AS "userFullName", "u"."userLastName" AS "userLastName", "u"."username" AS "username", "u"."userEmail" AS "userEmail", "u"."userState" AS "userState", "r"."roleName" AS "roleName", "f"."fileUrl" AS "fileUrl" FROM "user" "u" INNER JOIN "role" "r" ON "r"."roleId"="u"."roleRoleId"  INNER JOIN "file" "f" ON "f"."fileId"="u"."fileFileId" GROUP BY "u"."userId", "u"."userFullName", "u"."userLastName", "u"."userState", "u"."userEmail", "u"."username" , "r"."roleName", "f"."fileUrl"',
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
      `ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_7a49bb3774e053242dee39cc5e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_has_permissions" DROP CONSTRAINT "FK_3beb30d0cc8790859f16ad9ff96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e9ac21f63535580f0c50b228179"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ffe3092db843bd8f90fcfe97da7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a49bb3774e053242dee39cc5e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3beb30d0cc8790859f16ad9ff9"`,
    );
    await queryRunner.query(`DROP TABLE "roles_has_permissions"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
