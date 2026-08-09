import { MigrationInterface, QueryRunner } from "typeorm";

export class ForceMajorTitle1758660185139 implements MigrationInterface {
    name = 'ForceMajorTitle1758660185139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ForceMajors" RENAME COLUMN "Ttitle" TO "Title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ForceMajors" RENAME COLUMN "Title" TO "Ttitle"`);
    }

}
