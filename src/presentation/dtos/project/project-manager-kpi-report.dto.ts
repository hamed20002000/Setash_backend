import { ApiProperty } from '@nestjs/swagger';

export class ChantierManagerInfoDto {
  @ApiProperty({ example: 25 })
  Id: number;

  @ApiProperty({ example: '/uploads/personnels/25.png', nullable: true })
  ImageSrc: string | null;

  @ApiProperty({ example: 'Ali' })
  Name: string;

  @ApiProperty({ example: 'Ahmadi' })
  Family: string;

  @ApiProperty({ example: '0012345678' })
  IdentityNumber: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  WorkStartDate: Date;

  @ApiProperty({ example: null, nullable: true })
  WorkEndDate: Date | null;

  @ApiProperty({ example: null, nullable: true })
  InsuranceNumber: string | null;

  @ApiProperty({ example: 1 })
  Sex: number;

  @ApiProperty({ example: 0 })
  SalaryType: number;

  @ApiProperty({ example: 0 })
  SalaryAccrualMethod: number;

  @ApiProperty({ example: 35000000, nullable: true })
  Salary: number | null;

  @ApiProperty({ example: 1 })
  Group: number;

  @ApiProperty({ example: 'Istanbul', nullable: true })
  BirthPlace: string | null;

  @ApiProperty({ example: '1990-05-01T00:00:00.000Z' })
  BirthDate: Date;

  @ApiProperty({ example: 1, nullable: true })
  MaritalStatus: number | null;

  @ApiProperty({ example: 'Hasan' })
  FatherName: string;

  @ApiProperty({ example: 2, nullable: true })
  BloodType: number | null;

  @ApiProperty({ example: 'Manager Address' })
  Address: string;

  @ApiProperty({ example: 3 })
  EducationStatus: number;

  @ApiProperty({ example: null, nullable: true })
  IBAN: string | null;

  @ApiProperty({ example: '02120000000', nullable: true })
  Telephone: string | null;

  @ApiProperty({ example: '09120000000', nullable: true })
  Mobile: string | null;

  @ApiProperty({ example: true, nullable: true })
  HasISG: boolean | null;

  @ApiProperty({ example: null, nullable: true, type: Object })
  Attachments: object | null;

  @ApiProperty({ example: 0 })
  RecordStatus: number;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  CreateAt: Date;

  @ApiProperty({ example: 1, nullable: true })
  PositionId: number | null;

  @ApiProperty({ example: 'Chantier Manager', nullable: true })
  PositionTitle: string | null;
}

export class ChantierManagerProjectKpiDto {
  @ApiProperty({ example: 12 })
  ProjectId: number;

  @ApiProperty({ example: 'PRJ-120', nullable: true })
  ProjectCode: string | null;

  @ApiProperty({ example: 'Project 120' })
  ProjectTitle: string;

  @ApiProperty({ example: 1, nullable: true })
  ProjectType: number | null;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', nullable: true })
  ProjectStartDate: Date | null;

  @ApiProperty({ example: null, nullable: true })
  ProjectEndDate: Date | null;

  @ApiProperty({ example: 7, nullable: true })
  WorkhouseId: number | null;

  @ApiProperty({ example: 'WH-07', nullable: true })
  WorkhouseCode: string | null;

  @ApiProperty({ example: 'Workhouse 7', nullable: true })
  WorkhouseName: string | null;

  @ApiProperty({ example: 4, nullable: true })
  WorkId: number | null;

  @ApiProperty({ example: 'Work A', nullable: true })
  WorkTitle: string | null;

  @ApiProperty({ example: 3, nullable: true })
  TenderId: number | null;

  @ApiProperty({ example: 'Tender 2025', nullable: true })
  TenderTitle: string | null;

  @ApiProperty({ example: 24 })
  ProjectKpi: number;
}

export class ChantierManagerKpiReportDto {
  @ApiProperty({ type: ChantierManagerInfoDto })
  Manager: ChantierManagerInfoDto;

  @ApiProperty({ example: 3 })
  ProjectCount: number;

  @ApiProperty({ example: 72 })
  TotalKpi: number;

  @ApiProperty({ example: 24 })
  AverageKpi: number;

  @ApiProperty({ type: [ChantierManagerProjectKpiDto] })
  Projects: ChantierManagerProjectKpiDto[];
}
