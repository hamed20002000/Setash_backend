import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsiendNo1762779551823 implements MigrationInterface {
    name = 'ConsiendNo1762779551823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ConsignmentNos" ("Id" BIGSERIAL NOT NULL, "No" bigint NOT NULL, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_5846ff60f89e00c4400ff62235b" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ConsignmentNos_pkey" ON "ConsignmentNos" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Consignments" ALTER COLUMN "PlaceType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" DROP COLUMN "AssignmentDate"`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" ADD "AssignmentDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" ADD "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ConsignmentNos" ADD CONSTRAINT "FK_121659d4c7af3b3760761c8442e" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignmentNos" DROP CONSTRAINT "FK_121659d4c7af3b3760761c8442e"`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" ADD "CreateAt" TIME WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" DROP COLUMN "AssignmentDate"`);
        await queryRunner.query(`ALTER TABLE "PersonnelConsigneds" ADD "AssignmentDate" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "Consignments" ALTER COLUMN "PlaceType" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."ConsignmentNos_pkey"`);
        await queryRunner.query(`DROP TABLE "ConsignmentNos"`);
    }

}
