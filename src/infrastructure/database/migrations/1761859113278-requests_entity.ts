import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestsEntity1761859113278 implements MigrationInterface {
    name = 'RequestsEntity1761859113278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Requests" ("Id" BIGSERIAL NOT NULL, "Subject" character varying(200) NOT NULL, "Description" character varying NOT NULL, "Attachments" json, "UserId" uuid, CONSTRAINT "PK_7b8c66137907178ec53c271b058" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Requests_pkey" ON "Requests" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Personnels" ADD "ImageSrc" character varying`);
        await queryRunner.query(`ALTER TABLE "Requests" ADD CONSTRAINT "FK_7088f92c22c777bd7e9500ad2b5" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" DROP CONSTRAINT "FK_7088f92c22c777bd7e9500ad2b5"`);
        await queryRunner.query(`ALTER TABLE "Personnels" DROP COLUMN "ImageSrc"`);
        await queryRunner.query(`DROP INDEX "public"."Requests_pkey"`);
        await queryRunner.query(`DROP TABLE "Requests"`);
    }

}
