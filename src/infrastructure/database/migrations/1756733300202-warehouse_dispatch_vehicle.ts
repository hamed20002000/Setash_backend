import { MigrationInterface, QueryRunner } from "typeorm";

export class WarehouseDispatchVehicle1756733300202 implements MigrationInterface {
    name = 'WarehouseDispatchVehicle1756733300202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" ADD "DriverVehicleId" bigint`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" ADD CONSTRAINT "FK_e7dbc4cb5faefc23f35c5d40d50" FOREIGN KEY ("DriverVehicleId") REFERENCES "DriverVehicles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" DROP CONSTRAINT "FK_e7dbc4cb5faefc23f35c5d40d50"`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" DROP COLUMN "DriverVehicleId"`);
    }

}
