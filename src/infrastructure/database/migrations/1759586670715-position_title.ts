import { MigrationInterface, QueryRunner } from "typeorm";

export class PositionTitle1759586670715 implements MigrationInterface {
    name = 'PositionTitle1759586670715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Positions" RENAME COLUMN "Ttile" TO "Title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Positions" RENAME COLUMN "Title" TO "Ttile"`);
    }

}
