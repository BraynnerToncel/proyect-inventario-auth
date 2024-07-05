import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1719333286138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insertar el rol
    await queryRunner.query(`
      INSERT INTO public."role" ("roleId", "roleName", "roleDescription", "roleState")
      VALUES ('4bb8811c-e550-4032-8e1d-4d0296ab60b6', 'admin', 'admin', true);
    `);

    // Insertar la relación entre rol y permiso
    await queryRunner.query(`
      INSERT INTO roles_has_permissions ("roleRoleId", "permissionPermissionId")
      VALUES ('4bb8811c-e550-4032-8e1d-4d0296ab60b6', '4df9e7e6-1d0f-4583-95ae-4850bbb4eccd');
    `);

    // Insertar en la tabla personal_information
    await queryRunner.query(`
      INSERT INTO public."personal_information" ("personalInformationId", "personalInformationFullName", "personalInformationLastName", "personalInformationEmail"  , "personalInformationCellNumber", "personalInformationAddres", "personalInformationidentification")
      VALUES ('f9a4dc3e-af6b-4ef6-b45f-903bc9efcfe9', 'admin', 'admin', 'admin@admin.com', '3013810009', 'Cra 53 # 70-415', '1044588956');
    `);

    // Insertar en la tabla user, haciendo referencia a personal_information y al rol
    await queryRunner.query(`
      INSERT INTO public."user" ("userId", "userPassword", "userState", "username", "roleRoleId", "personalInformationId")
      VALUES ('9db7a487-c944-47a2-a5f6-77a4287edcdf', '$2a$10$BbW6jeQa5DRe5u.uN8KMIeY2C82quaNRgD6on6YETvU0oz0mctNBO', true, 'admin', '4bb8811c-e550-4032-8e1d-4d0296ab60b6', 'f9a4dc3e-af6b-4ef6-b45f-903bc9efcfe9');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar datos de la tabla roles_has_permissions
    await queryRunner.query(`
      TRUNCATE TABLE roles_has_permissions RESTART IDENTITY CASCADE;
    `);

    // Eliminar datos de la tabla role
    await queryRunner.query(`
      TRUNCATE TABLE public."role" RESTART IDENTITY CASCADE;
    `);

    // Eliminar datos de la tabla personal_information
    await queryRunner.query(`
      TRUNCATE TABLE public."personal_information" RESTART IDENTITY CASCADE;
    `);

    // Eliminar datos de la tabla user
    await queryRunner.query(`
      TRUNCATE TABLE public."user" RESTART IDENTITY CASCADE;
    `);
  }
}
