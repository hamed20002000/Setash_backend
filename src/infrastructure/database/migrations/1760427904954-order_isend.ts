import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderIsend1760427904954 implements MigrationInterface {
    name = 'OrderIsend1760427904954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD "IsEnd" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP COLUMN "IsEnd"`);
    }

}
