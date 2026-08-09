import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductTypeType1755627327790 implements MigrationInterface {
    name = 'ProductTypeType1755627327790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProductTypes" ADD "Type" smallint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProductTypes" DROP COLUMN "Type"`);
    }

}
