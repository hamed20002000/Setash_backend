import { MigrationInterface, QueryRunner } from "typeorm";

export class DocsHeadersDescription1761856790793 implements MigrationInterface {
    name = 'DocsHeadersDescription1761856790793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD "Description" character varying`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptHeaders" ADD "Description" character varying`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" ADD "Description" character varying`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD "Description" character varying`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" ADD "Description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" DROP COLUMN "Description"`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP COLUMN "Description"`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" DROP COLUMN "Description"`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptHeaders" DROP COLUMN "Description"`);
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP COLUMN "Description"`);
    }

}
