import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreTransactionAdminAccept1756737859600 implements MigrationInterface {
    name = 'StoreTransactionAdminAccept1756737859600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreTransactions" ALTER COLUMN "AdminConfirm" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreTransactions" ALTER COLUMN "AdminConfirm" SET NOT NULL`);
    }

}
