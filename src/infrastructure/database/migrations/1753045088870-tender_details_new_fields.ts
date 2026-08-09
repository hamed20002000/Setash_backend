import { MigrationInterface, QueryRunner } from "typeorm";

export class TenderDetailsNewFields1753045088870 implements MigrationInterface {
    name = 'TenderDetailsNewFields1753045088870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "EskiPoz" character varying`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "Tedas" character varying`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "Ana" character varying`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD "Alt" character varying`);
          await queryRunner.query(`ALTER TABLE "TenderCategories" DROP CONSTRAINT "PK_3866e2d8522054f62de0ab76eb0"`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ALTER COLUMN "Percent" DROP NOT NULL`);      
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD CONSTRAINT "PK_48a545b126ed2d25e832c15f6c4" PRIMARY KEY ("Id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderCategories" DROP CONSTRAINT "PK_48a545b126ed2d25e832c15f6c4"`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD CONSTRAINT "PK_3866e2d8522054f62de0ab76eb0" PRIMARY KEY ("Id", "Percent")`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ALTER COLUMN "Percent" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "Alt"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "Ana"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "Tedas"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP COLUMN "EskiPoz"`);
    }

}
