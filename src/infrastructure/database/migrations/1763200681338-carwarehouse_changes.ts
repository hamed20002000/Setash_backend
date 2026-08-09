import { MigrationInterface, QueryRunner } from "typeorm";

export class CarwarehouseChanges1763200681338 implements MigrationInterface {
    name = 'CarwarehouseChanges1763200681338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" DROP CONSTRAINT "FK_f7c80fb59f3b3dd982be5f1ccfd"`);
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" RENAME COLUMN "CarWarhouseId" TO "CarWarehouseId"`);
        await queryRunner.query(`CREATE TABLE "CarWarehouses" ("Id" BIGSERIAL NOT NULL, "Name" character varying(200) NOT NULL, "Code" character varying(10) NOT NULL, "Address" character varying NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "RegionId" bigint, "UserId" uuid, CONSTRAINT "PK_734d3e642a606dc34af6018427f" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "CarWarehouses_pkey" ON "CarWarehouses" ("Id") `);
        await queryRunner.query(`ALTER TABLE "CarWarehouses" ADD CONSTRAINT "FK_e6a8eee6dfc585ef13805acab5f" FOREIGN KEY ("RegionId") REFERENCES "Regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CarWarehouses" ADD CONSTRAINT "FK_1a47f4c1f2618eb30a886e3d8d1" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" ADD CONSTRAINT "FK_83f916233a4b689d52611763263" FOREIGN KEY ("CarWarehouseId") REFERENCES "CarWarehouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" DROP CONSTRAINT "FK_83f916233a4b689d52611763263"`);
        await queryRunner.query(`ALTER TABLE "CarWarehouses" DROP CONSTRAINT "FK_1a47f4c1f2618eb30a886e3d8d1"`);
        await queryRunner.query(`ALTER TABLE "CarWarehouses" DROP CONSTRAINT "FK_e6a8eee6dfc585ef13805acab5f"`);
        await queryRunner.query(`DROP INDEX "public"."CarWarehouses_pkey"`);
        await queryRunner.query(`DROP TABLE "CarWarehouses"`);
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" RENAME COLUMN "CarWarehouseId" TO "CarWarhouseId"`);
        await queryRunner.query(`ALTER TABLE "CarWarhouseDetails" ADD CONSTRAINT "FK_f7c80fb59f3b3dd982be5f1ccfd" FOREIGN KEY ("CarWarhouseId") REFERENCES "CarWarhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
