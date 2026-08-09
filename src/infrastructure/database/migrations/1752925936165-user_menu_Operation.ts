import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMenuOperation1752925936165 implements MigrationInterface {
    name = 'UserMenuOperation1752925936165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserMenuOperations" ("Id" BIGSERIAL NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "MainUserId" uuid, "MenuOperationId" bigint, "UserId" uuid, CONSTRAINT "PK_49bd117efe407eea97df347d27e" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UserMenuOperations_pkey" ON "UserMenuOperations" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Categories" ADD "Code" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "Items" ADD "Code" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" ADD CONSTRAINT "FK_66f33feff93200586b0c9e0bfbc" FOREIGN KEY ("MainUserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" ADD CONSTRAINT "FK_83464b405884f138965f13dd855" FOREIGN KEY ("MenuOperationId") REFERENCES "MenuOperations"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" ADD CONSTRAINT "FK_bc9cde2c2e57576d481fb488601" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" DROP CONSTRAINT "FK_bc9cde2c2e57576d481fb488601"`);
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" DROP CONSTRAINT "FK_83464b405884f138965f13dd855"`);
        await queryRunner.query(`ALTER TABLE "UserMenuOperations" DROP CONSTRAINT "FK_66f33feff93200586b0c9e0bfbc"`);
        await queryRunner.query(`ALTER TABLE "Items" DROP COLUMN "Code"`);
        await queryRunner.query(`ALTER TABLE "Categories" DROP COLUMN "Code"`);
        await queryRunner.query(`DROP INDEX "public"."UserMenuOperations_pkey"`);
        await queryRunner.query(`DROP TABLE "UserMenuOperations"`);
    }

}
