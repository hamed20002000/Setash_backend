import { MigrationInterface, QueryRunner } from "typeorm";

export class ChannelRowItemCreateAt1753569591093 implements MigrationInterface {
    name = 'ChannelRowItemCreateAt1753569591093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ChannelRowItems" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "ChannelRowItems" ADD "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ChannelRowItems" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "ChannelRowItems" ADD "CreateAt" TIME WITH TIME ZONE NOT NULL`);
    }

}
