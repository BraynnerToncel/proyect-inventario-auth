import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
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
  `,
})
export class UserView {
  @ViewColumn()
  userId: string;

  @ViewColumn()
  userFullName: string;

  @ViewColumn()
  userLastName: string;

  @ViewColumn()
  userEmail: string;

  @ViewColumn()
  username: string;

  @ViewColumn()
  userState: boolean;

  @ViewColumn()
  roleName: string;

  @ViewColumn()
  fileUrl: string;
}
