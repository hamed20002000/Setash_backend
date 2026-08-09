import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceHeaderProviderRemove1756285348253 implements MigrationInterface {
    name = 'InvoiceHeaderProviderRemove1756285348253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP CONSTRAINT "FK_ed14fa61955523cf1cee0a5bd20"`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "ProviderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "ProviderId" bigint`);
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD CONSTRAINT "FK_ed14fa61955523cf1cee0a5bd20" FOREIGN KEY ("ProviderId") REFERENCES "Providers"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
