import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";
import { Optional } from "@nestjs/common";



export class CreateCourseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  ISG: boolean;


  @ApiProperty()
  @Expose()
  @IsNumber()
  hours: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;

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

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  teacherId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @Optional()
  workhouseId: number| null;

}


export class UpdateCourseDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  ISG: boolean | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  title: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  hours: number | null;


  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;

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

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  teacherId: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  workhouseId: number | null;

  @ApiProperty()
  @Expose()
  @IsEnum(recordStatus)
  @IsOptional()
  recordStatus: recordStatus | null;

}


export class UpdateCourseEndDateDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;



  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDateTime: Date | null;



}



