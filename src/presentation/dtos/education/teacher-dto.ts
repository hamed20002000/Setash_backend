import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";



export class CreateTeacherDto {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  surname: string;

  @ApiProperty()
  @Expose()
  @IsString()
  field: string;

}


export class UpdateTeacherDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  name: string | null;

  @ApiProperty()
  @Expose()
  @IsOptional()
  surname: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  field: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(recordStatus)
  @IsOptional()
  recordStatus: recordStatus | null;

}


