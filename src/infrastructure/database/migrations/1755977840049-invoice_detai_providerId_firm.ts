import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceDetaiProviderIdFirm1755977840049 implements MigrationInterface {
    name = 'InvoiceDetaiProviderIdFirm1755977840049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" ADD "Firm" boolean`);
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" ADD "ProviderId" bigint`);
        await queryRunner.query(`ALTER TABLE "WarehouseTransactions" ALTER COLUMN "Firm" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" ADD CONSTRAINT "FK_e4dd037da902b60f997ef55cf0e" FOREIGN KEY ("ProviderId") REFERENCES "Providers"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" DROP CONSTRAINT "FK_e4dd037da902b60f997ef55cf0e"`);
        await queryRunner.query(`ALTER TABLE "WarehouseTransactions" ALTER COLUMN "Firm" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" DROP COLUMN "ProviderId"`);
        await queryRunner.query(`ALTER TABLE "InvoiceDetails" DROP COLUMN "Firm"`);
    }

}
