import { MigrationInterface, QueryRunner } from "typeorm";

export class ReportMemberStatus1764620741438 implements MigrationInterface {
    name = 'ReportMemberStatus1764620741438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" ADD "MemberStatus" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" DROP COLUMN "MemberStatus"`);
    }

}
