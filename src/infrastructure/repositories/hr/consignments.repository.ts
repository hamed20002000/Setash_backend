import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, Repository } from 'typeorm';
import { Consignments } from 'src/domain/entities/Consignments';
import { PersonnelConsigneds } from 'src/domain/entities/PersonnelConsigneds';

@Injectable()
export class ConsignmentsRepository extends BaseRepository<Consignments> {
  constructor(@InjectRepository(Consignments) repository: Repository<Consignments>, private readonly dataSource: DataSource) {
    super(repository);
  }

  async getConsignmentsStatus() {
    return this.repository.query(`
    SELECT
      c."Id" AS "consignmentId",
      c."Name" AS "consignmentName",
      c."Code" AS "consignmentCode",
      pc."AssignmentDate",
      p."Id" AS "personnelId",
      p."Name" AS "personnelName",
      p."Family" AS "personnelFamily",
      CASE 
        WHEN pc."Id" IS NULL THEN false
        ELSE true
      END AS "isConsigned"
    FROM "Consignments" c
    LEFT JOIN LATERAL (
      SELECT *
      FROM "PersonnelConsigneds" pc
      WHERE pc."ConsignmentId" = c."Id"
        AND pc."ReturnDate" IS NULL
        AND pc."RecordStatus" = 0
      ORDER BY pc."AssignmentDate" DESC
      LIMIT 1
    ) pc ON true
    LEFT JOIN "Personnels" p ON p."Id" = pc."PersonnelId"
  `);
  }

  async finAvailableConsignments(): Promise<Consignments[]> {
    const freeConsignments = await this.repository.query(`
  SELECT c.*
  FROM "Consignments" c
  LEFT JOIN LATERAL (
    SELECT pc."Id", pc."ReturnDate"
    FROM "PersonnelConsigneds" pc
    WHERE pc."ConsignmentId" = c."Id"
    ORDER BY pc."Id" DESC
    LIMIT 1
  ) lastPC ON true
  WHERE lastPC."Id" IS NULL
     OR lastPC."ReturnDate" IS NOT NULL;
`);



    return freeConsignments;
  }

  async findConsignmentsInUse(): Promise<Consignments[]> {
    const result = await this.repository.query(`
    SELECT
      c.*,
      p."Id"        AS "PersonnelId",
      p."Name"      AS "PersonnelName",
      p."Family"    AS "PersonnelFamily"
    FROM "Consignments" c
    JOIN LATERAL (
      SELECT
        pc."Id",
        pc."ReturnDate",
        pc."PersonnelId"
      FROM "PersonnelConsigneds" pc
      WHERE pc."ConsignmentId" = c."Id"
        AND pc."RecordStatus" = 0
      ORDER BY pc."Id" DESC
      LIMIT 1
    ) lastPC ON true
    JOIN "Personnels" p ON p."Id" = lastPC."PersonnelId"
    WHERE c."RecordStatus" = 0
      AND lastPC."ReturnDate" IS NULL;
  `);

    return result;
  }

  async findPersonelConsigneds(personnelId: number): Promise<Consignments[]> {
    return await this.repository
      .createQueryBuilder("c")
      .innerJoin(
        "c.personnelConsigneds",
        "pc",
        `"pc"."PersonnelId" = :pid`,
        { pid: personnelId }
      )
      .where(`
      "pc"."Id" = (
        SELECT p."Id"
        FROM "PersonnelConsigneds" p
        WHERE p."ConsignmentId" = c."Id"
        AND p."PersonnelId" = :pid
        ORDER BY p."Id" DESC
        LIMIT 1
      )
    `)
      .andWhere(`"pc"."ReturnDate" IS NULL`)
      .setParameter("pid", personnelId)
      .getMany();
  }


}