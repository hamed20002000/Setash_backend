import { MigrationInterface, QueryRunner } from "typeorm";

export class IsEndDocs1759868776286 implements MigrationInterface {
    name = 'IsEndDocs1759868776286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreReceiptHeaders" ADD "IsEnd" boolean`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" ADD "IsEnd" boolean`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD "IsEnd" boolean`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" ADD "IsEnd" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" DROP COLUMN "IsEnd"`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP COLUMN "IsEnd"`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" DROP COLUMN "IsEnd"`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptHeaders" DROP COLUMN "IsEnd"`);
    }

}
