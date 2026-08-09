import { MigrationInterface, QueryRunner } from "typeorm";

export class SystemNotificationsUserId1781827400000 implements MigrationInterface {
    name = 'SystemNotificationsUserId1781827400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD "UserId" uuid`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD CONSTRAINT "FK_SystemNotifications_UserId" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP CONSTRAINT "FK_SystemNotifications_UserId"`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP COLUMN "UserId"`);
    }

}
