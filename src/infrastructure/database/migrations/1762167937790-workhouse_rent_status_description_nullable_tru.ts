import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseRentStatusDescriptionNullableTru1762167937790 implements MigrationInterface {
    name = 'WorkhouseRentStatusDescriptionNullableTru1762167937790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" ALTER COLUMN "StatusDescription" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseRents" ALTER COLUMN "StatusDescription" SET NOT NULL`);
    }

}
