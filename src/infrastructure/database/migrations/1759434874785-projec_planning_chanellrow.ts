import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjecPlanningChanellrow1759434874785 implements MigrationInterface {
    name = 'ProjecPlanningChanellrow1759434874785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "ChannelRowId" bigint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD "TransmissionRowId" bigint`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD CONSTRAINT "FK_4175cc06022ed9f09b7c5ce889e" FOREIGN KEY ("ChannelRowId") REFERENCES "ChannelRows"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" ADD CONSTRAINT "FK_8cf281608c0cd0763dc05844faf" FOREIGN KEY ("TransmissionRowId") REFERENCES "TransmissionRows"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP CONSTRAINT "FK_8cf281608c0cd0763dc05844faf"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP CONSTRAINT "FK_4175cc06022ed9f09b7c5ce889e"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "TransmissionRowId"`);
        await queryRunner.query(`ALTER TABLE "ProjectPlanningImplementation" DROP COLUMN "ChannelRowId"`);
    }

}
