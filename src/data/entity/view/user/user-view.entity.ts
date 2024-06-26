import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT 
      "u"."userId" AS "userId", 
      "u"."userFullName" AS "userFullName", 
      "u"."userLastName" AS "userLastName", 
      "u"."userState" AS "userState", 
      "u"."userEmail" AS "userEmail", 
      "u"."username" AS "username", 
      "r"."roleName" AS "roleName", 
      "f"."fileUrl" AS "fileUrl"
    FROM 
      "user" "u"
    INNER JOIN 
      "role" "r" ON "u"."roleRoleId" = "r"."roleId"
    LEFT JOIN 
      "file" "f" ON "u"."fileFileId" = "f"."fileId"
    GROUP BY 
      "u"."userId", 
      "u"."userFullName", 
      "u"."userLastName", 
      "u"."userState", 
      "u"."userEmail", 
      "u"."username", 
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
