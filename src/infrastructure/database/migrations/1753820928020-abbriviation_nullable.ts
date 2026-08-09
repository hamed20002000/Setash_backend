import { MigrationInterface, QueryRunner } from "typeorm";

export class AbbriviationNullable1753820928020 implements MigrationInterface {
    name = 'AbbriviationNullable1753820928020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" ALTER COLUMN "Abbreviation" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" ALTER COLUMN "Abbreviation" SET NOT NULL`);
    }

}
