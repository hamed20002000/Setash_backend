import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseEndDate1763550325877 implements MigrationInterface {
    name = 'CourseEndDate1763550325877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "EndDateTime"`);
        await queryRunner.query(`ALTER TABLE "Courses" ADD "EndDateTime" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "EndDateTime"`);
        await queryRunner.query(`ALTER TABLE "Courses" ADD "EndDateTime" TIME WITH TIME ZONE`);
    }

}
