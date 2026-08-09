import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfirmationReport1764104028232 implements MigrationInterface {
    name = 'ConfirmationReport1764104028232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ConfirmationProjectReport" ("Id" BIGSERIAL NOT NULL, "Year" integer NOT NULL, "City" character varying(300) NOT NULL, "Town" character varying(300) NOT NULL, "Region" character varying(300) NOT NULL, "TesisType" smallint NOT NULL, "TrAdi" character varying(300) NOT NULL, "ProjectCount" integer NOT NULL, "TutanakTeslimAlmaDurumu" boolean NOT NULL DEFAULT false, "GeciciKabulTutanagi" boolean NOT NULL DEFAULT false, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "UserId" uuid, CONSTRAINT "PK_40de28605a37990bc06de834cdf" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ConfirmationProjectReport_pkey" ON "ConfirmationProjectReport" ("Id") `);
        await queryRunner.query(`CREATE TABLE "ConfirmationReportCommiteMemberAnswer" ("Id" BIGSERIAL NOT NULL, "Answer" character varying(200) NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "ConfirmationReportCommiteMemberId" bigint, "UserId" uuid, CONSTRAINT "PK_2051d5361d7fb5feeacfda2ea6b" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ConfirmationReportCommiteMemberAnswer_pkey" ON "ConfirmationReportCommiteMemberAnswer" ("Id") `);
        await queryRunner.query(`CREATE TABLE "ConfirmationReportCommiteMember" ("Id" BIGSERIAL NOT NULL, "Name" character varying(200) NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "CommiteMembersId" bigint, "ConfirmationProjectReportId" bigint, "UserId" uuid, CONSTRAINT "PK_48101f8f07d14d90a1aa3c2bf4e" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "ConfirmationReportCommiteMember_pkey" ON "ConfirmationReportCommiteMember" ("Id") `);
        await queryRunner.query(`CREATE TABLE "CommiteMembers" ("Id" BIGSERIAL NOT NULL, "Name" character varying(200) NOT NULL, "Family" character varying(200) NOT NULL, "Position" integer NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "UserId" uuid, CONSTRAINT "PK_63b4559ca1a91aab84173003059" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "CommiteMembers_pkey" ON "CommiteMembers" ("Id") `);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" ADD CONSTRAINT "FK_ec1e33eddefc8fe69f38222f68d" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" ADD CONSTRAINT "FK_8a2e676c4cc62abe9963b5faced" FOREIGN KEY ("ConfirmationReportCommiteMemberId") REFERENCES "ConfirmationReportCommiteMember"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" ADD CONSTRAINT "FK_deff145b34a882ed22c32a6b36b" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" ADD CONSTRAINT "FK_f4557a464ceb1858b23ec001f23" FOREIGN KEY ("CommiteMembersId") REFERENCES "CommiteMembers"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" ADD CONSTRAINT "FK_d326021f986c2077764d298fd2a" FOREIGN KEY ("ConfirmationProjectReportId") REFERENCES "ConfirmationProjectReport"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" ADD CONSTRAINT "FK_c69ed4a9dc216a10806ee107ebf" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CommiteMembers" ADD CONSTRAINT "FK_b47ecf8ddc97d1f555a833b515a" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CommiteMembers" DROP CONSTRAINT "FK_b47ecf8ddc97d1f555a833b515a"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" DROP CONSTRAINT "FK_c69ed4a9dc216a10806ee107ebf"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" DROP CONSTRAINT "FK_d326021f986c2077764d298fd2a"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMember" DROP CONSTRAINT "FK_f4557a464ceb1858b23ec001f23"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" DROP CONSTRAINT "FK_deff145b34a882ed22c32a6b36b"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationReportCommiteMemberAnswer" DROP CONSTRAINT "FK_8a2e676c4cc62abe9963b5faced"`);
        await queryRunner.query(`ALTER TABLE "ConfirmationProjectReport" DROP CONSTRAINT "FK_ec1e33eddefc8fe69f38222f68d"`);
        await queryRunner.query(`DROP INDEX "public"."CommiteMembers_pkey"`);
        await queryRunner.query(`DROP TABLE "CommiteMembers"`);
        await queryRunner.query(`DROP INDEX "public"."ConfirmationReportCommiteMember_pkey"`);
        await queryRunner.query(`DROP TABLE "ConfirmationReportCommiteMember"`);
        await queryRunner.query(`DROP INDEX "public"."ConfirmationReportCommiteMemberAnswer_pkey"`);
        await queryRunner.query(`DROP TABLE "ConfirmationReportCommiteMemberAnswer"`);
        await queryRunner.query(`DROP INDEX "public"."ConfirmationProjectReport_pkey"`);
        await queryRunner.query(`DROP TABLE "ConfirmationProjectReport"`);
    }

}
