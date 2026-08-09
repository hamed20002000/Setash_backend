import { MigrationInterface, QueryRunner } from "typeorm";

export class InvoiceNo1755937645030 implements MigrationInterface {
    name = 'InvoiceNo1755937645030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "InvoiceNos" ("Id" BIGSERIAL NOT NULL, "No" character varying NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_f51663348a82b7ac265f0aa8ef0" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "InvoiceNos_pkey" ON "InvoiceNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "InvoiceNos" ADD CONSTRAINT "FK_165df19e889c40ce6c89d47ae97" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "InvoiceNos" DROP CONSTRAINT "FK_165df19e889c40ce6c89d47ae97"`);
        await queryRunner.query(`DROP INDEX "public"."InvoiceNos_pkey"`);
        await queryRunner.query(`DROP TABLE "InvoiceNos"`);
    }

}
