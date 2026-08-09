import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceChanges1755852593661 implements MigrationInterface {
    name = 'InvoiceChanges1755852593661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "InvoiceNo" character varying`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "DriverVehicleId" bigint`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_299b850c0739052baad0ff65ca0" FOREIGN KEY ("DriverVehicleId") REFERENCES "DriverVehicles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_299b850c0739052baad0ff65ca0"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "DriverVehicleId"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "InvoiceNo"`);
    }

}
