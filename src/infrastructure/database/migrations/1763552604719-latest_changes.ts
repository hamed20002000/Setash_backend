import { MigrationInterface, QueryRunner } from "typeorm";

export class LatestChanges1763552604719 implements MigrationInterface {
    name = 'LatestChanges1763552604719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP CONSTRAINT "FK_ffbd9f6aa07f3d09a035dabe31e"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP COLUMN "WorkhouseId"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP COLUMN "EndDateTime"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD "EndDateTime" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP COLUMN "EndDateTime"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD "EndDateTime" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD "WorkhouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD CONSTRAINT "FK_ffbd9f6aa07f3d09a035dabe31e" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
