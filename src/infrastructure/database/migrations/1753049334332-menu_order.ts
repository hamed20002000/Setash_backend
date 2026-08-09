import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuOrder1753049334332 implements MigrationInterface {
    name = 'MenuOrder1753049334332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" ADD "Order" smallint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus" DROP COLUMN "Order"`);
    }

}
