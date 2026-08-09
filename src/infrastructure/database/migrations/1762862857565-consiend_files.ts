import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsiendFiles1762862857565 implements MigrationInterface {
    name = 'ConsiendFiles1762862857565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Consignments" ADD "Attachments" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Consignments" DROP COLUMN "Attachments"`);
    }

}
