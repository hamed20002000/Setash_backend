import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfirmationReport21764104960974 implements MigrationInterface {
    name = 'ConfirmationReport21764104960974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" DROP COLUMN "TutanakTeslimAlmaDurumu"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" DROP COLUMN "GeciciKabulTutanagi"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" ADD " GeciciTutanakTeslimAlmaDurumu" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" ADD "KesinTutanakTeslimAlmaDurumu" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" DROP COLUMN "KesinTutanakTeslimAlmaDurumu"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" DROP COLUMN " GeciciTutanakTeslimAlmaDurumu"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" ADD "GeciciKabulTutanagi" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" ADD "TutanakTeslimAlmaDurumu" boolean NOT NULL DEFAULT false`);
    }

}
