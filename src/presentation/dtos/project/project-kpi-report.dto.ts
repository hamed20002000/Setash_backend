import { ApiProperty } from '@nestjs/swagger';

export class ProjectKpiMetricScoreDto {
  @ApiProperty({ example: 'KaziYapilanDirekSayisi' })
  Field: string;

  @ApiProperty({ example: 12 })
  Actual: number;

  @ApiProperty({ example: 8, nullable: true })
  Min: number | null;

  @ApiProperty({ example: 15, nullable: true })
  Max: number | null;

  @ApiProperty({ example: 1 })
  Score: number;
}

export class ProjectKpiDateScoreDto {
  @ApiProperty({ example: 10 })
  ProjectPlanningImplementationDateId: number;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  StartDate: Date | null;

  @ApiProperty({ example: '2025-05-15T00:00:00.000Z' })
  EndDate: Date | null;

  @ApiProperty({ type: [ProjectKpiMetricScoreDto] })
  Metrics: ProjectKpiMetricScoreDto[];

  @ApiProperty({ example: 12 })
  TotalScore: number;
}

export class ProjectKpiReportDto {
  @ApiProperty({ example: 12 })
  ProjectId: number;

  @ApiProperty({ example: 'Pireviller TR-1', nullable: true })
  ProjectName: string | null;

  @ApiProperty({ example: '2025-05-31T00:00:00.000Z', nullable: true })
  PlannedEndDate: Date | null;

  @ApiProperty({ example: '2025-05-28T00:00:00.000Z', nullable: true })
  ActualEndDate: Date | null;

  @ApiProperty({ example: 6 })
  ScheduleScore: number;

  @ApiProperty({ example: 24 })
  TotalScore: number;

  @ApiProperty({ type: [ProjectKpiDateScoreDto] })
  Dates: ProjectKpiDateScoreDto[];
}
