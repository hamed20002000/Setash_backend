import { MigrationInterface, QueryRunner } from "typeorm";

export class SystemNotifRemoveUserId1761327160997 implements MigrationInterface {
    name = 'SystemNotifRemoveUserId1761327160997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP CONSTRAINT "FK_0a68cdf3c92db643f4d28a00ff7"`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP COLUMN "UserId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD "UserId" uuid`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD CONSTRAINT "FK_0a68cdf3c92db643f4d28a00ff7" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
