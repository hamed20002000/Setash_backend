import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { projectType } from "src/domain/enums/projectType.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";


export class CreateConfirmationProjectReportDto {


  @ApiProperty()
  @Expose()
  @IsNumber()
  year: number;


  @ApiProperty()
  @Expose()
  @IsString()
  city: string;


  @ApiProperty()
  @Expose()
  @IsString()
  town: string;

  @ApiProperty()
  @Expose()
  @IsString()
  region: string;

  @ApiProperty()
  @Expose()
  @IsEnum(projectType)
  tesisType: projectType;

  @ApiProperty()
  @Expose()
  @IsString()
  trAdi: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  projectCount: number;


  @ApiProperty()
  @Expose()
  @IsBoolean()
  Gecici_tutanak_teslim_alma_durumu: boolean;



  @ApiProperty()
  @Expose()
  @IsBoolean()
  Kesin_tutanak_teslim_alma_durumu: boolean;


}


export class UpdateConfirmationProjectReportDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  year: number | null;


  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  city: string | null;


  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  town: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  region: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(projectType)
  @IsOptional()
  tesisType: projectType | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  trAdi: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  projectCount: number | null;


  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  Gecici_tutanak_teslim_alma_durumu: boolean | null;



  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  Kesin_tutanak_teslim_alma_durumu: boolean | null;

  @ApiProperty({ required: false })
  @Expose()
  @IsEnum(recordStatus)
  @IsOptional()
  recordStatus?: recordStatus | null;

}

