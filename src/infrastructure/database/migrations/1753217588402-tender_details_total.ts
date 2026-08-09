import { MigrationInterface, QueryRunner } from "typeorm";

export class TenderDetailsTotal1753217588402 implements MigrationInterface {
    name = 'TenderDetailsTotal1753217588402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "MalzemeTutari" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "MontajTutari" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "DemontajTutari" money NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "DMMTutari" money NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "DMMTutari"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "DemontajTutari"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "MontajTutari"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "MalzemeTutari"`);
    }

}
