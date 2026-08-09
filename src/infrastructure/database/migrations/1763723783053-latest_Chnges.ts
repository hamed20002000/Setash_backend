import { MigrationInterface, QueryRunner } from "typeorm";

export class LatestChnges1763723783053 implements MigrationInterface {
    name = 'LatestChnges1763723783053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" ADD "Hours" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "Hours"`);
    }

}
