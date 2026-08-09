import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceNo21755937983095 implements MigrationInterface {
    name = 'InvoiceNo21755937983095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceNos" DROP COLUMN "No"`);
        await queryRunner.query(`ALTER TABLE "InvoiceNos" ADD "No" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceNos" DROP COLUMN "No"`);
        await queryRunner.query(`ALTER TABLE "InvoiceNos" ADD "No" character varying NOT NULL`);
    }

}
