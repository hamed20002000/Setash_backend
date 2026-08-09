import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';
import { Projects } from 'src/domain/entities/Projects';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { ProjectImplementationReportDto } from 'src/presentation/dtos/project/project-implementation-report.dto';
import { ProjectKpiReportDto, ProjectKpiDateScoreDto, ProjectKpiMetricScoreDto } from 'src/presentation/dtos/project/project-kpi-report.dto';
import { ChantierManagerInfoDto, ChantierManagerKpiReportDto, ChantierManagerProjectKpiDto } from 'src/presentation/dtos/project/project-manager-kpi-report.dto';

@Injectable()
export class ProjectPlanningImplementationRepository extends BaseRepository<ProjectPlanningImplementation> {
  constructor(@InjectRepository(ProjectPlanningImplementation) repository: Repository<ProjectPlanningImplementation>, private readonly dataSource: DataSource) {
    super(repository);
  }

  async getProjectPlanningImplementatoinReport(projectId: number): Promise<ProjectImplementationReportDto[]> {


    const rawData = await this.dataSource.query(`
      select
	max(p."Id") as "ProjectId",
	max(p."Title" ) as "ProjectName",
	ppid."StartDate" ,
	ppid."EndDate" ,
	sum(case when ppi."KaziYapilanDirekDurumu" in (0, 1) then 1 else 0 end ) as "KaziYapilanDirekDurumu",
	sum(case when ppi."AltMontajiYapilanDirekDurumu" in (0, 1) then 1 else 0 end ) as "AltMontajiYapilan",
	sum(case when ppi."BetonAtilanDirekDurumu" in (0, 1) then 1 else 0 end ) as "BetonAtilanDirekDurumu",
	sum(case when ppi."UstMontajiOrulenDirekDurumu" in (0, 1) then 1 else 0 end ) as "UstMontajiOrulenDirekDurumu",
	sum(case when ppi."UstMontajiKurulanDirekDurumu" in (0, 1) then 1 else 0 end ) as "UstMontajiKurulanDirekDurumu",
	sum(case when ppi."DikilenBetonDirekDurumu" in (0, 1) then 1 else 0 end ) as "DikilenBetonDirekDurumu",
	sum(case when ppi."IletkenCekilenDirekDurumu" in (0, 1) then 1 else 0 end ) as "IletkenCekilenDirekDurumu",
	sum(case when ppi."AyiriciTakilanDirekDurumu" in (0, 1) then 1 else 0 end ) as "AyiriciTakilanDirekDurumu",
	sum(case when ppi."DikilenAydinlatmaDirekDurumu" in (0, 1) then 1 else 0 end ) as "DikilenAydinlatmaDirekDurumu",
	sum(case when ppi."KabloKanaliDurumu" in (0, 1) then 1 else 0 end ) as "KabloKanaliDurumu",
	sum(case when ppi."TransformatorDurumu" in (0, 1) then 1 else 0 end ) as "TransformatorDurumu",
	sum(case when ppi."DagitimPanosuDurumu" in (0, 1) then 1 else 0 end ) as "DagitimPanosuDurumu",
	sum(case when ppi."SahaDagitimKutusuDurumu" in (0, 1) then 1 else 0 end ) as "SahaDagitimKutusuDurumu",
	sum(case when ppi."BetonKoskDurumu" in (0, 1) then 1 else 0 end ) as "BetonKoskDurumu",
	sum(case when ppi."HucreDurumu" in (0, 1) then 1 else 0 end ) as "HucreDurumu",
	sum(case when ppi."ProjectPlanningImplementationDateId" in (0, 1) then 1 else 0 end ) as "ProjectPlanningImplementationDateId",
	sum( COALESCE(ppi."CekilenKabloMiktari",0)) as "CekilenKabloMiktari"
from
	"Projects" p
inner join "ProjectPlanings" pp on
	p."Id" = pp."ProjectId"
inner join "ProjectPlanningImplementationDates" ppid on
	pp."Id" = ppid."ProjectPlanningId"
left join "ProjectPlanningImplementation" ppi on
	ppid."Id" = ppi."ProjectPlanningImplementationDateId"
where p."Id" =  $1
group by
	ppid."Id"
 
    ` ,
    [projectId],);

    return rawData.map((r) => ({
      ProjectId: r.ProjectId,
      ProjectName: r.ProjectName,
      StartDate: new Date(r.StartDate),
      EndDate: new Date(r.EndDate),
      KaziYapilanDirekDurumu: Number(r.KaziYapilanDirekDurumu),
      AltMontajiYapilan: Number(r.AltMontajiYapilan),
      BetonAtilanDirekDurumu: Number(r.BetonAtilanDirekDurumu),
      UstMontajiOrulenDirekDurumu: Number(r.UstMontajiOrulenDirekDurumu),
      UstMontajiKurulanDirekDurumu: Number(r.UstMontajiKurulanDirekDurumu),
      DikilenBetonDirekDurumu: Number(r.DikilenBetonDirekDurumu),
      IletkenCekilenDirekDurumu: Number(r.IletkenCekilenDirekDurumu),
      AyiriciTakilanDirekDurumu: Number(r.AyiriciTakilanDirekDurumu),
      DikilenAydinlatmaDirekDurumu: Number(r.DikilenAydinlatmaDirekDurumu),
      KabloKanaliDurumu: Number(r.KabloKanaliDurumu),
      TransformatorDurumu: Number(r.TransformatorDurumu),
      DagitimPanosuDurumu: Number(r.DagitimPanosuDurumu),
      SahaDagitimKutusuDurumu: Number(r.SahaDagitimKutusuDurumu),
      BetonKoskDurumu: Number(r.BetonKoskDurumu),
      HucreDurumu: Number(r.HucreDurumu),
      CekilenKabloMiktari: Number(r.CekilenKabloMiktari),
    }));
  }

  async getProjectPlanningKpiReport(projectId: number): Promise<ProjectKpiReportDto> {
    const rows = await this.dataSource.query(
      `
      select
        p."Id" as project_id,
        max(p."Title") as project_name,
        ppid."Id" as planning_date_id,
        max(ppid."StartDate") as planning_start,
        max(ppid."EndDate") as planning_end,
        max((pp."KaziYapilanDirekSayisi"->>'min')::numeric) as plan_kazi_min,
        max((pp."KaziYapilanDirekSayisi"->>'max')::numeric) as plan_kazi_max,
        max((pp."AltMontajiYapilanDirekSayisi"->>'min')::numeric) as plan_alt_min,
        max((pp."AltMontajiYapilanDirekSayisi"->>'max')::numeric) as plan_alt_max,
        max((pp."BetonAtilanDirekSayisi"->>'min')::numeric) as plan_beton_atilan_min,
        max((pp."BetonAtilanDirekSayisi"->>'max')::numeric) as plan_beton_atilan_max,
        max((pp."UstMontajiOrulenDirekSayisi"->>'min')::numeric) as plan_ust_orulen_min,
        max((pp."UstMontajiOrulenDirekSayisi"->>'max')::numeric) as plan_ust_orulen_max,
        max((pp."UstMontajiKurulanDirekSayisi"->>'min')::numeric) as plan_ust_kurulan_min,
        max((pp."UstMontajiKurulanDirekSayisi"->>'max')::numeric) as plan_ust_kurulan_max,
        max((pp."DikilenBetonDirekSayisi"->>'min')::numeric) as plan_dikilen_beton_min,
        max((pp."DikilenBetonDirekSayisi"->>'max')::numeric) as plan_dikilen_beton_max,
        max((pp."IletkenCekilenDirekSayisi"->>'min')::numeric) as plan_iletken_min,
        max((pp."IletkenCekilenDirekSayisi"->>'max')::numeric) as plan_iletken_max,
        max((pp."AyiriciTakilanDirekSayisi"->>'min')::numeric) as plan_ayirici_min,
        max((pp."AyiriciTakilanDirekSayisi"->>'max')::numeric) as plan_ayirici_max,
        max((pp."DikilenAydinlatmaDirekSayisi"->>'min')::numeric) as plan_aydinlatma_min,
        max((pp."DikilenAydinlatmaDirekSayisi"->>'max')::numeric) as plan_aydinlatma_max,
        max((pp."KabloKanali"->>'min')::numeric) as plan_kablo_kanali_min,
        max((pp."KabloKanali"->>'max')::numeric) as plan_kablo_kanali_max,
        max((pp."CekilenKabloMiktari"->>'min')::numeric) as plan_kablo_metre_min,
        max((pp."CekilenKabloMiktari"->>'max')::numeric) as plan_kablo_metre_max,
        max((pp."Transformator"->>'min')::numeric) as plan_transfo_min,
        max((pp."Transformator"->>'max')::numeric) as plan_transfo_max,
        max((pp."DagitimPanosu"->>'min')::numeric) as plan_dagitim_pano_min,
        max((pp."DagitimPanosu"->>'max')::numeric) as plan_dagitim_pano_max,
        max((pp."SahaDagıtımKutusu"->>'min')::numeric) as plan_saha_kutu_min,
        max((pp."SahaDagıtımKutusu"->>'max')::numeric) as plan_saha_kutu_max,
        max((pp."BetonKosk"->>'min')::numeric) as plan_beton_kosk_min,
        max((pp."BetonKosk"->>'max')::numeric) as plan_beton_kosk_max,
        max((pp."Hucre"->>'min')::numeric) as plan_hucre_min,
        max((pp."Hucre"->>'max')::numeric) as plan_hucre_max,
        sum(case when ppi."KaziYapilanDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_kazi,
        sum(case when ppi."AltMontajiYapilanDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_alt,
        sum(case when ppi."BetonAtilanDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_beton_atilan,
        sum(case when ppi."UstMontajiOrulenDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_ust_orulen,
        sum(case when ppi."UstMontajiKurulanDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_ust_kurulan,
        sum(case when ppi."DikilenBetonDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_dikilen_beton,
        sum(case when ppi."IletkenCekilenDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_iletken,
        sum(case when ppi."AyiriciTakilanDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_ayirici,
        sum(case when ppi."DikilenAydinlatmaDirekDurumu" in (0, 1) then 1 else 0 end)::numeric as act_aydinlatma,
        sum(case when ppi."KabloKanaliDurumu" in (0, 1) then 1 else 0 end)::numeric as act_kablo_kanali,
        sum(coalesce(ppi."CekilenKabloMiktari", 0))::numeric as act_kablo_metre,
        sum(case when ppi."TransformatorDurumu" in (0, 1) then 1 else 0 end)::numeric as act_transfo,
        sum(case when ppi."DagitimPanosuDurumu" in (0, 1) then 1 else 0 end)::numeric as act_dagitim_pano,
        sum(case when ppi."SahaDagitimKutusuDurumu" in (0, 1) then 1 else 0 end)::numeric as act_saha_kutu,
        sum(case when ppi."BetonKoskDurumu" in (0, 1) then 1 else 0 end)::numeric as act_beton_kosk,
        sum(case when ppi."HucreDurumu" in (0, 1) then 1 else 0 end)::numeric as act_hucre
      from "Projects" p
      inner join "ProjectPlanings" pp on pp."ProjectId" = p."Id"
      inner join "ProjectPlanningImplementationDates" ppid on ppid."ProjectPlanningId" = pp."Id"
      left join "ProjectPlanningImplementation" ppi on ppi."ProjectPlanningImplementationDateId" = ppid."Id"
      where p."Id" = $1
      group by p."Id", ppid."Id"
      order by planning_start asc
      `,
      [projectId],
    );

    const scheduleRow =
      (
        await this.dataSource.query(
          `
          select
            p."Id" as project_id,
            max(p."Title") as project_name,
            max(pp."EndDate") as planned_end,
            coalesce(max(p."EndDate"), max(ppi."CreateAt")) as actual_end,
            case
              when max(pp."EndDate") is null or coalesce(max(p."EndDate"), max(ppi."CreateAt")) is null then null
              else (date(coalesce(max(p."EndDate"), max(ppi."CreateAt"))) - date(max(pp."EndDate")))
            end as diff_days
          from "Projects" p
          left join "ProjectPlanings" pp on pp."ProjectId" = p."Id"
          left join "ProjectPlanningImplementationDates" ppid on ppid."ProjectPlanningId" = pp."Id"
          left join "ProjectPlanningImplementation" ppi on ppi."ProjectPlanningImplementationDateId" = ppid."Id"
          where p."Id" = $1
          group by p."Id"
          `,
          [projectId],
        )
      )[0] ?? {};

    const parseNullableNumber = (value: unknown): number | null => {
      if (value === null || value === undefined) return null;
      const num = Number(value);
      return Number.isFinite(num) ? num : null;
    };

    const calcScore = (actual: number, min: number | null, max: number | null): number => {
      if (min === null || max === null) return 0;
      if (actual > max) return 2;
      if (actual >= min) return 1;
      return -1;
    };

    const metricDefs = [
      { field: 'KaziYapilanDirekSayisi', actual: 'act_kazi', min: 'plan_kazi_min', max: 'plan_kazi_max' },
      { field: 'AltMontajiYapilanDirekSayisi', actual: 'act_alt', min: 'plan_alt_min', max: 'plan_alt_max' },
      { field: 'BetonAtilanDirekSayisi', actual: 'act_beton_atilan', min: 'plan_beton_atilan_min', max: 'plan_beton_atilan_max' },
      { field: 'UstMontajiOrulenDirekSayisi', actual: 'act_ust_orulen', min: 'plan_ust_orulen_min', max: 'plan_ust_orulen_max' },
      { field: 'UstMontajiKurulanDirekSayisi', actual: 'act_ust_kurulan', min: 'plan_ust_kurulan_min', max: 'plan_ust_kurulan_max' },
      { field: 'DikilenBetonDirekSayisi', actual: 'act_dikilen_beton', min: 'plan_dikilen_beton_min', max: 'plan_dikilen_beton_max' },
      { field: 'IletkenCekilenDirekSayisi', actual: 'act_iletken', min: 'plan_iletken_min', max: 'plan_iletken_max' },
      { field: 'AyiriciTakilanDirekSayisi', actual: 'act_ayirici', min: 'plan_ayirici_min', max: 'plan_ayirici_max' },
      { field: 'DikilenAydinlatmaDirekSayisi', actual: 'act_aydinlatma', min: 'plan_aydinlatma_min', max: 'plan_aydinlatma_max' },
      { field: 'KabloKanali', actual: 'act_kablo_kanali', min: 'plan_kablo_kanali_min', max: 'plan_kablo_kanali_max' },
      { field: 'CekilenKabloMiktari', actual: 'act_kablo_metre', min: 'plan_kablo_metre_min', max: 'plan_kablo_metre_max' },
      { field: 'Transformator', actual: 'act_transfo', min: 'plan_transfo_min', max: 'plan_transfo_max' },
      { field: 'DagitimPanosu', actual: 'act_dagitim_pano', min: 'plan_dagitim_pano_min', max: 'plan_dagitim_pano_max' },
      { field: 'SahaDagitimKutusu', actual: 'act_saha_kutu', min: 'plan_saha_kutu_min', max: 'plan_saha_kutu_max' },
      { field: 'BetonKosk', actual: 'act_beton_kosk', min: 'plan_beton_kosk_min', max: 'plan_beton_kosk_max' },
      { field: 'Hucre', actual: 'act_hucre', min: 'plan_hucre_min', max: 'plan_hucre_max' },
    ];

    const dates: ProjectKpiDateScoreDto[] = rows.map((row: any) => {
      const metrics: ProjectKpiMetricScoreDto[] = metricDefs.map((def) => {
        const actual = Number(row[def.actual] ?? 0);
        const min = parseNullableNumber(row[def.min]);
        const max = parseNullableNumber(row[def.max]);
        const score = calcScore(actual, min, max);
        return {
          Field: def.field,
          Actual: Number.isFinite(actual) ? actual : 0,
          Min: min,
          Max: max,
          Score: score,
        };
      });

      const totalScore = metrics.reduce((sum, m) => sum + m.Score, 0);

      return {
        ProjectPlanningImplementationDateId: Number(row.planning_date_id),
        StartDate: row.planning_start ? new Date(row.planning_start) : null,
        EndDate: row.planning_end ? new Date(row.planning_end) : null,
        Metrics: metrics,
        TotalScore: totalScore,
      };
    });

    const plannedEndDate = scheduleRow.planned_end ? new Date(scheduleRow.planned_end) : null;
    const actualEndDate = scheduleRow.actual_end ? new Date(scheduleRow.actual_end) : null;
    const diffDays = parseNullableNumber(scheduleRow.diff_days);

    let scheduleScore = 0;
    if (diffDays !== null) {
      if (diffDays < 0) scheduleScore = Math.abs(diffDays) * 2;
      else if (diffDays === 0) scheduleScore = 1;
      else scheduleScore = -diffDays;
    }

    const totalScore = dates.reduce((sum, d) => sum + d.TotalScore, 0) + scheduleScore;
    const projectName = scheduleRow.project_name ?? rows[0]?.project_name ?? null;

    return {
      ProjectId: Number(scheduleRow.project_id ?? projectId),
      ProjectName: projectName ?? null,
      PlannedEndDate: plannedEndDate,
      ActualEndDate: actualEndDate,
      ScheduleScore: scheduleScore,
      TotalScore: totalScore,
      Dates: dates,
    };
  }

  async getProjectPlanningKpiTotal(projectId: number): Promise<number> {
    const report = await this.getProjectPlanningKpiReport(projectId);
    return report.TotalScore;
  }

  async getChantierManagerKpiTotal(personnelId: number): Promise<number> {
    const report = await this.getChantierManagerKpiReport(personnelId);
    if (!report) return 0;
    return report.AverageKpi;
  }

  async getChantierManagerKpiReport(personnelId: number): Promise<ChantierManagerKpiReportDto | null> {
    const managerRow = (
      await this.dataSource.query(
        `
        select
          pr."Id" as manager_id,
          pr."ImageSrc" as manager_image_src,
          pr."Name" as manager_name,
          pr."Family" as manager_family,
          pr."IdentityNumber" as manager_identity_number,
          pr."WorkStartDate" as manager_work_start_date,
          pr."WorkEndDate" as manager_work_end_date,
          pr."InsuranceNumber" as manager_insurance_number,
          pr."Sex" as manager_sex,
          pr."SalaryType" as manager_salary_type,
          pr."SalaryAccrualMethod" as manager_salary_accrual_method,
          pr."Salary"::numeric as manager_salary,
          pr."Group" as manager_group,
          pr."BirthPlace" as manager_birth_place,
          pr."BirthDate" as manager_birth_date,
          pr."MaritalStatus" as manager_marital_status,
          pr."FatherName" as manager_father_name,
          pr."BloodType" as manager_blood_type,
          pr."Address" as manager_address,
          pr."EducationStatus" as manager_education_status,
          pr."IBAN" as manager_iban,
          pr."Telephone" as manager_telephone,
          pr."Mobile" as manager_mobile,
          pr."HasISG" as manager_has_isg,
          pr."Attachments" as manager_attachments,
          pr."RecordStatus" as manager_record_status,
          pr."CreateAt" as manager_create_at,
          pwp."PositionId" as manager_position_id,
          pos."Title" as manager_position_title
        from "Personnels" pr
        left join lateral (
          select pwp2."PositionId"
          from "PersonnelWorkPlaces" pwp2
          where pwp2."PersonnelId" = pr."Id"
            and pwp2."Type" = 1
            and pwp2."RecordStatus" = 0
            and pwp2."EndDate" is null
          order by pwp2."StartDate" desc, pwp2."Id" desc
          limit 1
        ) pwp on true
        left join "Positions" pos
          on pos."Id" = pwp."PositionId"
        where pr."Id" = $1
        limit 1
        `,
        [personnelId],
      )
    )[0];

    if (!managerRow) return null;

    const projectRows = await this.dataSource.query(
      `
      select distinct
        p."Id" as project_id,
        p."Code" as project_code,
        p."Title" as project_title,
        p."Type" as project_type,
        p."StartDate" as project_start_date,
        p."EndDate" as project_end_date,
        w."Id" as workhouse_id,
        w."Code" as workhouse_code,
        w."Name" as workhouse_name,
        wrk."Id" as work_id,
        wrk."Title" as work_title,
        th."Id" as tender_id,
        th."Title" as tender_title
      from "Projects" p
      inner join "PersonnelWorkPlaces" pwp
        on pwp."PlaceId" = p."WorkhouseId"
      left join "Workhouses" w
        on w."Id" = p."WorkhouseId"
      left join "Works" wrk
        on wrk."Id" = w."WorkId"
      left join "TenderHeaders" th
        on th."Id" = wrk."TenderId"
      where pwp."PersonnelId" = $1
        and pwp."Type" = 1
        and pwp."PositionId" = 1
        and pwp."RecordStatus" = 0
        and pwp."EndDate" is null
      order by p."Id" asc
      `,
      [personnelId],
    );

    const parseNullableNumber = (value: unknown): number | null => {
      if (value === null || value === undefined) return null;
      const num = Number(value);
      return Number.isFinite(num) ? num : null;
    };

    const manager: ChantierManagerInfoDto = {
      Id: Number(managerRow.manager_id),
      ImageSrc: managerRow.manager_image_src ?? null,
      Name: managerRow.manager_name,
      Family: managerRow.manager_family,
      IdentityNumber: managerRow.manager_identity_number,
      WorkStartDate: new Date(managerRow.manager_work_start_date),
      WorkEndDate: managerRow.manager_work_end_date ? new Date(managerRow.manager_work_end_date) : null,
      InsuranceNumber: managerRow.manager_insurance_number ?? null,
      Sex: Number(managerRow.manager_sex),
      SalaryType: Number(managerRow.manager_salary_type),
      SalaryAccrualMethod: Number(managerRow.manager_salary_accrual_method),
      Salary: parseNullableNumber(managerRow.manager_salary),
      Group: Number(managerRow.manager_group),
      BirthPlace: managerRow.manager_birth_place ?? null,
      BirthDate: new Date(managerRow.manager_birth_date),
      MaritalStatus: parseNullableNumber(managerRow.manager_marital_status),
      FatherName: managerRow.manager_father_name,
      BloodType: parseNullableNumber(managerRow.manager_blood_type),
      Address: managerRow.manager_address,
      EducationStatus: Number(managerRow.manager_education_status),
      IBAN: managerRow.manager_iban ?? null,
      Telephone: managerRow.manager_telephone ?? null,
      Mobile: managerRow.manager_mobile ?? null,
      HasISG: managerRow.manager_has_isg ?? null,
      Attachments: managerRow.manager_attachments ?? null,
      RecordStatus: Number(managerRow.manager_record_status),
      CreateAt: new Date(managerRow.manager_create_at),
      PositionId: parseNullableNumber(managerRow.manager_position_id),
      PositionTitle: managerRow.manager_position_title ?? null,
    };

    const projects: ChantierManagerProjectKpiDto[] = await Promise.all(
      projectRows.map(async (row: any) => {
        const projectKpi = await this.getProjectPlanningKpiTotal(Number(row.project_id));
        return {
          ProjectId: Number(row.project_id),
          ProjectCode: row.project_code ?? null,
          ProjectTitle: row.project_title,
          ProjectType: parseNullableNumber(row.project_type),
          ProjectStartDate: row.project_start_date ? new Date(row.project_start_date) : null,
          ProjectEndDate: row.project_end_date ? new Date(row.project_end_date) : null,
          WorkhouseId: parseNullableNumber(row.workhouse_id),
          WorkhouseCode: row.workhouse_code ?? null,
          WorkhouseName: row.workhouse_name ?? null,
          WorkId: parseNullableNumber(row.work_id),
          WorkTitle: row.work_title ?? null,
          TenderId: parseNullableNumber(row.tender_id),
          TenderTitle: row.tender_title ?? null,
          ProjectKpi: Number.isFinite(projectKpi) ? projectKpi : 0,
        };
      }),
    );

    const totalKpi = projects.reduce((sum, p) => sum + p.ProjectKpi, 0);
    const projectCount = projects.length;
    const averageKpi = projectCount > 0 ? Number((totalKpi / projectCount).toFixed(2)) : 0;

    return {
      Manager: manager,
      ProjectCount: projectCount,
      TotalKpi: Number(totalKpi.toFixed(2)),
      AverageKpi: averageKpi,
      Projects: projects,
    };
  }

}
