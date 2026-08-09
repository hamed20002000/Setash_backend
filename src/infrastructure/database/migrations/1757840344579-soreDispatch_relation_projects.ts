import { MigrationInterface, QueryRunner } from "typeorm";

export class SoreDispatchRelationProjects1757840344579 implements MigrationInterface {
    name = 'SoreDispatchRelationProjects1757840344579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD "ProjectId" bigint`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" ADD CONSTRAINT "FK_f35128f15b1dfdc5b8a2ce60b52" FOREIGN KEY ("ProjectId") REFERENCES "Projects"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP CONSTRAINT "FK_f35128f15b1dfdc5b8a2ce60b52"`);
        await queryRunner.query(`ALTER TABLE "StoreDispatchHeaders" DROP COLUMN "ProjectId"`);
    }

}
