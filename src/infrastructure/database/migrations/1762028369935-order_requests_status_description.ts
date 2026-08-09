import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRequestsStatusDescription1762028369935 implements MigrationInterface {
    name = 'OrderRequestsStatusDescription1762028369935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD "StatusDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "Requests" ADD "StatusDescription" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" DROP COLUMN "StatusDescription"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP COLUMN "StatusDescription"`);
    }

}
