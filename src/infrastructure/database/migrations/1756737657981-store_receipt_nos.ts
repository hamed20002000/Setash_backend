import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreReceiptNos1756737657981 implements MigrationInterface {
    name = 'StoreReceiptNos1756737657981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "StoreReceiptNos" ("Id" BIGSERIAL NOT NULL, "No" bigint NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_3b3aeeb0930df63c6cfb4401d2b" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "StoreReceiptNos_pkey" ON "StoreReceiptNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "StoreReceiptNos" ADD CONSTRAINT "FK_faae4ebfe5be1d2141efc776b37" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreReceiptNos" DROP CONSTRAINT "FK_faae4ebfe5be1d2141efc776b37"`);
        await queryRunner.query(`DROP INDEX "public"."StoreReceiptNos_pkey"`);
        await queryRunner.query(`DROP TABLE "StoreReceiptNos"`);
    }

}
