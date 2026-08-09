import { MigrationInterface, QueryRunner } from "typeorm";

export class TenderCategories1753041302865 implements MigrationInterface {
    name = 'TenderCategories1753041302865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP CONSTRAINT "FK_200232106450570e67d6c3d9c44"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" RENAME COLUMN "TenderHeaderId" TO "TenderCategoryId"`);
        await queryRunner.query(`CREATE TABLE "TenderCategories" ("Id" BIGSERIAL NOT NULL, "Percent" double precision, "Description" character varying, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "TenderHeaderId" bigint, "UserId" uuid, CONSTRAINT "PK_3866e2d8522054f62de0ab76eb0" PRIMARY KEY ("Id", "Percent"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "TenderCategories_pkey" ON "TenderCategories" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "Name"`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "Name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD CONSTRAINT "FK_4a00fd90fdc75428d2eb02c9e81" FOREIGN KEY ("TenderHeaderId") REFERENCES "TenderHeaders"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" ADD CONSTRAINT "FK_9f21c6f0dfcfe1147837e831ac8" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD CONSTRAINT "FK_90cee6a50efca96335205eb8133" FOREIGN KEY ("TenderCategoryId") REFERENCES "TenderCategories"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP CONSTRAINT "FK_90cee6a50efca96335205eb8133"`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" DROP CONSTRAINT "FK_9f21c6f0dfcfe1147837e831ac8"`);
        await queryRunner.query(`ALTER TABLE "TenderCategories" DROP CONSTRAINT "FK_4a00fd90fdc75428d2eb02c9e81"`);
        await queryRunner.query(`ALTER TABLE "Teachers" DROP COLUMN "Name"`);
        await queryRunner.query(`ALTER TABLE "Teachers" ADD "Name" bigint NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."TenderCategories_pkey"`);
        await queryRunner.query(`DROP TABLE "TenderCategories"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" RENAME COLUMN "TenderCategoryId" TO "TenderHeaderId"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD CONSTRAINT "FK_200232106450570e67d6c3d9c44" FOREIGN KEY ("TenderHeaderId") REFERENCES "TenderHeaders"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
