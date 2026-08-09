// src/dashboard/dto/dashboard-stats.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsDto {
  @ApiProperty() active_personnel: number;
  @ApiProperty() all_personnel: number;

  @ApiProperty() accepted_tender: number;
  @ApiProperty() all_tender: number;

  @ApiProperty() active_works: number;
  @ApiProperty() all_works: number;

  @ApiProperty() active_projects: number;
  @ApiProperty() all_projects: number;

  @ApiProperty() active_workhouses: number;
  @ApiProperty() all_workhouses: number;

  @ApiProperty() car_count: number;
  @ApiProperty() consignment_count: number;
  @ApiProperty() course_count: number;

    @ApiProperty() warhouse_items_count: number;
  @ApiProperty() store_items_count: number;
    @ApiProperty() kabullar_count: number;

}
