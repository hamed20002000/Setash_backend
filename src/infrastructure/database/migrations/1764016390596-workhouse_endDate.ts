import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseEndDate1764016390596 implements MigrationInterface {
    name = 'WorkhouseEndDate1764016390596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Workhouses" ADD "EndDate" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Workhouses" DROP COLUMN "EndDate"`);
    }

}
