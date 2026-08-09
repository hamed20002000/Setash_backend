import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkhouseDetailSubscription1755032362224 implements MigrationInterface {
    name = 'WorkhouseDetailSubscription1755032362224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" DROP COLUMN "Subscription"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ADD "Subscription" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" DROP COLUMN "Subscription"`);
        await queryRunner.query(`ALTER TABLE "WorkhouseDetails" ADD "Subscription" json NOT NULL`);
    }

}
