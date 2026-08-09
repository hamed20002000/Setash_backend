import { MigrationInterface, QueryRunner } from "typeorm";

export class RegionId1754927577196 implements MigrationInterface {
    name = 'RegionId1754927577196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Regions_pkey"`);
        await queryRunner.query(`ALTER TABLE "Regions" RENAME COLUMN "Id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "Regions" RENAME CONSTRAINT "PK_0a6de20d302e8ad3bd4908567f9" TO "PK_adedeae1a4cc76ccba3f3f8a0e9"`);
        await queryRunner.query(`ALTER SEQUENCE "Regions_Id_seq" RENAME TO "Regions_id_seq"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Regions_pkey" ON "Regions" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Regions_pkey"`);
        await queryRunner.query(`ALTER SEQUENCE "Regions_id_seq" RENAME TO "Regions_Id_seq"`);
        await queryRunner.query(`ALTER TABLE "Regions" RENAME CONSTRAINT "PK_adedeae1a4cc76ccba3f3f8a0e9" TO "PK_0a6de20d302e8ad3bd4908567f9"`);
        await queryRunner.query(`ALTER TABLE "Regions" RENAME COLUMN "id" TO "Id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Regions_pkey" ON "Regions" ("Id") `);
    }

}
