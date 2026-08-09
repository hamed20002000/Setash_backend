import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseDetailNullables1755168979615 implements MigrationInterface {
    name = 'WorkhouseDetailNullables1755168979615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "Owner" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "RentStartDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "RentEndDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "Price" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "Price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "RentEndDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "RentStartDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ALTER COLUMN "Owner" SET NOT NULL`);
    }

}
