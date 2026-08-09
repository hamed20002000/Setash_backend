import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestWorkhouse1766872287124 implements MigrationInterface {
    name = 'RequestWorkhouse1766872287124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" ADD "WorkhouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Requests" ADD CONSTRAINT "FK_842f2a06dea174f19e3426a0966" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Requests" DROP CONSTRAINT "FK_842f2a06dea174f19e3426a0966"`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "Requests" DROP COLUMN "WorkhouseId"`);
    }

}
