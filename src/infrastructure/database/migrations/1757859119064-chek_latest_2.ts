import { MigrationInterface, QueryRunner } from "typeorm";

export class ChekLatest21757859119064 implements MigrationInterface {
    name = 'ChekLatest21757859119064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" ADD "OriginStoreDispatchDetailId" bigint`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" ADD CONSTRAINT "FK_23cc7e96ac136946ecc528df4cf" FOREIGN KEY ("OriginStoreDispatchDetailId") REFERENCES "StoreDispatchDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" DROP CONSTRAINT "FK_23cc7e96ac136946ecc528df4cf"`);
        await queryRunner.query(`ALTER TABLE "StoreReceiptDetails" DROP COLUMN "OriginStoreDispatchDetailId"`);
    }

}
