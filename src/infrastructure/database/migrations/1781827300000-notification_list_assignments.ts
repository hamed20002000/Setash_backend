import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationListAssignments1781827300000 implements MigrationInterface {
    name = 'NotificationListAssignments1781827300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "RoleNotificationLists" ("Id" BIGSERIAL NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RoleId" bigint, "NotificationListId" bigint, "UserId" uuid, CONSTRAINT "PK_RoleNotificationLists_Id" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "RoleNotificationLists_pkey" ON "RoleNotificationLists" ("Id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "RoleNotificationLists_Role_Notification_key" ON "RoleNotificationLists" ("RoleId", "NotificationListId") `);
        await queryRunner.query(`CREATE TABLE "UserNotificationLists" ("Id" BIGSERIAL NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "AssignedUserId" uuid, "NotificationListId" bigint, "UserId" uuid, CONSTRAINT "PK_UserNotificationLists_Id" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UserNotificationLists_pkey" ON "UserNotificationLists" ("Id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UserNotificationLists_User_Notification_key" ON "UserNotificationLists" ("AssignedUserId", "NotificationListId") `);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" ADD CONSTRAINT "FK_RoleNotificationLists_RoleId" FOREIGN KEY ("RoleId") REFERENCES "Roles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" ADD CONSTRAINT "FK_RoleNotificationLists_NotificationListId" FOREIGN KEY ("NotificationListId") REFERENCES "NotificationLists"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" ADD CONSTRAINT "FK_RoleNotificationLists_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" ADD CONSTRAINT "FK_UserNotificationLists_AssignedUserId" FOREIGN KEY ("AssignedUserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" ADD CONSTRAINT "FK_UserNotificationLists_NotificationListId" FOREIGN KEY ("NotificationListId") REFERENCES "NotificationLists"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" ADD CONSTRAINT "FK_UserNotificationLists_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" DROP CONSTRAINT "FK_UserNotificationLists_UserId"`);
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" DROP CONSTRAINT "FK_UserNotificationLists_NotificationListId"`);
        await queryRunner.query(`ALTER TABLE "UserNotificationLists" DROP CONSTRAINT "FK_UserNotificationLists_AssignedUserId"`);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" DROP CONSTRAINT "FK_RoleNotificationLists_UserId"`);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" DROP CONSTRAINT "FK_RoleNotificationLists_NotificationListId"`);
        await queryRunner.query(`ALTER TABLE "RoleNotificationLists" DROP CONSTRAINT "FK_RoleNotificationLists_RoleId"`);
        await queryRunner.query(`DROP INDEX "public"."UserNotificationLists_User_Notification_key"`);
        await queryRunner.query(`DROP INDEX "public"."UserNotificationLists_pkey"`);
        await queryRunner.query(`DROP TABLE "UserNotificationLists"`);
        await queryRunner.query(`DROP INDEX "public"."RoleNotificationLists_Role_Notification_key"`);
        await queryRunner.query(`DROP INDEX "public"."RoleNotificationLists_pkey"`);
        await queryRunner.query(`DROP TABLE "RoleNotificationLists"`);
    }

}
