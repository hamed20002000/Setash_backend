import { MigrationInterface, QueryRunner } from "typeorm";

export class CasecadeTenderDelete1752253477116 implements MigrationInterface {
    name = 'CasecadeTenderDelete1752253477116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP CONSTRAINT "FK_200232106450570e67d6c3d9c44"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD CONSTRAINT "FK_200232106450570e67d6c3d9c44" FOREIGN KEY ("TenderHeaderId") REFERENCES "TenderHeaders"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TenderDetails" DROP CONSTRAINT "FK_200232106450570e67d6c3d9c44"`);
        await queryRunner.query(`ALTER TABLE "TenderDetails" ADD CONSTRAINT "FK_200232106450570e67d6c3d9c44" FOREIGN KEY ("TenderHeaderId") REFERENCES "TenderHeaders"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
