import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreDispatchDriverVehicle1757852108042 implements MigrationInterface {
    name = 'StoreDispatchDriverVehicle1757852108042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD "DriverVehicleId" bigint`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD CONSTRAINT "FK_283664b101e00171f7b0ce8491d" FOREIGN KEY ("DriverVehicleId") REFERENCES "DriverVehicles"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP CONSTRAINT "FK_283664b101e00171f7b0ce8491d"`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP COLUMN "DriverVehicleId"`);
    }

}
