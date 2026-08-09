import { MigrationInterface, QueryRunner } from "typeorm";

export class WarhouseDispatchNo1756289255826 implements MigrationInterface {
    name = 'WarhouseDispatchNo1756289255826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "WarehouseDispatchNos" ("Id" BIGSERIAL NOT NULL, "No" bigint NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_5f1464b8d3cd10d8fca0fe5cf89" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "WarehouseDispatchNos_pkey" ON "WarehouseDispatchNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchNos" ADD CONSTRAINT "FK_1fedd62a00dfd896547d2428abc" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchNos" DROP CONSTRAINT "FK_1fedd62a00dfd896547d2428abc"`);
        await queryRunner.query(`DROP INDEX "public"."WarehouseDispatchNos_pkey"`);
        await queryRunner.query(`DROP TABLE "WarehouseDispatchNos"`);
    }

}
