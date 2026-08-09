import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelRowTree1753692755333 implements MigrationInterface {
    name = 'ChannelRowTree1753692755333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ChannelRows_closure" ("id_ancestor" bigint NOT NULL, "id_descendant" bigint NOT NULL, CONSTRAINT "PK_f199ca6eeb0fb3e4780e528c2a4" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75cd142e5c417a0a8078c31a8f" ON "ChannelRows_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_63460fcbcbaa6e5acaa83bb177" ON "ChannelRows_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "ChannelRows_closure" ADD CONSTRAINT "FK_75cd142e5c417a0a8078c31a8fe" FOREIGN KEY ("id_ancestor") REFERENCES "ChannelRows"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChannelRows_closure" ADD CONSTRAINT "FK_63460fcbcbaa6e5acaa83bb177c" FOREIGN KEY ("id_descendant") REFERENCES "ChannelRows"("Id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ChannelRows_closure" DROP CONSTRAINT "FK_63460fcbcbaa6e5acaa83bb177c"`);
        await queryRunner.query(`ALTER TABLE "ChannelRows_closure" DROP CONSTRAINT "FK_75cd142e5c417a0a8078c31a8fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63460fcbcbaa6e5acaa83bb177"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_75cd142e5c417a0a8078c31a8f"`);
        await queryRunner.query(`DROP TABLE "ChannelRows_closure"`);
    }

}
