import { MigrationInterface, QueryRunner } from "typeorm";

export class TenderHeaderAttachments1754921548495 implements MigrationInterface {
    name = 'TenderHeaderAttachments1754921548495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderHeaders" ADD "Attachments" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderHeaders" DROP COLUMN "Attachments"`);
    }

}
