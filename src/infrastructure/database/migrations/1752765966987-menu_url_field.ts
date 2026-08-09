import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuUrlField1752765966987 implements MigrationInterface {
    name = 'MenuUrlField1752765966987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" ADD "URL" character varying(200)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" DROP COLUMN "URL"`);
    }

}
