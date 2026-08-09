import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonelWorkplaceSalary1764492960895 implements MigrationInterface {
    name = 'PersonelWorkplaceSalary1764492960895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ADD "Salary" money NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" DROP COLUMN "Salary"`);
    }

}
