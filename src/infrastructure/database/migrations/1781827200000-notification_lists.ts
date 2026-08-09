import { MigrationInterface, QueryRunner } from "typeorm";

export class NotificationLists1781827200000 implements MigrationInterface {
    name = 'NotificationLists1781827200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "NotificationLists" ("Id" BIGSERIAL NOT NULL, "Name" character varying NOT NULL, CONSTRAINT "PK_NotificationLists_Id" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "NotificationLists_pkey" ON "NotificationLists" ("Id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "NotificationLists_Name_key" ON "NotificationLists" ("Name") `);
        await queryRunner.query(`
            INSERT INTO "NotificationLists" ("Name") VALUES
            ('warehouse-dispatch'),
            ('warehouse-dispatch-destruction'),
            ('warehouse-dispatch-between-warehouse'),
            ('store-dispatch-to-project'),
            ('store-dispatch-to-center'),
            ('store-dispatch-destruction-to-center'),
            ('store-dispatch-between-store'),
            ('project-planning-date-created'),
            ('order'),
            ('request'),
            ('invoice-to-warehouse'),
            ('invoice-to-store'),
            ('project-created'),
            ('project-planning-created'),
            ('project-planning-implementation-created'),
            ('personnel-created'),
            ('leave-created'),
            ('tender')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."NotificationLists_Name_key"`);
        await queryRunner.query(`DROP INDEX "public"."NotificationLists_pkey"`);
        await queryRunner.query(`DROP TABLE "NotificationLists"`);
    }

}
