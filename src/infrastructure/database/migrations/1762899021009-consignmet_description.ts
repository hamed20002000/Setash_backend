import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsignmetDescription1762899021009 implements MigrationInterface {
    name = 'ConsignmetDescription1762899021009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Consignments" ADD "Description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Consignments" DROP COLUMN "Description"`);
    }

}
