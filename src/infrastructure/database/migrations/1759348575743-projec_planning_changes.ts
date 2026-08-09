import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjecPlanningChanges1759348575743 implements MigrationInterface {
    name = 'ProjecPlanningChanges1759348575743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP CONSTRAINT "FK_c300cb927306e03def7b19c0721"`);
        await queryRunner.query(`CREATE TABLE "ProjectPlanningImplementationDates" ("Id" BIGSERIAL NOT NULL, "StartDate" TIMESTAMP WITH TIME ZONE NOT NULL, "EndDate" TIMESTAMP WITH TIME ZONE NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "ForceMajorId" bigint, "ProjectPlanningId" bigint, "UserId" uuid, CONSTRAINT "PK_834dbe5c7e04bb7ea39569d9348" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ProjectPlanningImplementationDates_pkey" ON "ProjectPlanningImplementationDates" ("Id") `);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "StartDate"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "EndDate"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "KaziYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "AltMontajiYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "BetonAtilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "UstMontajiOrulenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "UstMontajiKurulanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DikilenBetonDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "IletkenCekilenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "AyiriciTakilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DikilenAydinlatmaDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "KabloKanali"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "Transformator"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DagitimPanosu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "SahaDagıtımKutusu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "BetonKosk"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "Hucre"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "ProjectPlanningId"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "KaziYapilanDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "AltMontajiYapilanDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "BetonAtilanDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "UstMontajiOrulenDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "UstMontajiKurulanDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DikilenBetonDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "IletkenCekilenDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "AyiriciTakilanDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DikilenAydinlatmaDirekDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "KabloKanaliDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "TransformatorDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DagitimPanosuDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "SahaDagitimKutusuDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "BetonKoskDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "HucreDurumu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "ProjectPlanningImplementationDateId" bigint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "CekilenKabloMiktari"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "CekilenKabloMiktari" double precision`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD CONSTRAINT "FK_7e0c65419df2cac8f8d6d191058" FOREIGN KEY ("ProjectPlanningImplementationDateId") REFERENCES "ProjectPlanningImplementationDates"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" ADD CONSTRAINT "FK_8400441392f52c093db5c7ea2fe" FOREIGN KEY ("ForceMajorId") REFERENCES "ForceMajors"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" ADD CONSTRAINT "FK_38ba6c917877b4fb10ab01cfb6b" FOREIGN KEY ("ProjectPlanningId") REFERENCES "ProjectPlanings"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" ADD CONSTRAINT "FK_fa449733208f2155eb1332cf384" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" DROP CONSTRAINT "FK_fa449733208f2155eb1332cf384"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" DROP CONSTRAINT "FK_38ba6c917877b4fb10ab01cfb6b"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementationDates" DROP CONSTRAINT "FK_8400441392f52c093db5c7ea2fe"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP CONSTRAINT "FK_7e0c65419df2cac8f8d6d191058"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "CekilenKabloMiktari"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "CekilenKabloMiktari" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "ProjectPlanningImplementationDateId"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "HucreDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "BetonKoskDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "SahaDagitimKutusuDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DagitimPanosuDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "TransformatorDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "KabloKanaliDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DikilenAydinlatmaDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "AyiriciTakilanDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "IletkenCekilenDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "DikilenBetonDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "UstMontajiKurulanDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "UstMontajiOrulenDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "BetonAtilanDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "AltMontajiYapilanDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "KaziYapilanDirekDurumu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "ProjectPlanningId" bigint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "Hucre" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "BetonKosk" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "SahaDagıtımKutusu" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DagitimPanosu" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "Transformator" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "KabloKanali" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DikilenAydinlatmaDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "AyiriciTakilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "IletkenCekilenDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "DikilenBetonDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "UstMontajiKurulanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "UstMontajiOrulenDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "BetonAtilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "AltMontajiYapilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "KaziYapilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "EndDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "StartDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."ProjectPlanningImplementationDates_pkey"`);
        await queryRunner.query(`DROP TABLE "ProjectPlanningImplementationDates"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD CONSTRAINT "FK_c300cb927306e03def7b19c0721" FOREIGN KEY ("ProjectPlanningId") REFERENCES "ProjectPlanings"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
