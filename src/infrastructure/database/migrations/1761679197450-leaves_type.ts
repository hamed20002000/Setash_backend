import { MigrationInterface, QueryRunner } from "typeorm";

export class LeavesType1761679197450 implements MigrationInterface {
    name = 'LeavesType1761679197450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" ADD "Type" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" DROP COLUMN "Type"`);
    }

}
