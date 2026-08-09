import { MigrationInterface, QueryRunner } from "typeorm";

export class CarwarehouseDetail1763235837216 implements MigrationInterface {
    name = 'CarwarehouseDetail1763235837216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782"`);
        await queryRunner.query(`CREATE TABLE "CarWarehouseDetails" ("Id" BIGSERIAL NOT NULL, "Brand" character varying(200) NOT NULL, "Model" character varying NOT NULL, "ManufactureDate" TIMESTAMP WITH TIME ZONE NOT NULL, "Plaque" character varying NOT NULL, "Attacments" json NOT NULL, "Description" character varying NOT NULL, "CreateAt" TIMESTAMP WITH TIME ZONE NOT NULL, "RecordStatus" smallint NOT NULL, "Available" boolean NOT NULL, "CarWarehouseId" bigint, "UserId" uuid, CONSTRAINT "PK_3f0c5e10afa1abaac2ff943ba5c" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "CarWarehouseDetails_pkey" ON "CarWarehouseDetails" ("Id") `);
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" ADD CONSTRAINT "FK_77475c0155b7e0c3f36f8c584e6" FOREIGN KEY ("CarWarehouseId") REFERENCES "CarWarehouses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" ADD CONSTRAINT "FK_646e1e48f2973eaf26e47ee0063" FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782" FOREIGN KEY ("CarWarhouseDetailId") REFERENCES "CarWarehouseDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ConsignedCars" DROP CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782"`);
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" DROP CONSTRAINT "FK_646e1e48f2973eaf26e47ee0063"`);
        await queryRunner.query(`ALTER TABLE "CarWarehouseDetails" DROP CONSTRAINT "FK_77475c0155b7e0c3f36f8c584e6"`);
        await queryRunner.query(`DROP INDEX "public"."CarWarehouseDetails_pkey"`);
        await queryRunner.query(`DROP TABLE "CarWarehouseDetails"`);
        await queryRunner.query(`ALTER TABLE "ConsignedCars" ADD CONSTRAINT "FK_0e1606d74fc5a1b752037c9c782" FOREIGN KEY ("CarWarhouseDetailId") REFERENCES "CarWarhouseDetails"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
