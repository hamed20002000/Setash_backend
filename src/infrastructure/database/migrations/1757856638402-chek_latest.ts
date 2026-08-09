import { MigrationInterface, QueryRunner } from "typeorm";

export class ChekLatest1757856638402 implements MigrationInterface {
    name = 'ChekLatest1757856638402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "StoreDispatchNos" ("Id" BIGSERIAL NOT NULL, "No" bigint NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_9e59d5955cc5766a9a71e1b596a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "StoreDispatchNos_pkey" ON "StoreDispatchNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "StoreDispatchNos" ADD CONSTRAINT "FK_0cf8120f5048bcbe792e69d3fdd" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreDispatchNos" DROP CONSTRAINT "FK_0cf8120f5048bcbe792e69d3fdd"`);
        await queryRunner.query(`DROP INDEX "public"."StoreDispatchNos_pkey"`);
        await queryRunner.query(`DROP TABLE "StoreDispatchNos"`);
    }

}
