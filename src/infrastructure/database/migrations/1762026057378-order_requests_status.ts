import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRequestsStatus1762026057378 implements MigrationInterface {
    name = 'OrderRequestsStatus1762026057378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "RequestStatusHistories" ("Id" BIGSERIAL NOT NULL, "Status" smallint NOT NULL, "Description" character varying, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "RequestId" bigint, "UserId" uuid, CONSTRAINT "PK_75b530af0887ecfd1e88c035969" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "RequestStatusHistories_pkey" ON "RequestStatusHistories" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Requests" ADD "Status" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec" FOREIGN KEY ("RequestId") REFERENCES "Requests"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_eb95db99049fcf6364ca89dffb2" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_eb95db99049fcf6364ca89dffb2"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec"`);
        await queryRunner.query(`ALTER TABLE "Requests" DROP COLUMN "Status"`);
        await queryRunner.query(`DROP INDEX "public"."RequestStatusHistories_pkey"`);
        await queryRunner.query(`DROP TABLE "RequestStatusHistories"`);
    }

}
