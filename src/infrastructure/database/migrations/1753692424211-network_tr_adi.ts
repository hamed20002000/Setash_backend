import { MigrationInterface, QueryRunner } from "typeorm";

export class NetworkTrAdi1753692424211 implements MigrationInterface {
    name = 'NetworkTrAdi1753692424211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ChannelRows" DROP CONSTRAINT "FK_11c30ad7353d0db46809468820f"`);
        await queryRunner.query(`ALTER TABLE "ChannelRows" RENAME COLUMN "NetworkId" TO "NetworkTrAdisId"`);
        await queryRunner.query(`CREATE TABLE "NetworkTrAdis" ("Id" BIGSERIAL NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "Title" character varying NOT NULL, "NetworkId" bigint, "UserId" uuid, CONSTRAINT "PK_9c0fc09402bee21259aad49fe4a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "NetworkTrAdis_pkey" ON "NetworkTrAdis" ("Id") `);
        await queryRunner.query(`ALTER TABLE "NetworkTrAdis" ADD CONSTRAINT "FK_24d9e9156a16bfd27a8f350ebfb" FOREIGN KEY ("NetworkId") REFERENCES "Networks"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "NetworkTrAdis" ADD CONSTRAINT "FK_e151f5650fe7c6d3c514d6c87c4" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChannelRows" ADD CONSTRAINT "FK_f1b1913f365719bbe155af91972" FOREIGN KEY ("NetworkTrAdisId") REFERENCES "NetworkTrAdis"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ChannelRows" DROP CONSTRAINT "FK_f1b1913f365719bbe155af91972"`);
        await queryRunner.query(`ALTER TABLE "NetworkTrAdis" DROP CONSTRAINT "FK_e151f5650fe7c6d3c514d6c87c4"`);
        await queryRunner.query(`ALTER TABLE "NetworkTrAdis" DROP CONSTRAINT "FK_24d9e9156a16bfd27a8f350ebfb"`);
        await queryRunner.query(`DROP INDEX "public"."NetworkTrAdis_pkey"`);
        await queryRunner.query(`DROP TABLE "NetworkTrAdis"`);
        await queryRunner.query(`ALTER TABLE "ChannelRows" RENAME COLUMN "NetworkTrAdisId" TO "NetworkId"`);
        await queryRunner.query(`ALTER TABLE "ChannelRows" ADD CONSTRAINT "FK_11c30ad7353d0db46809468820f" FOREIGN KEY ("NetworkId") REFERENCES "Networks"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
