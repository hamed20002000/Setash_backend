import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTrees21752159798381 implements MigrationInterface {
    name = 'CategoryTrees21752159798381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Categories_pkey"`);
        await queryRunner.query(`ALTER TABLE "Categories" RENAME COLUMN "Id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "Categories" RENAME CONSTRAINT "PK_04ba3e718fe1c234e75a30c457a" TO "PK_537b5c00afe7427c4fc9434cd59"`);
        await queryRunner.query(`ALTER SEQUENCE "Categories_Id_seq" RENAME TO "Categories_id_seq"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Categories_pkey" ON "Categories" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Categories_pkey"`);
        await queryRunner.query(`ALTER SEQUENCE "Categories_id_seq" RENAME TO "Categories_Id_seq"`);
        await queryRunner.query(`ALTER TABLE "Categories" RENAME CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" TO "PK_04ba3e718fe1c234e75a30c457a"`);
        await queryRunner.query(`ALTER TABLE "Categories" RENAME COLUMN "id" TO "Id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Categories_pkey" ON "Categories" ("Id") `);
    }

}
