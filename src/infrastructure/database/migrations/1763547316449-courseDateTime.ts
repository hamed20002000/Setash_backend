import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseDateTime1763547316449 implements MigrationInterface {
    name = 'CourseDateTime1763547316449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseParticipants" DROP CONSTRAINT "FK_f227b8dd24547aad38315da4363"`);
        await queryRunner.query(`ALTER TABLE "CourseParticipants" RENAME COLUMN "CourseId" TO "CourseDateTimeId"`);
        await queryRunner.query(`CREATE TABLE "CourseDateTimes" ("Id" BIGSERIAL NOT NULL, "StartDateTime" TIMESTAMP WITH TIME ZONE NOT NULL, "EndDateTime" TIME WITH TIME ZONE, "RecordStatus" smallint NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "CourseId" bigint, "UserId" uuid, "WorkhouseId" bigint, CONSTRAINT "PK_533e0eb0e3273d33aa2f6dee48b" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "CourseDateTimes_pkey" ON "CourseDateTimes" ("Id") `);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD CONSTRAINT "FK_1fc3ab8fa7535359507ecaf4895" FOREIGN KEY ("CourseId") REFERENCES "Courses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD CONSTRAINT "FK_08d2de4065adfb886892fc656bd" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" ADD CONSTRAINT "FK_ffbd9f6aa07f3d09a035dabe31e" FOREIGN KEY ("WorkhouseId") REFERENCES "Workhouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseParticipants" ADD CONSTRAINT "FK_bad8e47d4e99afea234909d1de8" FOREIGN KEY ("CourseDateTimeId") REFERENCES "CourseDateTimes"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseParticipants" DROP CONSTRAINT "FK_bad8e47d4e99afea234909d1de8"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP CONSTRAINT "FK_ffbd9f6aa07f3d09a035dabe31e"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP CONSTRAINT "FK_08d2de4065adfb886892fc656bd"`);
        await queryRunner.query(`ALTER TABLE "CourseDateTimes" DROP CONSTRAINT "FK_1fc3ab8fa7535359507ecaf4895"`);
        await queryRunner.query(`DROP INDEX "public"."CourseDateTimes_pkey"`);
        await queryRunner.query(`DROP TABLE "CourseDateTimes"`);
        await queryRunner.query(`ALTER TABLE "CourseParticipants" RENAME COLUMN "CourseDateTimeId" TO "CourseId"`);
        await queryRunner.query(`ALTER TABLE "CourseParticipants" ADD CONSTRAINT "FK_f227b8dd24547aad38315da4363" FOREIGN KEY ("CourseId") REFERENCES "Courses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
