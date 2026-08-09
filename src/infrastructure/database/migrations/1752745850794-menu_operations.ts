import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuOperations1752745850794 implements MigrationInterface {
    name = 'MenuOperations1752745850794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Menus" ("id" BIGSERIAL NOT NULL, "Name" character varying(200) NOT NULL, "Depth" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "ParentId" bigint, "UserId" uuid, CONSTRAINT "PK_61cd8f3464d2c0406396a128fed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Menus_pkey" ON "Menus" ("id") `);
        await queryRunner.query(`CREATE TABLE "MenuOperations" ("Id" BIGSERIAL NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "MenuId" bigint, "UserId" uuid, CONSTRAINT "PK_09b2f5f6f45a9968f719b4e1f9a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "MenuOperations_pkey" ON "MenuOperations" ("Id") `);
        await queryRunner.query(`CREATE TABLE "RoleMenuOperations" ("Id" BIGSERIAL NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RoleId" bigint, "MenuOperationId" bigint, "UserId" uuid, CONSTRAINT "PK_36a752b56d3e032edff0793ecbe" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "RoleMenuOperations_pkey" ON "RoleMenuOperations" ("Id") `);
        await queryRunner.query(`CREATE TABLE "Menus_closure" ("id_ancestor" bigint NOT NULL, "id_descendant" bigint NOT NULL, CONSTRAINT "PK_d01d4dc3c9bf459f9808f52fd5f" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_44aba8cdf6633a619974169e9c" ON "Menus_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_0cff581402d6715c109442bf41" ON "Menus_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "Menus" ADD CONSTRAINT "FK_6d7a820c5e2cfcba943ddc01085" FOREIGN KEY ("ParentId") REFERENCES "Menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Menus" ADD CONSTRAINT "FK_1cedda3f66b5292cb51c5118624" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" ADD CONSTRAINT "FK_8246cd2bf0a5b84e8efd3fb08c5" FOREIGN KEY ("MenuId") REFERENCES "Menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" ADD CONSTRAINT "FK_0ac22386163d99b32785638e62a" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" ADD CONSTRAINT "FK_b9e8ac669bf3e399f66ce55aa8d" FOREIGN KEY ("RoleId") REFERENCES "Roles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" ADD CONSTRAINT "FK_06a3bf52288befb4b402a7413c8" FOREIGN KEY ("MenuOperationId") REFERENCES "MenuOperations"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" ADD CONSTRAINT "FK_0c2c9b9ca7795b3015ccd261652" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Menus_closure" ADD CONSTRAINT "FK_44aba8cdf6633a619974169e9cf" FOREIGN KEY ("id_ancestor") REFERENCES "Menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Menus_closure" ADD CONSTRAINT "FK_0cff581402d6715c109442bf41a" FOREIGN KEY ("id_descendant") REFERENCES "Menus"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Menus_closure" DROP CONSTRAINT "FK_0cff581402d6715c109442bf41a"`);
        await queryRunner.query(`ALTER TABLE "Menus_closure" DROP CONSTRAINT "FK_44aba8cdf6633a619974169e9cf"`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" DROP CONSTRAINT "FK_0c2c9b9ca7795b3015ccd261652"`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" DROP CONSTRAINT "FK_06a3bf52288befb4b402a7413c8"`);
        await queryRunner.query(`ALTER TABLE "RoleMenuOperations" DROP CONSTRAINT "FK_b9e8ac669bf3e399f66ce55aa8d"`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" DROP CONSTRAINT "FK_0ac22386163d99b32785638e62a"`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" DROP CONSTRAINT "FK_8246cd2bf0a5b84e8efd3fb08c5"`);
        await queryRunner.query(`ALTER TABLE "Menus" DROP CONSTRAINT "FK_1cedda3f66b5292cb51c5118624"`);
        await queryRunner.query(`ALTER TABLE "Menus" DROP CONSTRAINT "FK_6d7a820c5e2cfcba943ddc01085"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0cff581402d6715c109442bf41"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44aba8cdf6633a619974169e9c"`);
        await queryRunner.query(`DROP TABLE "Menus_closure"`);
        await queryRunner.query(`DROP INDEX "public"."RoleMenuOperations_pkey"`);
        await queryRunner.query(`DROP TABLE "RoleMenuOperations"`);
        await queryRunner.query(`DROP INDEX "public"."MenuOperations_pkey"`);
        await queryRunner.query(`DROP TABLE "MenuOperations"`);
        await queryRunner.query(`DROP INDEX "public"."Menus_pkey"`);
        await queryRunner.query(`DROP TABLE "Menus"`);
    }

}
