import { MigrationInterface, QueryRunner } from "typeorm";

export class ComiiteAnserEnum1765103260696 implements MigrationInterface {
    name = 'ComiiteAnserEnum1765103260696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" DROP COLUMN "Answer"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" ADD "Answer" smallint NOT NULL DEFAULT '4'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" DROP COLUMN "Answer"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" ADD "Answer" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
    }

}
