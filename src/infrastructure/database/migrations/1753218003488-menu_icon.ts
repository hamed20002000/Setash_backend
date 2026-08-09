import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuIcon1753218003488 implements MigrationInterface {
    name = 'MenuIcon1753218003488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" ADD "Icon" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" DROP COLUMN "Icon"`);
    }

}
