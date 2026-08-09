import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderPrice1755330916147 implements MigrationInterface {
    name = 'OrderPrice1755330916147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderDetails" ADD "Price" money`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderDetails" DROP COLUMN "Price"`);
    }

}
