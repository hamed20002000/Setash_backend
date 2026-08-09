import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestsEntity21761860417878 implements MigrationInterface {
    name = 'RequestsEntity21761860417878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" ADD "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Requests" ADD "RecordStatus" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" DROP COLUMN "RecordStatus"`);
        await queryRunner.query(`ALTER TABLE "Requests" DROP COLUMN "CreateAt"`);
    }

}
