import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationOtherFields1761481372933 implements MigrationInterface {
    name = 'NotificationOtherFields1761481372933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD "WarehouseId" numeric`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD "StoreId" numeric`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD "ProjectId" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP COLUMN "ProjectId"`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP COLUMN "StoreId"`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP COLUMN "WarehouseId"`);
    }

}
