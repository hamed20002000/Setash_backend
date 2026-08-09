import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceToStore1759080630309 implements MigrationInterface {
    name = 'InvoiceToStore1759080630309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" ADD "InvoiceDetailId" bigint`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "StoreId" bigint`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" ADD CONSTRAINT "FK_5efd68f43b73d70a321fb0a85bd" FOREIGN KEY ("InvoiceDetailId") REFERENCES "InvoiceDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_79b49e1796f7a50e3700645c6b6" FOREIGN KEY ("StoreId") REFERENCES "Stores"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_79b49e1796f7a50e3700645c6b6"`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" DROP CONSTRAINT "FK_5efd68f43b73d70a321fb0a85bd"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "StoreId"`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" DROP COLUMN "InvoiceDetailId"`);
    }

}
