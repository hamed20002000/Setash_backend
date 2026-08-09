import { MigrationInterface, QueryRunner } from "typeorm";

export class PerssonellSalaryAdd1764692554105 implements MigrationInterface {
    name = 'PerssonellSalaryAdd1764692554105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PersonnelSalaries" ("Id" BIGSERIAL NOT NULL, "Salary" money NOT NULL DEFAULT '0', "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "PersonnelId" bigint, "UserId" uuid, CONSTRAINT "PK_475b883a805b4b5e3093c662508" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "PersonnelSalaries_pkey" ON "PersonnelSalaries" ("Id") `);
        await queryRunner.query(`ALTER TABLE "Personnels" ADD "Salary" money NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ADD CONSTRAINT "FK_797cd3fe2bca4e505b219bf3e9d" FOREIGN KEY ("PersonnelId") REFERENCES "Personnels"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ADD CONSTRAINT "FK_d0006e4325d14eb7356e4223933" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" DROP CONSTRAINT "FK_d0006e4325d14eb7356e4223933"`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" DROP CONSTRAINT "FK_797cd3fe2bca4e505b219bf3e9d"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "Personnels" DROP COLUMN "Salary"`);
        await queryRunner.query(`DROP INDEX "public"."PersonnelSalaries_pkey"`);
        await queryRunner.query(`DROP TABLE "PersonnelSalaries"`);
    }

}
