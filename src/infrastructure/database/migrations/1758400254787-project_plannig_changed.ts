import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectPlannigChanged1758400254787 implements MigrationInterface {
    name = 'ProjectPlannigChanged1758400254787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "KaziYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "KaziYapilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "AltMontajiYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "AltMontajiYapilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "BetonAtilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "BetonAtilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "UstMontajiOrulenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "UstMontajiOrulenDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "UstMontajiKurulanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "UstMontajiKurulanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DikilenBetonDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DikilenBetonDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "IletkenCekilenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "IletkenCekilenDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "AyiriciTakilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "AyiriciTakilanDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DikilenAydinlatmaDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DikilenAydinlatmaDirekSayisi" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "KabloKanali"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "KabloKanali" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "CekilenKabloMiktari"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "CekilenKabloMiktari" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "Transformator"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "Transformator" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DagitimPanosu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DagitimPanosu" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "SahaDagıtımKutusu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "SahaDagıtımKutusu" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "BetonKosk"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "BetonKosk" json`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "Hucre"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "Hucre" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "Hucre"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "Hucre" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "BetonKosk"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "BetonKosk" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "SahaDagıtımKutusu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "SahaDagıtımKutusu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DagitimPanosu"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DagitimPanosu" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "Transformator"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "Transformator" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "CekilenKabloMiktari"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "CekilenKabloMiktari" integer`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "KabloKanali"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "KabloKanali" integer`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DikilenAydinlatmaDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DikilenAydinlatmaDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "AyiriciTakilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "AyiriciTakilanDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "IletkenCekilenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "IletkenCekilenDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "DikilenBetonDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "DikilenBetonDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "UstMontajiKurulanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "UstMontajiKurulanDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "UstMontajiOrulenDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "UstMontajiOrulenDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "BetonAtilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "BetonAtilanDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "AltMontajiYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "AltMontajiYapilanDirekSayisi" smallint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" DROP COLUMN "KaziYapilanDirekSayisi"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanings" ADD "KaziYapilanDirekSayisi" smallint`);
    }

}
