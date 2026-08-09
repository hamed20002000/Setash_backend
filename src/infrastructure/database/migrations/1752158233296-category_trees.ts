import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTrees1752158233296 implements MigrationInterface {
    name = 'CategoryTrees1752158233296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Categories_closure" ("id_ancestor" bigint NOT NULL, "id_descendant" bigint NOT NULL, CONSTRAINT "PK_f0a0baa238ea39de930e1ce72e0" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34c81ce8b911ee5917a8d62da0" ON "Categories_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7084eb3d3b78cd59d7b61e3da" ON "Categories_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "Categories_closure" ADD CONSTRAINT "FK_34c81ce8b911ee5917a8d62da00" FOREIGN KEY ("id_ancestor") REFERENCES "Categories"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Categories_closure" ADD CONSTRAINT "FK_c7084eb3d3b78cd59d7b61e3dab" FOREIGN KEY ("id_descendant") REFERENCES "Categories"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Categories_closure" DROP CONSTRAINT "FK_c7084eb3d3b78cd59d7b61e3dab"`);
        await queryRunner.query(`ALTER TABLE "Categories_closure" DROP CONSTRAINT "FK_34c81ce8b911ee5917a8d62da00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7084eb3d3b78cd59d7b61e3da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34c81ce8b911ee5917a8d62da0"`);
        await queryRunner.query(`DROP TABLE "Categories_closure"`);
    }

}
