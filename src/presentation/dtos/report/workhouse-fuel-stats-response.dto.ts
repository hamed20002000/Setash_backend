// src/dashboard/dto/workhouse-fuel-stats-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WorkhouseFuelStatsResponseDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhouse_code: string;

  @ApiProperty()
  workhouse_name: string;

  @ApiProperty()
  fuel_type: number;

  @ApiProperty()
  total_fuel_amount: number;

  @ApiProperty()
  total_price: number;
}
