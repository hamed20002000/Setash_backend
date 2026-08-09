import { MigrationInterface, QueryRunner } from "typeorm";

export class ImplementingChanges1759002420201 implements MigrationInterface {
    name = 'ImplementingChanges1759002420201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "PlanningStatus"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "PlanningStatus" smallint`);
    }

}
