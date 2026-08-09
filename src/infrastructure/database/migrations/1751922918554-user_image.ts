import { MigrationInterface, QueryRunner } from "typeorm";

export class UserImage1751922918554 implements MigrationInterface {
    name = 'UserImage1751922918554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "ImageSrc" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "ImageSrc"`);
    }

}
