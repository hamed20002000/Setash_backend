import { MigrationInterface, QueryRunner } from "typeorm";

export class TransmissionSummary1754660664992 implements MigrationInterface {
    name = 'TransmissionSummary1754660664992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TransmissionSummary" ("Id" BIGSERIAL NOT NULL, "Weight" numeric(10,2) NOT NULL, "Length" numeric(10,2) NOT NULL, "ProductStatus" smallint NOT NULL, "DMMPercent" numeric(10,2) NOT NULL, "TotalWeight" numeric(10,2) NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "NetworkId" bigint, "ItemId" bigint, "UserId" uuid, CONSTRAINT "PK_8845c7a8fe7796dcde4875820f4" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "TransmissionSummary_pkey" ON "TransmissionSummary" ("Id") `);
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" ADD CONSTRAINT "FK_a28133870ba589dd58786cdfd81" FOREIGN KEY ("NetworkId") REFERENCES "Networks"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" ADD CONSTRAINT "FK_975cd8ba22522eb516ddf6f1e03" FOREIGN KEY ("ItemId") REFERENCES "Items"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" ADD CONSTRAINT "FK_6ad881bb1d035df087d19e1a40c" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" DROP CONSTRAINT "FK_6ad881bb1d035df087d19e1a40c"`);
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" DROP CONSTRAINT "FK_975cd8ba22522eb516ddf6f1e03"`);
        await queryRunner.query(`ALTER TABLE "TransmissionSummary" DROP CONSTRAINT "FK_a28133870ba589dd58786cdfd81"`);
        await queryRunner.query(`DROP INDEX "public"."TransmissionSummary_pkey"`);
        await queryRunner.query(`DROP TABLE "TransmissionSummary"`);
    }

}
