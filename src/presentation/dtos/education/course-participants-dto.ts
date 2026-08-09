import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";



export class CreateCourseParticipantDto {
  @ApiProperty()
  @Expose()
  @IsBoolean()
  isParticipated: boolean;

  @ApiProperty()
  @Expose()
  @IsNumber()
  courseDateTimeId: number;
  @ApiProperty()
  @Expose()
  @IsNumber()
  personnelId: number;



}


export class UpdateCourseCourseParticipantDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  isParticipated: boolean| null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  courseDateTimeId: number| null;
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  personnelId: number| null;

}


