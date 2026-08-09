import { MigrationInterface, QueryRunner } from "typeorm";

export class LeaveStatus1759082814092 implements MigrationInterface {
    name = 'LeaveStatus1759082814092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LeaveHistories" ADD "Status" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LeaveHistories" DROP COLUMN "Status"`);
    }

}
