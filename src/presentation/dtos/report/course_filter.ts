import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CourseReportFilterDto {

 @ApiPropertyOptional()
  @IsOptional()
  center?: any;
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  workhouseId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  teacherId?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  personnelId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  toDate?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  pageSize?: number = 20;
}
export class CourseReportItemDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhouse_code: string;

  @ApiProperty()
  workhouse_name: string;

  @ApiProperty()
  course_title: string;

  @ApiProperty()
  course_hours: number;

  @ApiProperty()
  course_isg: boolean;

  @ApiProperty()
  course_start_date_time: string;

  @ApiProperty()
  course_end_date_time: string;

  @ApiProperty()
  teacher_id: number;

  @ApiProperty()
  teacher_name: string;

  @ApiProperty()
  teacher_field: string;

  @ApiProperty()
  class_start_date_time: string;

  @ApiProperty()
  class_end_date_time: string;

  @ApiProperty()
  personnel_id: number;

  @ApiProperty()
  personnel_name: string;

  @ApiProperty()
  personnel_isg: boolean;
}


export class CourseReportResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty({ type: [CourseReportItemDto] })
  data: CourseReportItemDto[];
}
