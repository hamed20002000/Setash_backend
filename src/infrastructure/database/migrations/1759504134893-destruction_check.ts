import { MigrationInterface, QueryRunner } from "typeorm";

export class DestructionCheck1759504134893 implements MigrationInterface {
    name = 'DestructionCheck1759504134893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" ADD "DestructionStatus" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WarehouseDispatchHeaders" DROP COLUMN "DestructionStatus"`);
    }

}
