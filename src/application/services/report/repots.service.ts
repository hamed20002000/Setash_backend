import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { promises } from 'dns';
import { DispatchFilterDto, GetFilteredDataResponseDto } from 'src/presentation/dtos/report/betonReport-dto';
import { CarFuelFilterDto, CarFuelListResponseDto } from 'src/presentation/dtos/report/carFuel-dto';
import { CourseReportFilterDto, CourseReportResponseDto } from 'src/presentation/dtos/report/course_filter';
import { DashboardFinancialFilterDto, DashboardFinancialStatsDto } from 'src/presentation/dtos/report/dashboard-financial-stats.dto';
import { DashboardStatsDto } from 'src/presentation/dtos/report/dashboard-stats.dto';
import { PersonnelWorkplaceFilterDto, PersonnelWorkplaceListResponseDto } from 'src/presentation/dtos/report/personnel-workplace-filter.dto';
import { ProjectUsedItemReportDto } from 'src/presentation/dtos/report/project-used-item.dto';
import { TenderFlowFilterDto, TenderFlowForProjectListResponseDto, TenderFlowItemForProjectDto, TenderFlowListResponseDto } from 'src/presentation/dtos/report/TenderFlow-dto';
import { WorkhouseStatDto } from 'src/presentation/dtos/report/workhouse-stat.dto';
import { DataSource } from 'typeorm';


@Injectable()
export class ReportService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
  ) { }

  async getBetonFilteredData(dto: DispatchFilterDto): Promise<GetFilteredDataResponseDto> {
    const {
      docNumber,
      fromDate,
      toDate,
      projectId,
      workhouseId,

      minQuantity,
      maxQuantity,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;
    var itemId = 1;
    // --------------------------
    //  ساخت WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (docNumber) where.push(`sdh."Code" ILIKE '%${docNumber}%'`);
    if (projectId) where.push(`p."Id" = ${projectId}`);
    if (workhouseId) where.push(`w."Id" = ${workhouseId}`);
    if (itemId) where.push(`i."Id" = ${itemId}`);
    if (fromDate) where.push(`sdh."DocDate" >= '${fromDate}'`);
    if (toDate) where.push(`sdh."DocDate" <= '${toDate}'`);
    if (minQuantity) where.push(`sdd."Quantity" >= ${minQuantity}`);
    if (maxQuantity) where.push(`sdd."Quantity" <= ${maxQuantity}`);

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // --------------------------
    //   Count Query
    // --------------------------
    const countQuery = `
      SELECT COUNT(*)
      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"

      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"

      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id

      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"

      -- قیمت مشابه روز
      LEFT JOIN LATERAL (
        SELECT id."Price",id."DiscountAmount"
        FROM "InvoiceDetails" id
        INNER JOIN "InvoiceHeaders" ih ON ih."Id" = id."InvoiceHeaderId"
        WHERE id."ItemId" = i."Id"
          AND DATE(ih."DocDate") = DATE(sdh."DocDate")
        ORDER BY ih."CreateAt" DESC
        LIMIT 1
      ) AS price_row ON TRUE

      ${whereClause}
    `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);

    // --------------------------------
    // SUM Query (totalPrice)
    // --------------------------------
    const sumQuery = `
      SELECT SUM(subquery.total) AS "TotalAmount"
      FROM (SELECT       
        (sdd."Quantity" * (
    COALESCE(price_row."Price"::numeric, 0)
    - COALESCE(price_row."DiscountAmount"::numeric, 0)
)) AS total

      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"

      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"

      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id

      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"

      -- قیمت مشابه روز
      LEFT JOIN LATERAL (
        SELECT id."Price",id."DiscountAmount"
        FROM "InvoiceDetails" id
        INNER JOIN "InvoiceHeaders" ih ON ih."Id" = id."InvoiceHeaderId"
        WHERE id."ItemId" = i."Id"
          AND DATE(ih."DocDate") = DATE(sdh."DocDate")
        ORDER BY ih."CreateAt" DESC
        LIMIT 1
      ) AS price_row ON TRUE

      ${whereClause}) AS subquery 
    `;

    const totalPrice = Number((await this.db.query(sumQuery))[0].TotalAmount || 0);


    // --------------------------
    // Query اصلی با قیمت
    // --------------------------

    const query = `
      SELECT
        w."Id" AS workhouse_id,
        w."Code" AS workhouse_code,
        w."Name" AS workhousen_name,

        sdh."DocDate" as tarih,

        p."Code" as proje_kodu,
        p."Title" as bolge_adi,
        CONCAT(p2."Name", ' ', p2."Family") as ekip_adi,

        r2."Name" as il,
        r."Name" as ilce,

        p."Title" as proje_adi,

        CASE 
          WHEN p."Type" = 0 THEN 'AG'
          WHEN p."Type" = 1 THEN 'OG'
          WHEN p."Type" = 2 THEN 'TesisKet'
        END as is_turu,

        i."Code" as itemcode,
        i."Name" as itemname,
        iu."Title" as unit,

        sdd."Quantity" AS quantity,

        price_row."Price" AS price,
        price_row."DiscountAmount" AS discount,
        (sdd."Quantity" * (price_row."Price" - price_row."DiscountAmount")) AS total

      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"

      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"

      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id

      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"

      -- قیمت مشابه روز
      LEFT JOIN LATERAL (
        SELECT id."Price",id."DiscountAmount"
        FROM "InvoiceDetails" id
        INNER JOIN "InvoiceHeaders" ih ON ih."Id" = id."InvoiceHeaderId"
        WHERE id."ItemId" = i."Id"
          AND DATE(ih."DocDate") = DATE(sdh."DocDate")
        ORDER BY ih."CreateAt" DESC
        LIMIT 1
      ) AS price_row ON TRUE

      ${whereClause}
      ORDER BY sdh."DocDate" DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const data = await this.db.query(query);

    return {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      totalPrice,
      data,
    };
  }

  async getOtherItemFilteredData(dto: DispatchFilterDto): Promise<GetFilteredDataResponseDto> {
    const {
      docNumber,
      fromDate,
      toDate,
      projectId,
      workhouseId,
      itemId,
      minQuantity,
      maxQuantity,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    //  ساخت WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (docNumber) where.push(`sdh."Code" ILIKE '%${docNumber}%'`);
    if (projectId) where.push(`p."Id" = ${projectId}`);
    if (workhouseId) where.push(`w."Id" = ${workhouseId}`);
    if (itemId) where.push(`i."Id" = ${itemId}`);
    if (itemId) where.push(`i."Id" <> 1`);
    if (fromDate) where.push(`sdh."DocDate" >= '${fromDate}'`);
    if (toDate) where.push(`sdh."DocDate" <= '${toDate}'`);
    if (minQuantity) where.push(`sdd."Quantity" >= ${minQuantity}`);
    if (maxQuantity) where.push(`sdd."Quantity" <= ${maxQuantity}`);

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // --------------------------
    //   Count Query
    // --------------------------
    const countQuery = `
      SELECT COUNT(*)
      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"

      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"

      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id

      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"
      -- قیمت مشابه روز
     LEFT JOIN LATERAL (
    SELECT 
        id."Price",
		id."DiscountPercent",
        id."DiscountAmount",
		ih."InvoiceNo"
    FROM "InvoiceDetails" id
    INNER JOIN "InvoiceHeaders" ih 
        ON ih."Id" = id."InvoiceHeaderId"
    WHERE id."ItemId" = i."Id"
      AND ih."DocDate" <= sdh."DocDate"
    ORDER BY 
        ih."DocDate" DESC,
        ih."CreateAt" DESC
    LIMIT 1
) AS price_row ON TRUE

      ${whereClause}
    `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);

    // --------------------------------
    // SUM Query (totalPrice)
    // --------------------------------
    const sumQuery = `
      SELECT SUM(subquery.total) AS "TotalAmount"
      FROM (SELECT       
        (sdd."Quantity" * (
    COALESCE(price_row."Price"::numeric, 0)
    - COALESCE(price_row."DiscountAmount"::numeric, 0)
)) AS total

      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"

      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"

      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id

      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"

 -- قیمت مشابه روز
     LEFT JOIN LATERAL (
    SELECT 
        id."Price",
		id."DiscountPercent",
        id."DiscountAmount",
		ih."InvoiceNo"
    FROM "InvoiceDetails" id
    INNER JOIN "InvoiceHeaders" ih 
        ON ih."Id" = id."InvoiceHeaderId"
    WHERE id."ItemId" = i."Id"
      AND ih."DocDate" <= sdh."DocDate"
    ORDER BY 
        ih."DocDate" DESC,
        ih."CreateAt" DESC
    LIMIT 1
) AS price_row ON TRUE

      ${whereClause}) AS subquery 
    `;

    const totalPrice = Number((await this.db.query(sumQuery))[0].TotalAmount || 0);


    // --------------------------
    // Query اصلی با قیمت
    // --------------------------

    const query = `
      SELECT w."Id" AS workhouse_id,
        w."Code" AS workhouse_code,
        w."Name" AS workhousen_name,
        sdh."DocDate" as tarih,
        p."Code" as proje_kodu,
        p."Title" as bolge_adi,
        CONCAT(p2."Name", ' ', p2."Family") as ekip_adi,
        r2."Name" as il,
        r."Name" as ilce,
        p."Title" as proje_adi,
        CASE 
          WHEN p."Type" = 0 THEN 'AG'
          WHEN p."Type" = 1 THEN 'OG'
          WHEN p."Type" = 2 THEN 'TesisKet'
        END as is_turu,
        i."Code" as itemcode,
        i."Name" as itemname,
        iu."Title" as unit,
        sdd."Quantity" AS quantity,
		price_row."InvoiceNo" invoice_no,
        price_row."Price" AS price,
		price_row."DiscountPercent" as discount_percent,
        price_row."DiscountAmount" AS discount,
        (sdd."Quantity" * (price_row."Price" - price_row."DiscountAmount")) AS total
      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd 
        ON sdh."Id" = sdd."StoreDispatchHeadersId"
      inner JOIN "Projects" p ON sdh."ProjectId" = p."Id"
       left join "PersonnelWorkPlaces" pwp on
	p."Id" = pwp."PlaceId"
	and pwp."EndDate" is null
	and pwp."PositionId" = 1	
	left join "Personnels" p2 on
	pwp."PersonnelId" = p2."Id"
      LEFT JOIN "Workhouses" w ON p."WorkhouseId" = w."Id"
      inner join "Works" wrk on wrk."Id" =w."WorkId" 
      LEFT JOIN "Regions" r ON w."RegionId" = r.id
      LEFT JOIN "Regions" r2 ON r."ParentId" = r2.id
      LEFT JOIN "Items" i ON sdd."ItemId" = i."Id"
      LEFT JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"
      -- قیمت مشابه روز
     LEFT JOIN LATERAL (
    SELECT 
        id."Price",
		id."DiscountPercent",
        id."DiscountAmount",
		ih."InvoiceNo"
    FROM "InvoiceDetails" id
    INNER JOIN "InvoiceHeaders" ih 
        ON ih."Id" = id."InvoiceHeaderId"
    WHERE id."ItemId" = i."Id"
      AND ih."DocDate" <= sdh."DocDate"
    ORDER BY 
        ih."DocDate" DESC,
        ih."CreateAt" DESC
    LIMIT 1
) AS price_row ON TRUE

      ${whereClause}
      ORDER BY sdh."DocDate" DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const data = await this.db.query(query);

    return {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      totalPrice,
      data,
    };
  }

  async getFilteredCarFuels(dto: CarFuelFilterDto): Promise<CarFuelListResponseDto> {
    const {
      workhouseId,
      workId,
      personnelId,
      brand,
      model,
      fromDate,
      toDate,

      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    //  WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (workhouseId) where.push(`w."Id" = ${workhouseId}`);
    if (workId) where.push(`w2."Id" = ${workId}`);
    if (personnelId) where.push(`p."Id" = ${personnelId}`);
    if (brand) where.push(`cwd."Brand" ILIKE '%${brand}%'`);
    if (model) where.push(`cwd."Model" ILIKE '%${model}%'`);
    if (fromDate) where.push(`cf."Date" >= '${fromDate}'`);
    if (toDate) where.push(`cf."Date" <= '${toDate}'`);

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // --------------------------
    // Count Query
    // --------------------------
    const countQuery = `
      SELECT COUNT(*)
      FROM "CarFuels" cf
      INNER JOIN "ConsignedCars" cc ON cf."ConsignedCarId" = cc."Id"
      INNER JOIN "CarWarehouseDetails" cwd ON cc."CarWarehouseDetailId" = cwd."Id"
      LEFT JOIN "Workhouses" w ON cc."WorkhouseId" = w."Id"
      LEFT JOIN "Works" w2 ON w."WorkId" = w2."Id"
      INNER JOIN "Personnels" p ON cc."PersonnelId" = p."Id"
      ${whereClause}
    `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);

    // --------------------------
    // Sum Query
    // --------------------------
    const sumQuery = `
      SELECT SUM(coalesce(cf."TotatPrice"::numeric, 0)) AS "TotalAmount"
      FROM "CarFuels" cf
      INNER JOIN "ConsignedCars" cc ON cf."ConsignedCarId" = cc."Id"
      INNER JOIN "CarWarehouseDetails" cwd ON cc."CarWarehouseDetailId" = cwd."Id"
      LEFT JOIN "Workhouses" w ON cc."WorkhouseId" = w."Id"
      LEFT JOIN "Works" w2 ON w."WorkId" = w2."Id"
      INNER JOIN "Personnels" p ON cc."PersonnelId" = p."Id"
      ${whereClause}
    `;

    const totalPrice = Number((await this.db.query(sumQuery))[0].TotalAmount || 0);

    // --------------------------
    // Query اصلی
    // --------------------------
    const query = `
      SELECT
        w2."Id" as work_id,
        w2."Title" as work_title,
        w."Id" as workhouse_id,
        w."Code" as workhouse_code,
        w."Name" as workhouse_name,
        p."Id" as personnel_id,
        p."Name" as personnel_name,
        p."Family" as personnel_family,
        cwd."Brand" as brand,
        cwd."Model" as model,
        cwd."ManufactureDate" as manufacture_date,
        cwd."Plaque" as plaque,
        cf."FuelType" as fuel_type,
        cf."Date" as fuel_date,
        cf."Fee" as fuel_fee,
        cf."Amount" as fuel_amount,
        coalesce(cf."TotatPrice"::numeric, 0) as total_price
  
      FROM "CarFuels" cf
      INNER JOIN "ConsignedCars" cc ON cf."ConsignedCarId" = cc."Id"
      INNER JOIN "CarWarehouseDetails" cwd ON cc."CarWarehouseDetailId" = cwd."Id"
      LEFT JOIN "Workhouses" w ON cc."WorkhouseId" = w."Id"
      LEFT JOIN "Works" w2 ON w."WorkId" = w2."Id"
      INNER JOIN "Personnels" p ON cc."PersonnelId" = p."Id"
  
      ${whereClause}
      ORDER BY cf."Date" DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const data = await this.db.query(query);

    return {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      totalPrice,
      data,
    };
  }


  async getPersonnelWorkplaces(
    dto: PersonnelWorkplaceFilterDto,
  ): Promise<PersonnelWorkplaceListResponseDto> {
    const {
      workhouseId,
      personnelId,
      position,
      identityNumber,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    //  WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (workhouseId)
      where.push(`(w2."Id" = ${workhouseId} OR w."Id" = ${workhouseId})`);
    if (personnelId) where.push(`p."Id" = ${personnelId}`);
    if (position) where.push(`p2."Title" ILIKE '%${position}%'`);
    if (identityNumber)
      where.push(`p."IdentityNumber" ILIKE '%${identityNumber}%'`);

    const whereClause = where.length ? `AND ${where.join(' AND ')}` : '';

    // --------------------------
    // Count Query
    // --------------------------
    const countQuery = `
      SELECT COUNT(*) FROM "PersonnelWorkPlaces" pwp
      LEFT JOIN "Positions" p2 ON pwp."PositionId" = p2."Id"
      LEFT JOIN "Stores" s ON pwp."PlaceId" = s."Id"
      LEFT JOIN "Workhouses" w ON s."WorkhouseId" = w."Id"
      LEFT JOIN "Workhouses" w2 ON pwp."PlaceId" = w2."Id"
      LEFT JOIN "Personnels" p ON pwp."PersonnelId" = p."Id"
      WHERE pwp."Type" IN (1, 2)
      AND pwp."EndDate" IS NULL
      AND pwp."RecordStatus" = 0
      ${whereClause}
    `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);

    // SUM
    const sumQuery = `
  SELECT SUM(coalesce(p."Salary"::numeric, 0)) AS totalSalary
  from (
  select distinct on (p."Id")
  p."Salary"
  FROM "PersonnelWorkPlaces" pwp
  LEFT JOIN "Positions" p2 ON pwp."PositionId" = p2."Id"
  LEFT JOIN "Stores" s ON pwp."PlaceId" = s."Id"
  LEFT JOIN "Workhouses" w ON s."WorkhouseId" = w."Id"
  LEFT JOIN "Workhouses" w2 ON pwp."PlaceId" = w2."Id"
  LEFT JOIN "Personnels" p ON pwp."PersonnelId" = p."Id"
  WHERE pwp."Type" IN (1, 2)
    AND pwp."EndDate" IS NULL
    AND pwp."RecordStatus" = 0
   
    ${whereClause}
    
     order by p."Id", pwp."StartDate" desc) p
`;

    const totalSalary = Number((await this.db.query(sumQuery))[0].totalsalary) || 0;

    // --------------------------
    // Query اصلی
    // --------------------------
    const query = `
      SELECT
        COALESCE(subquery.workhouse_id, subquery.store_workhouse_id) AS workhouse_id,
        COALESCE(subquery.workhouse_code, subquery.store_workhouse_code) AS workhouse_code,
        COALESCE(subquery.workhouse_name, subquery.store_workhouse_name) AS workhouse_name,
        subquery.personnel_id,
        subquery.personnel_name,
        subquery.personnel_identity_number,
        subquery.personnel_position,
        subquery.personnel_salary,
        subquery.personnel_start_date
      FROM (
        SELECT
          w2."Id" AS workhouse_id,
          w2."Code" AS workhouse_code,
          w2."Name" AS workhouse_name,
          w."Id" AS store_workhouse_id,
          w."Code" AS store_workhouse_code,
          w."Name" AS store_workhouse_name,
          p."Id" AS personnel_id,
          CONCAT(p."Name", ' ', p."Family") AS personnel_name,
          p."IdentityNumber" AS personnel_identity_number,
          p2."Title" AS personnel_position,
          p."Salary" AS personnel_salary,
          pwp."StartDate" AS personnel_start_date
        FROM "PersonnelWorkPlaces" pwp
        LEFT JOIN "Positions" p2 ON pwp."PositionId" = p2."Id"
        LEFT JOIN "Stores" s ON pwp."PlaceId" = s."Id"
        LEFT JOIN "Workhouses" w ON s."WorkhouseId" = w."Id"
        LEFT JOIN "Workhouses" w2 ON pwp."PlaceId" = w2."Id"
        LEFT JOIN "Personnels" p ON pwp."PersonnelId" = p."Id"
        WHERE pwp."Type" IN (1, 2)
        AND pwp."EndDate" IS NULL
        AND pwp."RecordStatus" = 0
        ${whereClause}
      ) subquery
      ORDER BY subquery.personnel_name
      LIMIT ${pageSize} OFFSET ${offset};
    `;

    const data = await this.db.query(query);

    return {
      totalCount,
      totalSalary,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      data,
    };
  }

  async getCourseReport(dto: CourseReportFilterDto): Promise<CourseReportResponseDto> {
    const {
      center,
      workhouseId,
      teacherId,
      personnelId,
      fromDate,
      toDate,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    //  WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (workhouseId) where.push(`w."Id" = ${workhouseId}`);
    if (center) where.push(`w."Id" is null`);
    if (teacherId) where.push(`t."Id" = ${teacherId}`);
    if (personnelId) where.push(`p."Id" = ${personnelId}`);
    if (fromDate) where.push(`c."StartDateTime" >= '${fromDate}'`);
    if (toDate) where.push(`c."EndDateTime" <= '${toDate}'`);

    const whereClause = where.length ? `AND ${where.join(" AND ")}` : "";

    // --------------------------
    // Count Query
    // --------------------------
    const countQuery = `
    SELECT COUNT(*) 
    FROM "Courses" c
    INNER JOIN "Teachers" t ON c."TeacherId" = t."Id"
    left JOIN "Workhouses" w ON c."WorkhouseId" = w."Id"
    INNER JOIN "CourseDateTimes" cdt ON c."Id" = cdt."CourseId"
    INNER JOIN "CourseParticipants" cp ON cdt."Id" = cp."CourseDateTimeId"
    INNER JOIN "Personnels" p ON cp."PersonnelId" = p."Id"
    WHERE 1 = 1
    ${whereClause}
  `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);

    // --------------------------
    // Main Query
    // --------------------------
    const query = `
    SELECT 
      w."Id" AS workhouse_id,
      w."Code" AS workhouse_code,
      w."Name" AS workhouse_name,

      c."Title" AS course_title,
      c."Hours" AS course_hours,
      c."ISG" AS course_isg,
      c."StartDateTime" AS course_start_date_time,
      c."EndDateTime" AS course_end_date_time,

      t."Id" AS teacher_id,
      CONCAT(t."Name", ' ', t."Surname") AS teacher_name,
      t."Field" AS teacher_field,

      cdt."StartDateTime" AS class_start_date_time,
      cdt."EndDateTime" AS class_end_date_time,

      p."Id" AS personnel_id,
      CONCAT(p."Name", ' ', p."Family") AS personnel_name,
      p."HasISG" AS personnel_isg

    FROM "Courses" c
    INNER JOIN "Teachers" t ON c."TeacherId" = t."Id"
    left JOIN "Workhouses" w ON c."WorkhouseId" = w."Id"
    INNER JOIN "CourseDateTimes" cdt ON c."Id" = cdt."CourseId"
    INNER JOIN "CourseParticipants" cp ON cdt."Id" = cp."CourseDateTimeId"
    INNER JOIN "Personnels" p ON cp."PersonnelId" = p."Id"

    WHERE 1 = 1
    ${whereClause}
    ORDER BY c."StartDateTime" DESC
    LIMIT ${pageSize} OFFSET ${offset}
  `;

    const data = await this.db.query(query);

    return {
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      success: true,
      data,
    };
  }


  async getTenderFlow(dto: TenderFlowFilterDto): Promise<TenderFlowListResponseDto> {
    const {
      tenderId,
      itemId,
      workhouseId,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    // WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (tenderId) where.push(`th."Id" = ${tenderId}`);
    if (itemId) where.push(`i."Id" = ${itemId}`);
    if (workhouseId) where.push(`w3."Id" = ${workhouseId}`);

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // --------------------------
    // Count Query
    // --------------------------
    const countQuery = `
    SELECT COUNT(*) FROM (
      SELECT 1
      from "TenderHeaders" th 
      inner join "TenderCategories" tc on th."Id" =tc."TenderHeaderId" 
      inner join "TenderDetails" td on tc."Id" =td."TenderCategoryId" and td."ItemId" <>1
      inner join "Items" i on td."ItemId" =i."Id" 
      inner join "ItemUnits" iu on i."UnitId" =iu."Id" 
      inner join "Works" w on w."TenderId" =th."Id" 
      inner join "Networks" n on n."WorkId" =w."Id" 
      inner join "OrderHeaders" oh on n."Id" =oh."NetworkId"
      inner join "OrderDetails" od on oh."Id" =od."OrderHeaderId" 
      inner join "InvoiceDetails" ind on ind."OrderDetailId" =od."Id" 
      inner join "InvoiceHeaders" ih on ih."WorkHouseId" is null and ind."InvoiceHeaderId" =ih."Id" 
      inner join "ReceiptDetails" rd on rd."InvoiceDetailId" =ind."Id" 
      inner join "ReceiptHeaders" rh on rd."ReceiptHeaderId" =rh."Id" 
      inner join "Warehouses" w2 on rh."WarehouseId" =w2."Id" 
      inner join "WarehouseDispatchHeaders" wdh on w2."Id" =wdh."WarehouseId" and wdh."DestinationWarehouseId" is null 
      inner join "WarehouseDispatchDetails" wdd on wdh."Id" =wdd."WarehouseDispatchHeadersId" and wdd."ItemId" =td."ItemId" 
      inner join "StoreReceiptDetails" srd on wdd."Id" =srd."WarehouseDispatchDetailId"  
      inner join "StoreReceiptHeaders" srh on srd."StoreReceiptHeaderId" =srh."Id" 
      inner join "Stores" s on srh."StoreId" =s."Id" 
      inner join "Workhouses" w3 on s."WorkhouseId" =w3."Id" 
      ${whereClause}
    ) x
  `;

    const totalCount = Number((await this.db.query(countQuery))[0].count);


    // --------------------------
    // SUM نمونه
    // مجموع DemontajPrice
    // --------------------------
    const sumQuery = `
    SELECT 
      SUM(coalesce(td."DemontajPrice"::numeric, 0)) AS totalDemontaj,SUM(coalesce(td."MontajPrice"::numeric, 0)) AS totalMontaj,sum(coalesce(td."DemontajMontajPrice"::numeric, 0)) AS totalDemontajMontaj
    from "TenderHeaders" th 
    inner join "TenderCategories" tc on th."Id" =tc."TenderHeaderId" 
    inner join "TenderDetails" td on tc."Id" =td."TenderCategoryId" and td."ItemId" <>1
    inner join "Items" i on td."ItemId" =i."Id" 
    inner join "ItemUnits" iu on i."UnitId" =iu."Id" 
    inner join "Works" w on w."TenderId" =th."Id" 
    inner join "Networks" n on n."WorkId" =w."Id" 
    inner join "OrderHeaders" oh on n."Id" =oh."NetworkId"
    inner join "OrderDetails" od on oh."Id" =od."OrderHeaderId" 
    inner join "InvoiceDetails" ind on ind."OrderDetailId" =od."Id" 
    inner join "InvoiceHeaders" ih on ih."WorkHouseId" is null and ind."InvoiceHeaderId" =ih."Id" 
    inner join "ReceiptDetails" rd on rd."InvoiceDetailId" =ind."Id" 
    inner join "ReceiptHeaders" rh on rd."ReceiptHeaderId" =rh."Id" 
    inner join "Warehouses" w2 on rh."WarehouseId" =w2."Id" 
    inner join "WarehouseDispatchHeaders" wdh on w2."Id" =wdh."WarehouseId" and wdh."DestinationWarehouseId" is null 
    inner join "WarehouseDispatchDetails" wdd on wdh."Id" =wdd."WarehouseDispatchHeadersId" and wdd."ItemId" =td."ItemId" 
    inner join "StoreReceiptDetails" srd on wdd."Id" =srd."WarehouseDispatchDetailId"  
    inner join "StoreReceiptHeaders" srh on srd."StoreReceiptHeaderId" =srh."Id" 
    inner join "Stores" s on srh."StoreId" =s."Id" 
    inner join "Workhouses" w3 on s."WorkhouseId" =w3."Id" 
    ${whereClause}
  `;

    const totalDemontaj = Number((await this.db.query(sumQuery))[0].totaldemontaj) || 0;
    const totalMontaj = Number((await this.db.query(sumQuery))[0].totalmontaj) || 0;
    const totalDemontajMontaj = Number((await this.db.query(sumQuery))[0].totaldemontajmontaj) || 0;

    // --------------------------
    // Query اصلی
    // --------------------------
    const query = `
    SELECT
      th."Title" as ihale_title,
      tc."Title" as ihale_category,
      td."Demontaj", td."DemontajMontaj", td."DemontajMontajPrice", td."DemontajTutari", td."MontajPrice",
       td."DemontajPrice",
      i."Id" as item_id, i."Name" as item_name, iu."Title" as unit,
      w."Id" as work_id, w."Title" as work_name,
      n."Title" as network_title,
      oh."Id" as order_no, oh."DocDate" as order_date, od."ItemId" as order_item_id, od."Price" as order_price, od."Quantity" as order_qty,
      ih."InvoiceNo" as invoice_no, ih."DocDate" as invoice_date, ind."ItemId" invoice_itemId, ind."Price" as invoice_price, ind.quantity as invoice_qty,
      rh."Code" as receipt_no, rh."DocDate" as receipt_date, rd."ItemId" as receipt_item_id, rd."Quantity",
      w2."Code" as warehouse_code, w2."Name" as warehouse_name,
      wdh."Code" as warhouse_dispatch_code, wdh."DocDate" as warhouse_dispatch_date, wdd."ItemId" as warhouse_dispatch_item_id, wdd."Quantity" as warhouse_dispatch_qty,
      srh."Code" as store_receipt_code, srh."DocDate" as store_receipt_date, srd."ItemId" as store_receipt_item_id, srd."Quantity" as store_receipt_qty,
      s."Code" as store_code, s."Name" as store_name,
      w3."Code" as workhouse_code, w3."Name" as workhouse_name
    from "TenderHeaders" th 
    inner join "TenderCategories" tc on th."Id" =tc."TenderHeaderId" 
    inner join "TenderDetails" td on tc."Id" =td."TenderCategoryId" and td."ItemId" <>1
    inner join "Items" i on td."ItemId" =i."Id" 
    inner join "ItemUnits" iu on i."UnitId" =iu."Id" 
    inner join "Works" w on w."TenderId" =th."Id" 
    inner join "Networks" n on n."WorkId" =w."Id" 
    inner join "OrderHeaders" oh on n."Id" =oh."NetworkId"
    inner join "OrderDetails" od on oh."Id" =od."OrderHeaderId" 
    inner join "InvoiceDetails" ind on ind."OrderDetailId" =od."Id" 
    inner join "InvoiceHeaders" ih on ih."WorkHouseId" is null and ind."InvoiceHeaderId" =ih."Id" 
    inner join "ReceiptDetails" rd on rd."InvoiceDetailId" =ind."Id" 
    inner join "ReceiptHeaders" rh on rd."ReceiptHeaderId" =rh."Id" 
    inner join "Warehouses" w2 on rh."WarehouseId" =w2."Id" 
    inner join "WarehouseDispatchHeaders" wdh on w2."Id" =wdh."WarehouseId" and wdh."DestinationWarehouseId" is null 
    inner join "WarehouseDispatchDetails" wdd on wdh."Id" =wdd."WarehouseDispatchHeadersId" and wdd."ItemId" =td."ItemId" 
    inner join "StoreReceiptDetails" srd on wdd."Id" =srd."WarehouseDispatchDetailId"  
    inner join "StoreReceiptHeaders" srh on srd."StoreReceiptHeaderId" =srh."Id" 
    inner join "Stores" s on srh."StoreId" =s."Id" 
    inner join "Workhouses" w3 on s."WorkhouseId" =w3."Id" 
    ${whereClause}
    ORDER BY th."Title", i."Name"
    LIMIT ${pageSize} OFFSET ${offset}
  `;

    const data = await this.db.query(query);

    return {
      totalCount,
      totalDemontaj,
      totalMontaj,
      totalDemontajMontaj,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      success: true,
      data,
    };
  }
  async getTenderFlowForProject(
    dto: TenderFlowFilterDto,
  ): Promise<TenderFlowForProjectListResponseDto> {
    const {
      tenderId,
      itemId,
      workhouseId,
      page = 1,
      pageSize = 20,
    } = dto;

    const offset = (page - 1) * pageSize;

    // --------------------------
    // WHERE داینامیک
    // --------------------------
    const where: string[] = [];

    if (tenderId) where.push(`th."Id" = ${tenderId}`);
    if (itemId) where.push(`sdt."ItemId" = ${itemId}`);
    if (workhouseId) where.push(`w."Id" = ${workhouseId}`);

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // --------------------------
    // Sub Query (Base)
    // --------------------------
    const baseSubQuery = `
    SELECT DISTINCT ON (sdt."Id")
      sdt."Id"             AS sdt_id,
      sdt."ItemId",
      itm."Code"           AS itm_code,
      itm."Name"           AS itm_name,
      sdt."Quantity",
      th."Title"           AS ihale_title,
      tc."Title"           AS ihale_category,
      td."FirmProcuredItemQuantities" AS firm_qty,
      td."OurProcuredItemQuantities"  AS our_qty,
      td."Demontaj",
      td."DemontajMontaj",
      td."DemontajMontajPrice",
      td."DemontajTutari",
      td."MontajPrice",
      td."DemontajPrice"
    FROM "TenderHeaders" th
    INNER JOIN "TenderCategories" tc
      ON th."Id" = tc."TenderHeaderId"
    INNER JOIN "TenderDetails" td
      ON tc."Id" = td."TenderCategoryId"
     AND td."ItemId" <> 1
    INNER JOIN "StoreDispatchDetails" sdt
      ON sdt."ItemId" = td."ItemId"
    INNER JOIN "Items" itm
      ON sdt."ItemId" = itm."Id"
    INNER JOIN "StoreDispatchHeaders" sdh
      ON sdt."StoreDispatchHeadersId" = sdh."Id"
     AND sdh."ProjectId" IS NOT NULL
    INNER JOIN "Stores" s
      ON sdh."StoreId" = s."Id"
    INNER JOIN "Workhouses" w
      ON s."WorkhouseId" = w."Id"
    INNER JOIN "Works" w2
      ON w."WorkId" = w2."Id"
     AND w2."TenderId" = th."Id"
    ${whereClause}
    ORDER BY sdt."Id"
  `;

    // --------------------------
    // Count (بر اساس ItemId)
    // --------------------------
    const countQuery = `
    SELECT COUNT(*) FROM (
      SELECT "ItemId"
      FROM (${baseSubQuery}) x
      GROUP BY "ItemId"
    ) y
  `;

    const totalCount = Number(
      (await this.db.query(countQuery))[0].count,
    );

    // --------------------------
    // SUM ها
    // --------------------------
    const sumQuery = `
    SELECT
      SUM(COALESCE("DemontajPrice"::numeric, 0))        AS "totalDemontaj",
      SUM(COALESCE("MontajPrice"::numeric, 0))          AS "totalMontaj",
      SUM(COALESCE("DemontajMontajPrice"::numeric, 0))  AS "totalDemontajMontaj"
    FROM (
      SELECT
        "ItemId",
        MAX("DemontajPrice")        AS "DemontajPrice",
        MAX("MontajPrice")          AS "MontajPrice",
        MAX("DemontajMontajPrice")  AS "DemontajMontajPrice"
      FROM (${baseSubQuery}) x
      GROUP BY "ItemId"
    ) s
  `;

    const sumResult = (await this.db.query(sumQuery))[0];

    // --------------------------
    // Query اصلی (Data)
    // --------------------------
    const dataQuery = `
    SELECT
      "ItemId"                         AS "itemId",
      MAX(itm_code)                    AS "itmCode",
      MAX(itm_name)                    AS "itmName",
      SUM("Quantity")                  AS "qty",
      MAX(ihale_title)                 AS "ihaleTitle",
      MAX(ihale_category)              AS "ihaleCategory",
      MAX(firm_qty)                    AS "firmQty",
      MAX(our_qty)                     AS "ourQty",
      MAX("Demontaj")                  AS "demontaj",
      MAX("DemontajMontaj")            AS "demontajMontaj",
      MAX("DemontajMontajPrice")       AS "demontajMontajPrice",
      MAX("DemontajTutari")            AS "demontajTutari",
      MAX("MontajPrice")               AS "montajPrice",
      MAX("DemontajPrice")             AS "demontajPrice"
    FROM (${baseSubQuery}) result
    GROUP BY "ItemId"
    ORDER BY "itmName"
    LIMIT ${pageSize} OFFSET ${offset}
  `;

    const data = await this.db.query(dataQuery);

    return {
      totalCount,
      totalDemontaj: Number(sumResult.totalDemontaj) || 0,
      totalMontaj: Number(sumResult.totalMontaj) || 0,
      totalDemontajMontaj: Number(sumResult.totalDemontajMontaj) || 0,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
      success: true,
      data,
    };
  }


  async getDashboardStats(): Promise<DashboardStatsDto> {
    const raw = await this.db.query(`
      SELECT
        (SELECT COUNT(*) FROM "Personnels" p WHERE p."WorkEndDate" IS NULL AND p."RecordStatus" = 0) AS active_personnel,
        (SELECT COUNT(*) FROM "Personnels" p WHERE p."RecordStatus" = 0) AS all_personnel,
        (SELECT COUNT(*) FROM "TenderHeaders" th WHERE th."Status" = 1 AND th."RecordStatus" = 0) AS accepted_tender,
        (SELECT COUNT(*) FROM "TenderHeaders" th WHERE th."RecordStatus" = 0) AS all_tender,
        (SELECT COUNT(*) FROM "Works" w WHERE w."EndDate" IS NULL AND w."RecordStatus" = 0) AS active_works,
        (SELECT COUNT(*) FROM "Works" w WHERE w."RecordStatus" = 0) AS all_works,
        (SELECT COUNT(*) FROM "Projects" p WHERE p."EndDate" IS NULL AND p."RecordStatus" = 0) AS active_projects,
        (SELECT COUNT(*) FROM "Projects" p WHERE p."RecordStatus" = 0) AS all_projects,
        (SELECT COUNT(*) FROM "Workhouses" w WHERE w."EndDate" IS NULL AND w."RecordStatus" = 0) AS active_workhouses,
        (SELECT COUNT(*) FROM "Workhouses" w WHERE w."RecordStatus" = 0) AS all_workhouses,
        (SELECT COUNT(*) FROM "CarWarehouseDetails" cwd WHERE cwd."RecordStatus" = 0) AS car_count,
        (SELECT COUNT(*) FROM "Consignments" c WHERE c."RecordStatus" = 0) AS consignment_count,
        (SELECT COUNT(*) FROM "Courses" c WHERE c."RecordStatus" = 0) AS course_count,
        (select count(*) warhouseItmesCount from (
select
	wt."ItemId" ,
	SUM(
case when wt."Operation" = 0 then wt."Quantity" else 0 end
) -
	SUM(
case when wt."Operation" = 1 then wt."Quantity" else 0 end
) remaining
from
	"WarehouseTransactions" wt
group by
	"ItemId") sunquery
	where sunquery.remaining >0) AS warhouse_items_count,
  (select count(*) storeItmesCount from (
select
	st."ItemId" ,
	SUM(
case when st."Operation" = 0 then st."Quantity" else 0 end
) -
	SUM(
case when st."Operation" = 1 then st."Quantity" else 0 end
) remaining
from
	"StoreTransactions" st 
group by
	"ItemId") sunquery
	where sunquery.remaining >0) AS store_items_count,
    (select count(*) kabullar_count from (
select result.id ,(result.totalmembers-result.totalanswer5 ) countOfImza  from (
select 
    m.Id,
    m.totalMembers,
    coalesce(a.totalAnswer5, 0) as totalAnswer5
from 
    (
        select 
            crcm."ConfirmationProjectReportId" as Id,
            count(crcm."Id") as totalMembers
        from 
            "ConfirmationReportCommiteMember" crcm  
        group by 
            crcm."ConfirmationProjectReportId"
    ) m
left join
    (
        select
            sub."Id",
            coalesce(sum(sub.count), 0) as totalAnswer5
        from
            (
                select
                    cpr."Id",
                    crcma."ConfirmationReportCommiteMemberId",
                    count(crcma."ConfirmationReportCommiteMemberId")
                from
                    "ConfirmationProjectReport" cpr
                    inner join "ConfirmationReportCommiteMember" crcm 
                        on cpr."Id" = crcm."ConfirmationProjectReportId"
                    left join "ConfirmationReportCommiteMemberAnswer" crcma 
                        on crcm."Id" = crcma."ConfirmationReportCommiteMemberId"
                where
                    crcma."Answer" = 5
                group by 
                    cpr."Id",
                    crcma."ConfirmationReportCommiteMemberId"
            ) sub
        group by 
            sub."Id"
    ) a
on m.Id = a."Id"
order by m.Id) result) endresult where endresult.countofimza =0) AS kabullar_count
    `);

    // query(...) returns an array of rows; we expect single row
    const row = raw[0] ?? {};

    // cast/normalize to numbers
    const dto: DashboardStatsDto = {
      active_personnel: Number(row.active_personnel ?? 0),
      all_personnel: Number(row.all_personnel ?? 0),

      accepted_tender: Number(row.accepted_tender ?? 0),
      all_tender: Number(row.all_tender ?? 0),

      active_works: Number(row.active_works ?? 0),
      all_works: Number(row.all_works ?? 0),

      active_projects: Number(row.active_projects ?? 0),
      all_projects: Number(row.all_projects ?? 0),

      active_workhouses: Number(row.active_workhouses ?? 0),
      all_workhouses: Number(row.all_workhouses ?? 0),

      car_count: Number(row.car_count ?? 0),
      consignment_count: Number(row.consignment_count ?? 0),
      course_count: Number(row.course_count ?? 0),
      warhouse_items_count: Number(row.warhouse_items_count ?? 0),
      store_items_count: Number(row.store_items_count ?? 0),
      kabullar_count: Number(row.kabullar_count ?? 0),
    };

    return dto;
  }

  async getDashboardFinancialStats(
    dto: DashboardFinancialFilterDto,
  ): Promise<DashboardFinancialStatsDto> {
    const { tenderId, workId, workhouseId, projectId } = dto;

    const dispatchFilters: string[] = [];
    if (tenderId) dispatchFilters.push(`wrk."TenderId" = ${tenderId}`);
    if (workId) dispatchFilters.push(`wrk."Id" = ${workId}`);
    if (workhouseId) dispatchFilters.push(`w."Id" = ${workhouseId}`);
    if (projectId) dispatchFilters.push(`p."Id" = ${projectId}`);

    const betonWhere = [...dispatchFilters, `sdd."ItemId" = 1`];
    const betonWhereClause = betonWhere.length ? `WHERE ${betonWhere.join(' AND ')}` : '';
    const betonQuery = `
      SELECT
        SUM(COALESCE(sdd."Quantity"::numeric, 0)) AS total_qty,
        SUM(
          COALESCE(sdd."Quantity"::numeric, 0) *
          (COALESCE(price_row."Price"::numeric, 0) - COALESCE(price_row."DiscountAmount"::numeric, 0))
        ) AS total_price
      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd
        ON sdh."Id" = sdd."StoreDispatchHeadersId"
      INNER JOIN "Projects" p
        ON sdh."ProjectId" = p."Id"
      LEFT JOIN "Workhouses" w
        ON p."WorkhouseId" = w."Id"
      INNER JOIN "Works" wrk
        ON wrk."Id" = w."WorkId"
      LEFT JOIN "Items" i
        ON sdd."ItemId" = i."Id"
      LEFT JOIN LATERAL (
        SELECT id."Price", id."DiscountAmount"
        FROM "InvoiceDetails" id
        INNER JOIN "InvoiceHeaders" ih
          ON ih."Id" = id."InvoiceHeaderId"
        WHERE id."ItemId" = i."Id"
          AND DATE(ih."DocDate") = DATE(sdh."DocDate")
        ORDER BY ih."CreateAt" DESC
        LIMIT 1
      ) AS price_row ON TRUE
      ${betonWhereClause}
    `;

    const otherItemsWhere = [...dispatchFilters, `sdd."ItemId" <> 1`];
    const otherItemsWhereClause = otherItemsWhere.length ? `WHERE ${otherItemsWhere.join(' AND ')}` : '';
    const otherItemsQuery = `
      SELECT
        SUM(
          COALESCE(sdd."Quantity"::numeric, 0) *
          (COALESCE(price_row."Price"::numeric, 0) - COALESCE(price_row."DiscountAmount"::numeric, 0))
        ) AS total_price
      FROM "StoreDispatchHeaders" sdh
      LEFT JOIN "StoreDispatchDetails" sdd
        ON sdh."Id" = sdd."StoreDispatchHeadersId"
      INNER JOIN "Projects" p
        ON sdh."ProjectId" = p."Id"
      LEFT JOIN "Workhouses" w
        ON p."WorkhouseId" = w."Id"
      INNER JOIN "Works" wrk
        ON wrk."Id" = w."WorkId"
      LEFT JOIN "Items" i
        ON sdd."ItemId" = i."Id"
      LEFT JOIN LATERAL (
        SELECT id."Price", id."DiscountAmount"
        FROM "InvoiceDetails" id
        INNER JOIN "InvoiceHeaders" ih
          ON ih."Id" = id."InvoiceHeaderId"
        WHERE id."ItemId" = i."Id"
          AND ih."DocDate" <= sdh."DocDate"
        ORDER BY ih."DocDate" DESC, ih."CreateAt" DESC
        LIMIT 1
      ) AS price_row ON TRUE
      ${otherItemsWhereClause}
    `;

    const fuelFilters: string[] = [];
    if (workhouseId) fuelFilters.push(`w."Id" = ${workhouseId}`);
    if (workId) fuelFilters.push(`w2."Id" = ${workId}`);
    if (tenderId) fuelFilters.push(`w2."TenderId" = ${tenderId}`);
    if (projectId)
      fuelFilters.push(
        `EXISTS (SELECT 1 FROM "Projects" p WHERE p."Id" = ${projectId} AND p."WorkhouseId" = COALESCE(w_from_workhouse."Id", w_from_store."Id"))`,
      );
    const fuelWhereClause = fuelFilters.length ? `WHERE ${fuelFilters.join(' AND ')}` : '';
    const fuelQuery = `
       SELECT SUM(coalesce(cf."TotatPrice"::numeric, 0)) AS "TotalAmount"
      FROM "CarFuels" cf
      INNER JOIN "ConsignedCars" cc ON cf."ConsignedCarId" = cc."Id"
      INNER JOIN "CarWarehouseDetails" cwd ON cc."CarWarehouseDetailId" = cwd."Id"
      LEFT JOIN "Workhouses" w ON cc."WorkhouseId" = w."Id"
      LEFT JOIN "Works" w2 ON w."WorkId" = w2."Id"
      INNER JOIN "Personnels" p ON cc."PersonnelId" = p."Id"
      ${fuelWhereClause}
    `;

    const salaryFilters: string[] = [];
    if (workhouseId) salaryFilters.push(`COALESCE(w2."Id", w."Id") = ${workhouseId}`);
    if (workId) salaryFilters.push(`wrk."Id" = ${workId}`);
    if (tenderId) salaryFilters.push(`wrk."TenderId" = ${tenderId}`);
    if (projectId)
      salaryFilters.push(
        `EXISTS (SELECT 1 FROM "Projects" p WHERE p."Id" = ${projectId} AND p."WorkhouseId" = COALESCE(w2."Id", w."Id"))`,
      );
    const salaryWhereClause = salaryFilters.length ? `AND ${salaryFilters.join(' AND ')}` : '';
    const salaryQuery = `
      SELECT SUM(COALESCE(subquery.personnel_salary, 0)) AS total_salary
      FROM (
        SELECT
        distinct on (p."Id")
          w2."Id" AS workhouse_id,
          w."Id" AS store_workhouse_id,
          p."Salary"::numeric AS personnel_salary
        FROM "PersonnelWorkPlaces" pwp
        LEFT JOIN "Stores" s ON pwp."PlaceId" = s."Id"
        LEFT JOIN "Workhouses" w ON s."WorkhouseId" = w."Id"
        LEFT JOIN "Workhouses" w2 ON pwp."PlaceId" = w2."Id"
        LEFT JOIN "Personnels" p ON pwp."PersonnelId" = p."Id"
        LEFT JOIN "Works" wrk ON wrk."Id" = COALESCE(w2."WorkId", w."WorkId")
        WHERE pwp."Type" IN (1, 2)
          AND pwp."EndDate" IS NULL
          AND pwp."RecordStatus" = 0
          ${salaryWhereClause}
      ) subquery
    `;

    const tenderFlowFilters: string[] = [];
    if (tenderId) tenderFlowFilters.push(`th."Id" = ${tenderId}`);
    if (workId) tenderFlowFilters.push(`w."Id" = ${workId}`);
    if (workhouseId) tenderFlowFilters.push(`w3."Id" = ${workhouseId}`);
    if (projectId)
      tenderFlowFilters.push(
        `EXISTS (SELECT 1 FROM "Projects" p WHERE p."Id" = ${projectId} AND p."WorkhouseId" = w3."Id")`,
      );
    const tenderFlowWhereClause = tenderFlowFilters.length
      ? `WHERE ${tenderFlowFilters.join(' AND ')}`
      : '';
    const tenderFlowSumQuery = `
      SELECT
        SUM(COALESCE(td."DemontajPrice"::numeric, 0)) AS total_demontaj,
        SUM(COALESCE(td."MontajPrice"::numeric, 0)) AS total_montaj,
        SUM(COALESCE(td."DemontajMontajPrice"::numeric, 0)) AS total_demontaj_montaj
      FROM "TenderHeaders" th
      INNER JOIN "TenderCategories" tc ON th."Id" = tc."TenderHeaderId"
      INNER JOIN "TenderDetails" td ON tc."Id" = td."TenderCategoryId" AND td."ItemId" <> 1
      INNER JOIN "Items" i ON td."ItemId" = i."Id"
      INNER JOIN "ItemUnits" iu ON i."UnitId" = iu."Id"
      INNER JOIN "Works" w ON w."TenderId" = th."Id"
      INNER JOIN "Networks" n ON n."WorkId" = w."Id"
      INNER JOIN "OrderHeaders" oh ON n."Id" = oh."NetworkId"
      INNER JOIN "OrderDetails" od ON oh."Id" = od."OrderHeaderId"
      INNER JOIN "InvoiceDetails" ind ON ind."OrderDetailId" = od."Id"
      INNER JOIN "InvoiceHeaders" ih ON ih."WorkHouseId" is null AND ind."InvoiceHeaderId" = ih."Id"
      INNER JOIN "ReceiptDetails" rd ON rd."InvoiceDetailId" = ind."Id"
      INNER JOIN "ReceiptHeaders" rh ON rd."ReceiptHeaderId" = rh."Id"
      INNER JOIN "Warehouses" w2 ON rh."WarehouseId" = w2."Id"
      INNER JOIN "WarehouseDispatchHeaders" wdh ON w2."Id" = wdh."WarehouseId" AND wdh."DestinationWarehouseId" is null
      INNER JOIN "WarehouseDispatchDetails" wdd ON wdh."Id" = wdd."WarehouseDispatchHeadersId" AND wdd."ItemId" = td."ItemId"
      INNER JOIN "StoreReceiptDetails" srd ON wdd."Id" = srd."WarehouseDispatchDetailId"
      INNER JOIN "StoreReceiptHeaders" srh ON srd."StoreReceiptHeaderId" = srh."Id"
      INNER JOIN "Stores" s ON srh."StoreId" = s."Id"
      INNER JOIN "Workhouses" w3 ON s."WorkhouseId" = w3."Id"
      ${tenderFlowWhereClause}
    `;

    const betonRow = (await this.db.query(betonQuery))[0] ?? {};
    const otherItemsRow = (await this.db.query(otherItemsQuery))[0] ?? {};
    const fuelRow = (await this.db.query(fuelQuery))[0] ?? {};
    const salaryRow = (await this.db.query(salaryQuery))[0] ?? {};
    const tenderFlowRow = (await this.db.query(tenderFlowSumQuery))[0] ?? {};

    return {
      totalBetonQuantity: Number(betonRow.total_qty ?? 0),
      totalBetonPrice: Number(betonRow.total_price ?? 0),
      totalUsedItemsPrice: Number(otherItemsRow.total_price ?? 0),
      totalFuelPrice: Number(fuelRow.TotalAmount  ?? 0),
      totalPaidSalary: Number(salaryRow.total_salary ?? 0),
      totalMontaj: Number(tenderFlowRow.total_montaj ?? 0),
      totalDemontaj: Number(tenderFlowRow.total_demontaj ?? 0),
      totalDemontajMontaj: Number(tenderFlowRow.total_demontaj_montaj ?? 0),
    };
  }

  async getWorkhouseBetonQuantity() {
    const sql = `
      select
        sub_query.workhouse_id,
        max(sub_query.workhousen_name) as workhousen_name,
        sum(sub_query.quantity) as total_quantity,
        sum(sub_query.total_price) as total_price
      from
      (
        select
          w."Id" as workhouse_id,
          w."Code" as workhouse_code,
          w."Name" as workhousen_name,
          sdd."Quantity" as quantity,
          (
            COALESCE(sdd."Quantity"::numeric, 0) *
            (
              COALESCE(price_row."Price"::numeric, 0) -
              COALESCE(price_row."DiscountAmount"::numeric, 0)
            )
          ) as total_price
        from "StoreDispatchHeaders" sdh
        left join "StoreDispatchDetails" sdd 
            on sdh."Id" = sdd."StoreDispatchHeadersId"
        inner join "Projects" p 
            on sdh."ProjectId" = p."Id"
        left join "Workhouses" w 
            on p."WorkhouseId" = w."Id"
        inner join "Works" wrk 
            on wrk."Id" = w."WorkId"
        left join lateral (
          select id."Price", id."DiscountAmount"
          from "InvoiceDetails" id
          inner join "InvoiceHeaders" ih on ih."Id" = id."InvoiceHeaderId"
          where id."ItemId" = sdd."ItemId"
            and date(ih."DocDate") = date(sdh."DocDate")
          order by ih."CreateAt" desc
          limit 1
        ) as price_row on true
        where sdd."ItemId" = 1
      ) sub_query
      group by sub_query.workhouse_id;
    `;

    return this.db.query(sql);
  }


  async getWorkhouseTotalSalary() {
    const sql = `
   select
  coalesce(final.workhouse_id, max(final.store_workhouse_id)) as workhouse_id,
  max(coalesce(final.workhouse_code, final.store_workhouse_code)) as workhouse_code,
  max(coalesce(final.workhouse_name, final.store_workhouse_name)) as workhouse_name,
  sum(final.personnel_salary) as total_salary
from
(
  select distinct on (p."Id")
     coalesce(w2."Id", w."Id") as workhouse_id,
    w2."Code" as workhouse_code,
    w2."Name" as workhouse_name,
    w."Id" as store_workhouse_id,
    w."Code" as store_workhouse_code,
    w."Name" as store_workhouse_name,
    p."Salary" as personnel_salary,
    pwp."StartDate" as personnel_start_date,
    p."Id" as personnel_id
  from "PersonnelWorkPlaces" pwp
  left join "Positions" p2 on pwp."PositionId" = p2."Id"
  left join "Stores" s on pwp."PlaceId" = s."Id"
  left join "Workhouses" w on s."WorkhouseId" = w."Id"
  left join "Workhouses" w2 on pwp."PlaceId" = w2."Id"
  left join "Personnels" p on pwp."PersonnelId" = p."Id"
  where
    pwp."Type" in (1, 2)
    and pwp."EndDate" is null
    and pwp."RecordStatus" = 0
  order by p."Id", pwp."StartDate" desc
) final
group by
  workhouse_id;

  `;

    return this.db.query(sql);
  }

  async getWorkhouseFuelStats() {
    const sql = `
    select	
      w."Id" as workhouse_id,
      max(w."Code") as workhouse_code,
      max(w."Name") as workhouse_name,     	
      
      sum(cf."TotatPrice") as total_price
    from "CarFuels" cf
    inner join "ConsignedCars" cc on cf."ConsignedCarId" = cc."Id"
    inner join "CarWarehouseDetails" cwd on cc."CarWarehouseDetailId" = cwd."Id"
    inner join "Workhouses" w on cc."WorkhouseId" = w."Id"
    left join "Works" w2 on w."WorkId" = w2."Id"
    inner join "Personnels" p on cc."PersonnelId" = p."Id"
    group by w."Id"
  `;

    return this.db.query(sql);
  }

  async getOtherFuelStats() {
    const sql = `
    select sum(cf."TotatPrice") as total_price
    from "CarFuels" cf
    inner join "ConsignedCars" cc on cf."ConsignedCarId" = cc."Id"and cc."WorkhouseId" is null
    inner join "CarWarehouseDetails" cwd on cc."CarWarehouseDetailId" = cwd."Id"      
    inner join "Personnels" p on cc."PersonnelId" = p."Id"
    
  `;

    return this.db.query(sql);
  }

  async getWorkhouseDispatchPrice() {
    const sql = `
   SELECT
  sub_query.workhouse_id,
  MAX(sub_query.workhousen_name) AS workhousen_name,
  SUM(sub_query.total) AS total_price
FROM (
  SELECT
    w."Id" AS workhouse_id,
    w."Code" AS workhouse_code,
    w."Name" AS workhousen_name,
    (
      sdd."Quantity" *
      (
        COALESCE(price_row."Price"::numeric, 0)
        - COALESCE(price_row."DiscountAmount"::numeric, 0)
      )
    ) AS total
  FROM "StoreDispatchHeaders" sdh

  LEFT JOIN "StoreDispatchDetails" sdd
    ON sdh."Id" = sdd."StoreDispatchHeadersId"

  INNER JOIN "Projects" p
    ON sdh."ProjectId" = p."Id"

  LEFT JOIN "PersonnelWorkPlaces" pwp
    ON p."Id" = pwp."PlaceId"
   AND pwp."EndDate" IS NULL
   AND pwp."PositionId" = 1

  LEFT JOIN "Personnels" p2
    ON pwp."PersonnelId" = p2."Id"

  LEFT JOIN "Workhouses" w
    ON p."WorkhouseId" = w."Id"

  INNER JOIN "Works" wrk
    ON wrk."Id" = w."WorkId"

  LEFT JOIN "Regions" r
    ON w."RegionId" = r.id

  LEFT JOIN "Regions" r2
    ON r."ParentId" = r2.id

  LEFT JOIN "Items" i
    ON sdd."ItemId" = i."Id"

  LEFT JOIN "ItemUnits" iu
    ON i."UnitId" = iu."Id"

  -- آخرین قیمت معتبر تا تاریخ حواله
  LEFT JOIN LATERAL (
    SELECT
      id."Price",
      id."DiscountAmount"
    FROM "InvoiceDetails" id
    INNER JOIN "InvoiceHeaders" ih
      ON ih."Id" = id."InvoiceHeaderId"
    WHERE
      id."ItemId" = i."Id"
      AND ih."DocDate" <= sdh."DocDate"
    ORDER BY
      ih."DocDate" DESC,
      ih."CreateAt" DESC
    LIMIT 1
  ) AS price_row ON TRUE
) sub_query
GROUP BY sub_query.workhouse_id;

  `;

    return this.db.query(sql);
  }

  async getProjectUsedItemReport(): Promise<ProjectUsedItemReportDto[]> {
    const query = `
      select
	result.*,
	((item_price-(item_price * item_disocount / 100))* total_qty) total_net_price
from
	(
	select
		MAX(w2."Id") as work_id,
		MAX(w2."Title") as work_title,
		MAX(w."Id") as workhouse_id,
		MAX(w."Name") as workhouse_name,
		MAX(s."Id") as store_id,
		MAX(s."Name") as store_name,
		sdh."ProjectId" as project_id,
		MAX(p."Code") as project_code,
		MAX(p."Title") as project_name,
		sdd."ItemId" as item_id,
		MAX(i."Code") as item_code,
		MAX(i."Name") as item_name,
		SUM(sdd."Quantity") as total_qty,
		MAX(inv."InvoiceNo") as invoice_no,
		MAX(inv."DocDate") as invoice_date,
		MAX(invd."Price") as item_price,
		MAX(invd."DiscountPercent") as item_disocount
	from
		"StoreDispatchDetails" sdd
	join "StoreDispatchHeaders" sdh
  on
		sdd."StoreDispatchHeadersId" = sdh."Id"
	join "Projects" p
  on
		sdh."ProjectId" = p."Id"
	join "Items" i
  on
		sdd."ItemId" = i."Id"
	join "Stores" s
  on
		sdh."StoreId" = s."Id"
	join "Workhouses" w
  on
		p."WorkhouseId" = w."Id"
	join "Works" w2
  on
		w."WorkId" = w2."Id"
		-- ⭐ قیمت تاریخی کالا
	left join lateral (
		select
			ih."InvoiceNo",
			ih."DocDate",
			id."Price",
			id."DiscountPercent"
		from
			"InvoiceDetails" id
		join "InvoiceHeaders" ih
    on
			ih."Id" = id."InvoiceHeaderId"
		where
			id."ItemId" = sdd."ItemId"
			and ih."DocDate" <= sdh."DocDate"
		order by
			ih."DocDate" desc
		limit 1
) invd on
		true
	left join "InvoiceHeaders" inv
  on
		inv."InvoiceNo" = invd."InvoiceNo"
		and inv."DocDate" = invd."DocDate"
	group by
		sdh."ProjectId",
		sdd."ItemId") result
    `;

    return this.db.query<ProjectUsedItemReportDto[]>(query);
  }

}
