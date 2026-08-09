import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemWeight1754769619191 implements MigrationInterface {
    name = 'ItemWeight1754769619191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" ADD "DMMPercent" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" DROP COLUMN "DMMPercent"`);
    }

}
