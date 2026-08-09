import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, Repository } from 'typeorm';
import { Projects } from 'src/domain/entities/Projects';
import { ProjectOverallProgressDto, ProjectProgressDto } from 'src/presentation/dtos/project/project-dto';

@Injectable()
export class ProjectsRepository extends BaseRepository<Projects> {
  constructor(@InjectRepository(Projects) repository: Repository<Projects>, private readonly dataSource: DataSource) {
    super(repository);
  }

  async getProjectProgress(projectId: number): Promise<ProjectProgressDto[]> {
    const query = `
      WITH targets AS (
        SELECT
          pp."ProjectId" AS project_id,
          SUM(COALESCE((pp."KaziYapilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_kazi,
          SUM(COALESCE((pp."AltMontajiYapilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_alt_montaj,
          SUM(COALESCE((pp."BetonAtilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_beton_atilan,
          SUM(COALESCE((pp."UstMontajiOrulenDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ust_orulen,
          SUM(COALESCE((pp."UstMontajiKurulanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ust_kurulan,
          SUM(COALESCE((pp."DikilenBetonDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_dikilen_beton,
          SUM(COALESCE((pp."IletkenCekilenDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_iletken,
          SUM(COALESCE((pp."AyiriciTakilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ayirici,
          SUM(COALESCE((pp."DikilenAydinlatmaDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_aydinlatma,
          SUM(COALESCE((pp."KabloKanali"->>'estimatedNumber')::numeric, 0)) AS tgt_kablo_kanali,
          SUM(COALESCE((pp."CekilenKabloMiktari"->>'estimatedNumber')::numeric, 0)) AS tgt_kablo_metre,
          SUM(COALESCE((pp."Transformator"->>'estimatedNumber')::numeric, 0)) AS tgt_transfo,
          SUM(COALESCE((pp."DagitimPanosu"->>'estimatedNumber')::numeric, 0)) AS tgt_dagitim_pano,
          SUM(COALESCE((pp."SahaDagıtımKutusu"->>'estimatedNumber')::numeric, 0)) AS tgt_saha_kutu,
          SUM(COALESCE((pp."BetonKosk"->>'estimatedNumber')::numeric, 0)) AS tgt_beton_kosk,
          SUM(COALESCE((pp."Hucre"->>'estimatedNumber')::numeric, 0)) AS tgt_hucre
        FROM "ProjectPlanings" pp
        GROUP BY pp."ProjectId"
      ),
      daily_actual AS (
        SELECT
          pp."ProjectId" AS project_id,
          (ppid."StartDate" AT TIME ZONE 'Europe/Istanbul')::date AS day_local,
          SUM(CASE WHEN ppi."KaziYapilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kazi,
          SUM(CASE WHEN ppi."AltMontajiYapilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_alt_montaj,
          SUM(CASE WHEN ppi."BetonAtilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_beton_atilan,
          SUM(CASE WHEN ppi."UstMontajiOrulenDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ust_orulen,
          SUM(CASE WHEN ppi."UstMontajiKurulanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ust_kurulan,
          SUM(CASE WHEN ppi."DikilenBetonDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_dikilen_beton,
          SUM(CASE WHEN ppi."IletkenCekilenDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_iletken,
          SUM(CASE WHEN ppi."AyiriciTakilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ayirici,
          SUM(CASE WHEN ppi."DikilenAydinlatmaDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_aydinlatma,
          SUM(CASE WHEN ppi."KabloKanaliDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kablo_kanali,
          SUM(CASE WHEN ppi."CekilenKabloMiktari" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kablo_metre,
          SUM(CASE WHEN ppi."TransformatorDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_transfo,
          SUM(CASE WHEN ppi."DagitimPanosuDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_dagitim_pano,
          SUM(CASE WHEN ppi."SahaDagitimKutusuDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_saha_kutu,
          SUM(CASE WHEN ppi."BetonKoskDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_beton_kosk,
          SUM(CASE WHEN ppi."HucreDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_hucre
        FROM "ProjectPlanningImplementationDates" ppid
        JOIN "ProjectPlanings" pp
          ON pp."Id" = ppid."ProjectPlanningId"
        LEFT JOIN "ProjectPlanningImplementation" ppi
          ON ppi."ProjectPlanningImplementationDateId" = ppid."Id"
        GROUP BY pp."ProjectId", day_local
      ),
      calc_base AS (
        SELECT
          p."Id" AS project_id,
          p."Title" AS project_name,
          d.day_local AS day_local,
          (
            COALESCE(d.act_kazi,0)::numeric + COALESCE(d.act_alt_montaj,0)::numeric + COALESCE(d.act_beton_atilan,0)::numeric +
            COALESCE(d.act_ust_orulen,0)::numeric + COALESCE(d.act_ust_kurulan,0)::numeric + COALESCE(d.act_dikilen_beton,0)::numeric +
            COALESCE(d.act_iletken,0)::numeric + COALESCE(d.act_ayirici,0)::numeric + COALESCE(d.act_aydinlatma,0)::numeric +
            COALESCE(d.act_kablo_kanali,0)::numeric + COALESCE(d.act_transfo,0)::numeric + COALESCE(d.act_dagitim_pano,0)::numeric +
            COALESCE(d.act_saha_kutu,0)::numeric + COALESCE(d.act_beton_kosk,0)::numeric + COALESCE(d.act_hucre,0)::numeric
          ) AS daily_actual_total,
          (
            COALESCE(t.tgt_kazi,0)::numeric + COALESCE(t.tgt_alt_montaj,0)::numeric + COALESCE(t.tgt_beton_atilan,0)::numeric +
            COALESCE(t.tgt_ust_orulen,0)::numeric + COALESCE(t.tgt_ust_kurulan,0)::numeric + COALESCE(t.tgt_dikilen_beton,0)::numeric +
            COALESCE(t.tgt_iletken,0)::numeric + COALESCE(t.tgt_ayirici,0)::numeric + COALESCE(t.tgt_aydinlatma,0)::numeric +
            COALESCE(t.tgt_kablo_kanali,0)::numeric + COALESCE(t.tgt_transfo,0)::numeric + COALESCE(t.tgt_dagitim_pano,0)::numeric +
            COALESCE(t.tgt_saha_kutu,0)::numeric + COALESCE(t.tgt_beton_kosk,0)::numeric + COALESCE(t.tgt_hucre,0)::numeric
          ) AS target_total
        FROM daily_actual d
        JOIN targets t ON t.project_id = d.project_id
        JOIN "Projects" p ON p."Id" = d.project_id
        WHERE p."Id" = $1
      ),
      calc AS (
        SELECT
          project_id,
          project_name,
          day_local,
          daily_actual_total,
          target_total,
          SUM(daily_actual_total) OVER (PARTITION BY project_id ORDER BY day_local) AS cumulative_actual_total
        FROM calc_base
      )
      SELECT
        project_id AS "ProjectId",
        project_name AS "ProjectName",
        day_local AS "Day",
        ROUND(100 * COALESCE(cumulative_actual_total / NULLIF(target_total, 0), 0), 10) AS "PctOverall",
        ROUND(100 * COALESCE(daily_actual_total / NULLIF(target_total, 0), 0), 10) AS "PctDaily"
      FROM calc
      ORDER BY "Day";
    `;

    return await this.dataSource.query(query, [projectId]);
  }

  async getProjectsOverallProgress(): Promise<ProjectOverallProgressDto[]> {
    const query = `
      WITH targets AS (
        SELECT
          pp."ProjectId" AS project_id,
          SUM(COALESCE((pp."KaziYapilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_kazi,
          SUM(COALESCE((pp."AltMontajiYapilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_alt_montaj,
          SUM(COALESCE((pp."BetonAtilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_beton_atilan,
          SUM(COALESCE((pp."UstMontajiOrulenDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ust_orulen,
          SUM(COALESCE((pp."UstMontajiKurulanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ust_kurulan,
          SUM(COALESCE((pp."DikilenBetonDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_dikilen_beton,
          SUM(COALESCE((pp."IletkenCekilenDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_iletken,
          SUM(COALESCE((pp."AyiriciTakilanDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_ayirici,
          SUM(COALESCE((pp."DikilenAydinlatmaDirekSayisi"->>'estimatedNumber')::numeric, 0)) AS tgt_aydinlatma,
          SUM(COALESCE((pp."KabloKanali"->>'estimatedNumber')::numeric, 0)) AS tgt_kablo_kanali,
          SUM(COALESCE((pp."CekilenKabloMiktari"->>'estimatedNumber')::numeric, 0)) AS tgt_kablo_metre,
          SUM(COALESCE((pp."Transformator"->>'estimatedNumber')::numeric, 0)) AS tgt_transfo,
          SUM(COALESCE((pp."DagitimPanosu"->>'estimatedNumber')::numeric, 0)) AS tgt_dagitim_pano,
          SUM(COALESCE((pp."SahaDagıtımKutusu"->>'estimatedNumber')::numeric, 0)) AS tgt_saha_kutu,
          SUM(COALESCE((pp."BetonKosk"->>'estimatedNumber')::numeric, 0)) AS tgt_beton_kosk,
          SUM(COALESCE((pp."Hucre"->>'estimatedNumber')::numeric, 0)) AS tgt_hucre
        FROM "ProjectPlanings" pp
        GROUP BY pp."ProjectId"
      ),
      actuals AS (
        SELECT
          pp."ProjectId" AS project_id,
          SUM(CASE WHEN ppi."KaziYapilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kazi,
          SUM(CASE WHEN ppi."AltMontajiYapilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_alt_montaj,
          SUM(CASE WHEN ppi."BetonAtilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_beton_atilan,
          SUM(CASE WHEN ppi."UstMontajiOrulenDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ust_orulen,
          SUM(CASE WHEN ppi."UstMontajiKurulanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ust_kurulan,
          SUM(CASE WHEN ppi."DikilenBetonDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_dikilen_beton,
          SUM(CASE WHEN ppi."IletkenCekilenDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_iletken,
          SUM(CASE WHEN ppi."AyiriciTakilanDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_ayirici,
          SUM(CASE WHEN ppi."DikilenAydinlatmaDirekDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_aydinlatma,
          SUM(CASE WHEN ppi."KabloKanaliDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kablo_kanali,
          SUM(CASE WHEN ppi."CekilenKabloMiktari" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_kablo_metre,
          SUM(CASE WHEN ppi."TransformatorDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_transfo,
          SUM(CASE WHEN ppi."DagitimPanosuDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_dagitim_pano,
          SUM(CASE WHEN ppi."SahaDagitimKutusuDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_saha_kutu,
          SUM(CASE WHEN ppi."BetonKoskDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_beton_kosk,
          SUM(CASE WHEN ppi."HucreDurumu" IS NOT NULL THEN 1 ELSE 0 END)::numeric AS act_hucre
        FROM "ProjectPlanings" pp
        LEFT JOIN "ProjectPlanningImplementationDates" ppid
          ON ppid."ProjectPlanningId" = pp."Id"
        LEFT JOIN "ProjectPlanningImplementation" ppi
          ON ppi."ProjectPlanningImplementationDateId" = ppid."Id"
        GROUP BY pp."ProjectId"
      ),
      totals AS (
        SELECT
          p."Id" AS project_id,
          p."Title" AS project_name,
          p."Code" AS project_code,
          NULLIF(TRIM(CONCAT(per."Name", ' ', per."Family")), '') AS workhouse_manager,
          (
            COALESCE(a.act_kazi,0)::numeric + COALESCE(a.act_alt_montaj,0)::numeric + COALESCE(a.act_beton_atilan,0)::numeric +
            COALESCE(a.act_ust_orulen,0)::numeric + COALESCE(a.act_ust_kurulan,0)::numeric + COALESCE(a.act_dikilen_beton,0)::numeric +
            COALESCE(a.act_iletken,0)::numeric + COALESCE(a.act_ayirici,0)::numeric + COALESCE(a.act_aydinlatma,0)::numeric +
            COALESCE(a.act_kablo_kanali,0)::numeric + COALESCE(a.act_transfo,0)::numeric + COALESCE(a.act_dagitim_pano,0)::numeric +
            COALESCE(a.act_saha_kutu,0)::numeric + COALESCE(a.act_beton_kosk,0)::numeric + COALESCE(a.act_hucre,0)::numeric
          ) AS actual_total,
          (
            COALESCE(t.tgt_kazi,0)::numeric + COALESCE(t.tgt_alt_montaj,0)::numeric + COALESCE(t.tgt_beton_atilan,0)::numeric +
            COALESCE(t.tgt_ust_orulen,0)::numeric + COALESCE(t.tgt_ust_kurulan,0)::numeric + COALESCE(t.tgt_dikilen_beton,0)::numeric +
            COALESCE(t.tgt_iletken,0)::numeric + COALESCE(t.tgt_ayirici,0)::numeric + COALESCE(t.tgt_aydinlatma,0)::numeric +
            COALESCE(t.tgt_kablo_kanali,0)::numeric + COALESCE(t.tgt_transfo,0)::numeric + COALESCE(t.tgt_dagitim_pano,0)::numeric +
            COALESCE(t.tgt_saha_kutu,0)::numeric + COALESCE(t.tgt_beton_kosk,0)::numeric + COALESCE(t.tgt_hucre,0)::numeric
          ) AS target_total
        FROM "Projects" p
        LEFT JOIN "Workhouses" w ON w."Id" = p."WorkhouseId"
        LEFT JOIN LATERAL (
          SELECT pr."Name", pr."Family"
          FROM "PersonnelWorkPlaces" pwp
          INNER JOIN "Personnels" pr ON pwp."PersonnelId" = pr."Id"
          WHERE pwp."PlaceId" = w."Id"
            AND pwp."Type" = 1
            AND pwp."PositionId" = 1
            AND pwp."RecordStatus" = 0
            AND pwp."EndDate" IS NULL
          ORDER BY pwp."StartDate" DESC, pwp."Id" DESC
          LIMIT 1
        ) per ON TRUE
        LEFT JOIN targets t ON t.project_id = p."Id"
        LEFT JOIN actuals a ON a.project_id = p."Id"
      )
      SELECT
        project_id AS "ProjectId",
        project_name AS "ProjectName",
        project_code AS "ProjectCode",
        workhouse_manager AS "WorkhouseManager",
        ROUND(100 * COALESCE(actual_total / NULLIF(target_total, 0), 0), 10) AS "PctOverall"
      FROM totals
      ORDER BY "ProjectId";
    `;

    return await this.dataSource.query(query);
  }
}
