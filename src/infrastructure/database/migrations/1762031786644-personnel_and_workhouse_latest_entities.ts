import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonnelAndWorkhouseLatestEntities1762031786644 implements MigrationInterface {
    name = 'PersonnelAndWorkhouseLatestEntities1762031786644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" RENAME COLUMN "RequestId" TO "WorkhouseRentId"`);
        await queryRunner.query(`CREATE TABLE "WorkhouseRents" ("Id" BIGSERIAL NOT NULL, "Title" character varying(200) NOT NULL, "Description" character varying NOT NULL, "DriverInfo" character varying, "Price" money NOT NULL, "Company" character varying NOT NULL, "RentStartDate" date NOT NULL, "RentEndDate" date NOT NULL, "Attachments" json, "Status" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "UserId" uuid, "WorkhouseId" bigint, CONSTRAINT "PK_be5645dcdc3410afabc44063b00" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "WorkhouseRents_pkey" ON "WorkhouseRents" ("Id") `);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP COLUMN "WorkhouseRentId"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD "RequestId" bigint`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD "WorkhouseRentId" bigint`);
        await queryRunner.query(`ALTER TABLE "Personnels" ADD "HasISG" boolean`);
        await queryRunner.query(`ALTER TABLE "Personnels" ADD "Attachments" json`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec" FOREIGN KEY ("RequestId") REFERENCES "Requests"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_a839ae1f09e0d579183b30dae45" FOREIGN KEY ("WorkhouseRentId") REFERENCES "WorkhouseRents"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" ADD CONSTRAINT "FK_b4d13a01457a16884a0c3e96d2e" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" ADD CONSTRAINT "FK_f92bca94b5dae042377cc25ad47" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" DROP CONSTRAINT "FK_f92bca94b5dae042377cc25ad47"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" DROP CONSTRAINT "FK_b4d13a01457a16884a0c3e96d2e"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_a839ae1f09e0d579183b30dae45"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec"`);
        await queryRunner.query(`ALTER TABLE "Personnels" DROP COLUMN "Attachments"`);
        await queryRunner.query(`ALTER TABLE "Personnels" DROP COLUMN "HasISG"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP COLUMN "WorkhouseRentId"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" DROP COLUMN "RequestId"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD "WorkhouseRentId" bigint`);
        await queryRunner.query(`DROP INDEX "public"."WorkhouseRents_pkey"`);
        await queryRunner.query(`DROP TABLE "WorkhouseRents"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" RENAME COLUMN "WorkhouseRentId" TO "RequestId"`);
        await queryRunner.query(`ALTER TABLE "RequestStatusHistories" ADD CONSTRAINT "FK_e7ecc3a9110211de8ad78d809ec" FOREIGN KEY ("RequestId") REFERENCES "Requests"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
