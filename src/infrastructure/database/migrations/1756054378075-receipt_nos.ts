import { MigrationInterface, QueryRunner } from "typeorm";

export class ReceiptNos1756054378075 implements MigrationInterface {
    name = 'ReceiptNos1756054378075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ReceiptNos" ("Id" BIGSERIAL NOT NULL, "No" bigint NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_0105a765aed125bc535187f244f" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ReceiptNos_pkey" ON "ReceiptNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "ReceiptNos" ADD CONSTRAINT "FK_ad738a4611c4df2bce6f277c6cb" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ReceiptNos" DROP CONSTRAINT "FK_ad738a4611c4df2bce6f277c6cb"`);
        await queryRunner.query(`DROP INDEX "public"."ReceiptNos_pkey"`);
        await queryRunner.query(`DROP TABLE "ReceiptNos"`);
    }

}
