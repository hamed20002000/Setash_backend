import { MigrationInterface, QueryRunner } from "typeorm";

export class RegionDepth1754925776979 implements MigrationInterface {
    name = 'RegionDepth1754925776979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Regions" ADD "Depth" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Regions" DROP COLUMN "Depth"`);
    }

}
