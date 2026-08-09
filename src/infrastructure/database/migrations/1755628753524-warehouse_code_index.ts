import { MigrationInterface, QueryRunner } from "typeorm";

export class WarehouseCodeIndex1755628753524 implements MigrationInterface {
    name = 'WarehouseCodeIndex1755628753524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "Warehouses_Code_key" ON "Warehouses" ("Code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Warehouses_Code_key"`);
    }

}
