import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWorkplaceProject1761250740575 implements MigrationInterface {
    name = 'RemoveWorkplaceProject1761250740575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SystemNotifications" ("Id" BIGSERIAL NOT NULL, "Role" character varying NOT NULL, "Type" character varying NOT NULL, "IdValue" character varying, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "UserId" uuid, CONSTRAINT "PK_b52c13b5094182ba950227c0374" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "SystemNotifications_pkey" ON "SystemNotifications" ("Id") `);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" DROP COLUMN "WorkStatus"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" DROP COLUMN "WorkStatusDescription"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ADD "Description" character varying`);
        await queryRunner.query(`ALTER TABLE "SystemNotifications" ADD CONSTRAINT "FK_0a68cdf3c92db643f4d28a00ff7" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SystemNotifications" DROP CONSTRAINT "FK_0a68cdf3c92db643f4d28a00ff7"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" DROP COLUMN "Description"`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ADD "WorkStatusDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "PersonnelWorkPlaces" ADD "WorkStatus" smallint NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."SystemNotifications_pkey"`);
        await queryRunner.query(`DROP TABLE "SystemNotifications"`);
    }

}
