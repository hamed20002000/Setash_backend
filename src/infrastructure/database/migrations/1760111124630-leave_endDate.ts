import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveEndDate1760111124630 implements MigrationInterface {
    name = 'LeaveEndDate1760111124630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" DROP COLUMN "EndDate"`);
        await queryRunner.query(`ALTER TABLE "Leaves" ADD "EndDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Leaves" DROP COLUMN "EndDate"`);
        await queryRunner.query(`ALTER TABLE "Leaves" ADD "EndDate" TIME WITH TIME ZONE NOT NULL`);
    }

}
