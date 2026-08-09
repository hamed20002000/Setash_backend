import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceIsEnd1760726066853 implements MigrationInterface {
    name = 'InvoiceIsEnd1760726066853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" ADD "IsEnd" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceHeaders" DROP COLUMN "IsEnd"`);
    }

}
