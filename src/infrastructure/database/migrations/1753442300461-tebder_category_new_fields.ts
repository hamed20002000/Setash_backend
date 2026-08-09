import { MigrationInterface, QueryRunner } from "typeorm";

export class TebderCategoryNewFields1753442300461 implements MigrationInterface {
    name = 'TebderCategoryNewFields1753442300461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Networks" ADD "Title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD "Title" character varying`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD "EskiPoz" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderCategories" DROP COLUMN "EskiPoz"`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" DROP COLUMN "Title"`);
        await queryRunner.query(`ALTER TABLE "Networks" DROP COLUMN "Title"`);
    }

}
