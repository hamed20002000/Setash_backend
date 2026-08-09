import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseInvoice1760299399484 implements MigrationInterface {
    name = 'WorkhouseInvoice1760299399484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_79b49e1796f7a50e3700645c6b6"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" RENAME COLUMN "StoreId" TO "WorkHouseId"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_c81778d85f34ff61308b86a5e22" FOREIGN KEY ("WorkHouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_c81778d85f34ff61308b86a5e22"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" RENAME COLUMN "WorkHouseId" TO "StoreId"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_79b49e1796f7a50e3700645c6b6" FOREIGN KEY ("StoreId") REFERENCES "Stores"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
