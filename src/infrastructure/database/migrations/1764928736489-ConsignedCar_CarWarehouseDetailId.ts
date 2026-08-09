import { MigrationInterface, QueryRunner } from "typeorm";

export class ConsignedCarCarWarehouseDetailId1764928736489 implements MigrationInterface {
    name = 'ConsignedCarCarWarehouseDetailId1764928736489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782"`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" RENAME COLUMN "CarWarhouseDetailId" TO "CarWarehouseDetailId"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD CONSTRAINT "FK_8fe5d9a501784594848acae3f70" FOREIGN KEY ("CarWarehouseDetailId") REFERENCES "CarWarehouseDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP CONSTRAINT "FK_8fe5d9a501784594848acae3f70"`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" RENAME COLUMN "CarWarehouseDetailId" TO "CarWarhouseDetailId"`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782" FOREIGN KEY ("CarWarhouseDetailId") REFERENCES "CarWarehouseDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
