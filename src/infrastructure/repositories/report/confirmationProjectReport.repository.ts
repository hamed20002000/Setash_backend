import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';

@Injectable()
export class ConfirmationProjectReportRepository extends BaseRepository<ConfirmationProjectReport> {
  constructor(@InjectRepository(ConfirmationProjectReport) repository: Repository<ConfirmationProjectReport>) {
    super(repository);
  }

  async getProjectsReport() {
    const query = `
      select
        DATE_PART('year', p."EndDate") as year,
        r."Name" as city,
        r2."Name" as town,
        p."Title" as region,
        p."Type" as tesisType,
        nta."Title" as trAdi,
        count(p."Id") as projectCount
      from "Projects" p
      left join "Workhouses" w on p."WorkhouseId" = w."Id"
      left join "Regions" r on w."RegionId" = r.id
      left join "Regions" r2 on r."ParentId" = r2.id
      left join "Works" w2 on w."WorkId" = w2."Id"
      left join "Networks" n on n."WorkId" = w2."Id"
      left join "NetworkTrAdis" nta on n."Id" = nta."NetworkId"
      where p."EndDate" is not null
      group by
        DATE_PART('year', p."EndDate"),
        r."Name",
        r2."Name",
        p."Title",
        p."Type",
        nta."Title";
    `;

    return this.repository.query(query);
  }

  async getProjectsMemberConfirmCountReport() {
    const query = `
      select
	subquery."Id",
	coalesce(sum(subquery.count), 0) as totalCount
from
	(
	select
		cpr."Id",
		crcma."ConfirmationReportCommiteMemberId",
		count(crcma."ConfirmationReportCommiteMemberId")
	from
		"ConfirmationProjectReport" cpr
	inner join "ConfirmationReportCommiteMember" crcm 
        on
		cpr."Id" = crcm."ConfirmationProjectReportId"
	left join "ConfirmationReportCommiteMemberAnswer" crcma 
        on
		crcm."Id" = crcma."ConfirmationReportCommiteMemberId"
	where
		crcma."Answer" = 5
	group by cpr."Id",
		crcma."ConfirmationReportCommiteMemberId"
) subquery
group by
	subquery."Id"

    `;

    return this.repository.query(query);
  }
}