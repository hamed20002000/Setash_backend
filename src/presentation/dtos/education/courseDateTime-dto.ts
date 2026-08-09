import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";



export class CreateCourseDateTimeDto {


  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  startDateTime: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDateTime: Date | null;



  @ApiProperty()
  @Expose()
  @IsNumber()
  courseId: number;

}


export class UpdateCourseDateTimeDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDateTime: Date | null;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDateTime: Date | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  courseId: number | null;

  @ApiProperty()
  @Expose()
  @IsEnum(recordStatus)
  @IsOptional()
  recordStatus: recordStatus | null;

}


