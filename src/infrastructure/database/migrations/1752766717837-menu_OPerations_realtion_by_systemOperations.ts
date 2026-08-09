import { MigrationInterface, QueryRunner } from "typeorm";

export class MenuOPerationsRealtionBySystemOperations1752766717837 implements MigrationInterface {
    name = 'MenuOPerationsRealtionBySystemOperations1752766717837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MenuOperations" ADD "SystemOperationId" bigint`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" ADD CONSTRAINT "FK_887299da6f2f690c2c74fb2c008" FOREIGN KEY ("SystemOperationId") REFERENCES "SystemOperations"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MenuOperations" DROP CONSTRAINT "FK_887299da6f2f690c2c74fb2c008"`);
        await queryRunner.query(`ALTER TABLE "MenuOperations" DROP COLUMN "SystemOperationId"`);
    }

}
