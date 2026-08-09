// src/dashboard/dto/workhouse-total-salary-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WorkhouseTotalSalaryResponseDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhouse_code: string;

  @ApiProperty()
  workhouse_name: string;

  @ApiProperty()
  total_salary: number;
}
