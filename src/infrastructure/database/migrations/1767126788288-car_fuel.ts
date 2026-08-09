import { MigrationInterface, QueryRunner } from "typeorm";

export class CarFuel1767126788288 implements MigrationInterface {
    name = 'CarFuel1767126788288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" ADD "FuelType" character varying`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" DROP COLUMN "FuelType"`);
    }

}
