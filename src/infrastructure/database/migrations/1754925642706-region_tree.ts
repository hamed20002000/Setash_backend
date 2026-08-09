import { MigrationInterface, QueryRunner } from "typeorm";

export class RegionTree1754925642706 implements MigrationInterface {
    name = 'RegionTree1754925642706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Regions_closure" ("id_ancestor" bigint NOT NULL, "id_descendant" bigint NOT NULL, CONSTRAINT "PK_996a90e4a441a8fe0b90032ebf2" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4da56972ad1a0ef76b98a2211b" ON "Regions_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_a61c7ecaae729e4677f3a45c4d" ON "Regions_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "Regions_closure" ADD CONSTRAINT "FK_4da56972ad1a0ef76b98a2211b3" FOREIGN KEY ("id_ancestor") REFERENCES "Regions"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Regions_closure" ADD CONSTRAINT "FK_a61c7ecaae729e4677f3a45c4d4" FOREIGN KEY ("id_descendant") REFERENCES "Regions"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Regions_closure" DROP CONSTRAINT "FK_a61c7ecaae729e4677f3a45c4d4"`);
        await queryRunner.query(`ALTER TABLE "Regions_closure" DROP CONSTRAINT "FK_4da56972ad1a0ef76b98a2211b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a61c7ecaae729e4677f3a45c4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4da56972ad1a0ef76b98a2211b"`);
        await queryRunner.query(`DROP TABLE "Regions_closure"`);
    }

}
