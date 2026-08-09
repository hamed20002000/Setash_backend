// personnel-workplace-filter.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonnelWorkplaceFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  workhouseId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  personnelId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  identityNumber?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number = 20;
}



export class PersonnelWorkplaceResponseDto {
  @ApiProperty() workhouse_id: number;
  @ApiProperty() workhouse_code: string;
  @ApiProperty() workhouse_name: string;
  @ApiProperty() personnel_id: number;
  @ApiProperty() personnel_name: string;
  @ApiProperty() personnel_identity_number: string;
  @ApiProperty() personnel_position: string;
  @ApiProperty() personnel_salary: number;
  @ApiProperty() personnel_start_date: string;
}


export class PersonnelWorkplaceListResponseDto {
  @ApiProperty() totalCount: number;
  @ApiProperty() totalSalary: number;
  @ApiProperty() page: number;
  @ApiProperty() pageSize: number;
  @ApiProperty() totalPages: number;
  @ApiProperty({ type: [PersonnelWorkplaceResponseDto] }) data: PersonnelWorkplaceResponseDto[];
}