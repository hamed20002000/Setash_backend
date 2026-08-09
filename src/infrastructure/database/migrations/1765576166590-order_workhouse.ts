import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderWorkhouse1765576166590 implements MigrationInterface {
    name = 'OrderWorkhouse1765576166590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD "WorkhouseId" bigint`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD CONSTRAINT "FK_732d8645f7e9130aaab5cc6c443" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP CONSTRAINT "FK_732d8645f7e9130aaab5cc6c443"`);
        await queryRunner.query(`ALTER TABLE "Personnels" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelSalaries" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ALTER COLUMN "Salary" SET DEFAULT '$0.00'`);
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP COLUMN "WorkhouseId"`);
    }

}
