import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsignmebtCodeIndex1762718217039 implements MigrationInterface {
    name = 'ConsignmebtCodeIndex1762718217039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Consignments_Code" ON "Consignments" ("Code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IX_Consignments_Code"`);
    }

}
