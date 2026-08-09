import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemWeight21754769969850 implements MigrationInterface {
    name = 'ItemWeight21754769969850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" RENAME COLUMN "DMMPercent" TO "weghit"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Items" RENAME COLUMN "weghit" TO "DMMPercent"`);
    }

}
