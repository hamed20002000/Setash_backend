import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceReceiptChanges1755878622181 implements MigrationInterface {
    name = 'InvoiceReceiptChanges1755878622181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" ADD "WarehouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "WarehouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "ReceiptDetails" ALTER COLUMN "ItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" ADD CONSTRAINT "FK_82d1c030251bd6b015a9c073d4b" FOREIGN KEY ("WarehouseId") REFERENCES "Warehouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ReceiptDetails" ADD CONSTRAINT "FK_f2e682324df148f0d475cda0dcc" FOREIGN KEY ("ItemId") REFERENCES "Items"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_dc91d258f96e5fa6757194a0f5c" FOREIGN KEY ("WarehouseId") REFERENCES "Warehouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_dc91d258f96e5fa6757194a0f5c"`);
        await queryRunner.query(`ALTER TABLE "ReceiptDetails" DROP CONSTRAINT "FK_f2e682324df148f0d475cda0dcc"`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" DROP CONSTRAINT "FK_82d1c030251bd6b015a9c073d4b"`);
        await queryRunner.query(`ALTER TABLE "ReceiptDetails" ALTER COLUMN "ItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "WarehouseId"`);
        await queryRunner.query(`ALTER TABLE "ReceiptHeaders" DROP COLUMN "WarehouseId"`);
    }

}
