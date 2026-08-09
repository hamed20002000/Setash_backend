import { MigrationInterface, QueryRunner } from "typeorm";

export class WarhoueseDispatchStatusHistory1757404546121 implements MigrationInterface {
    name = 'WarhoueseDispatchStatusHistory1757404546121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaderStatusHistories" ALTER COLUMN "UserId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaderStatusHistories" ADD CONSTRAINT "FK_e3351921cfd7823ef7d2101de67" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaderStatusHistories" DROP CONSTRAINT "FK_e3351921cfd7823ef7d2101de67"`);
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaderStatusHistories" ALTER COLUMN "UserId" SET NOT NULL`);
    }

}
