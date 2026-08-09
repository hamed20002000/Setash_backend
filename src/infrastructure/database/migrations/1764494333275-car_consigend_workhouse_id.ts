import { MigrationInterface, QueryRunner } from "typeorm";

export class CarConsigendWorkhouseId1764494333275 implements MigrationInterface {
    name = 'CarConsigendWorkhouseId1764494333275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Courses" ADD "ISG" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD "WorkhouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD CONSTRAINT "FK_c120a2d9023da31d5a75733a435" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP CONSTRAINT "FK_c120a2d9023da31d5a75733a435"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP COLUMN "WorkhouseId"`);
        await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "ISG"`);
    }

}
