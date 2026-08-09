import { MigrationInterface, QueryRunner } from "typeorm";

export class TransmissionItemCreateAt1754653992495 implements MigrationInterface {
    name = 'TransmissionItemCreateAt1754653992495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransmissionRowItmes" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "TransmissionRowItmes" ADD "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TransmissionRowItmes" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "TransmissionRowItmes" ADD "CreateAt" TIME WITH TIME ZONE NOT NULL`);
    }

}
