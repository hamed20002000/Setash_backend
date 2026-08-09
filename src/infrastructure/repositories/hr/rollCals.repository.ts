import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Rollcalls } from 'src/domain/entities/Rollcalls';

@Injectable()
export class RollCallRepository extends BaseRepository<Rollcalls> {
  constructor(@InjectRepository(Rollcalls) repository: Repository<Rollcalls>) {
    super(repository);
  }

  async getRollcalls(
    workhouseId: number,
    fromDate: string,
    toDate: string,
  ) {
    const query = `
    SELECT
        COALESCE(w."Id", w2."Id") AS "workhouseId",
        COALESCE(w."Name", w2."Name") AS "workhouse",
        p."Name" AS personnel_name,
        p."Family" AS personnel_family,
        p."FatherName" AS personnel_father_name,
        p."IdentityNumber" AS personnel_identity_number,
        pwp."StartDate" AS personnel_job_start_date,
        pwp."EndDate" AS personnel_job_end_date,
        r."Date" AS rollcall_date,
        r."StartTime" AS rollcall_start_time,
        r."EndTime" AS rollcall_end_time,
        r."Absence" as rollcall_absence
      FROM "PersonnelWorkPlaces" pwp
      LEFT JOIN "Rollcalls" r
        ON r."PersonnelWorkPlaceId" = pwp."Id"
        AND pwp."Type" IN (1, 2)
      INNER JOIN "Personnels" p
        ON pwp."PersonnelId" = p."Id"
      LEFT JOIN "Workhouses" w
        ON pwp."PlaceId" = w."Id"
      LEFT JOIN "Stores" s
        ON s."Id" = pwp."PlaceId"
      LEFT JOIN "Workhouses" w2
        ON s."WorkhouseId" = w2."Id"
      WHERE
        COALESCE(w."Id", w2."Id") = $1
        AND r."Date" BETWEEN $2 AND $3
      ORDER BY r."Date", r."StartTime"
    `;

    return this.repository.query(query, [
      workhouseId,
      fromDate,
      toDate,
    ]);
  }

}
