import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRequests1761861442107 implements MigrationInterface {
    name = 'OrderRequests1761861442107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD "RequestId" bigint`);
        await queryRunner.query(`ALTER TABLE "OrderHeaders" ADD CONSTRAINT "FK_de45ddfd2c4a2e6c11f57471a01" FOREIGN KEY ("RequestId") REFERENCES "Requests"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP CONSTRAINT "FK_de45ddfd2c4a2e6c11f57471a01"`);
        await queryRunner.query(`ALTER TABLE "OrderHeaders" DROP COLUMN "RequestId"`);
    }

}
