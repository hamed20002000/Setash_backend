import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class DashboardFinancialFilterDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  tenderId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  workId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  workhouseId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  projectId?: number;
}

export class DashboardFinancialStatsDto {
  @ApiProperty()
  totalBetonQuantity: number;

  @ApiProperty()
  totalBetonPrice: number;

  @ApiProperty()
  totalUsedItemsPrice: number;

  @ApiProperty()
  totalFuelPrice: number;

  @ApiProperty()
  totalPaidSalary: number;

  @ApiProperty()
  totalMontaj: number;

  @ApiProperty()
  totalDemontaj: number;

  @ApiProperty()
  totalDemontajMontaj: number;
}
