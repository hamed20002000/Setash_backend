import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfirmationReportCommiteMemberNameRemove1764347419436 implements MigrationInterface {
    name = 'ConfirmationReportCommiteMemberNameRemove1764347419436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" DROP COLUMN "Name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" ADD "Name" character varying(200) NOT NULL`);
    }

}
