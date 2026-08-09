import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseRentStatusDescription1762167110729 implements MigrationInterface {
    name = 'WorkhouseRentStatusDescription1762167110729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_a839ae1f09e0d579183b30dae45"`);
        await queryRunner.query(`CREATE TABLE "WorkhouseRentStatusHistories" ("Id" BIGSERIAL NOT NULL, "Status" smallint NOT NULL, "Description" character varying, "StatusDescription" character varying, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "WorkhouseRentId" bigint, "UserId" uuid, CONSTRAINT "PK_db4aac9d1805395c7d6a81ac382" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "WorkhouseRentStatusHistories_pkey" ON "WorkhouseRentStatusHistories" ("Id") `);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP COLUMN "WorkhouseRentId"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" ADD "StatusDescription" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRentStatusHistories" ADD CONSTRAINT "FK_bbb580afa51399a1c45b9ac9eb8" FOREIGN KEY ("WorkhouseRentId") REFERENCES "WorkhouseRents"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRentStatusHistories" ADD CONSTRAINT "FK_1e1d523fea6535714f5bdfc94e2" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseRentStatusHistories" DROP CONSTRAINT "FK_1e1d523fea6535714f5bdfc94e2"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRentStatusHistories" DROP CONSTRAINT "FK_bbb580afa51399a1c45b9ac9eb8"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" DROP COLUMN "StatusDescription"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD "WorkhouseRentId" bigint`);
        await queryRunner.query(`DROP INDEX "public"."WorkhouseRentStatusHistories_pkey"`);
        await queryRunner.query(`DROP TABLE "WorkhouseRentStatusHistories"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_a839ae1f09e0d579183b30dae45" FOREIGN KEY ("WorkhouseRentId") REFERENCES "WorkhouseRents"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
