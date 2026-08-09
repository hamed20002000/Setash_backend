import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleCreateatType1751231174493 implements MigrationInterface {
    name = 'UserRoleCreateatType1751231174493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRoles" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "UserRoles" ADD "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRoles" DROP COLUMN "CreateAt"`);
        await queryRunner.query(`ALTER TABLE "UserRoles" ADD "CreateAt" TIME WITH TIME ZONE NOT NULL`);
    }

}
