import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { projectType } from "src/domain/enums/projectType.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";


export class CreateProjectFirmDto {
    @ApiProperty()
    @Expose()
    @IsString()
    title: string;
    @ApiProperty()
    @Expose()
    @IsString()
    abbreviation: string;
}

export class UpdateProjectFirmDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    title: string;
    @ApiProperty()
    @Expose()
    @IsString()
    abbreviation: string;

    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}



export class CreateProjectDto {
    @ApiProperty()
    @Expose()
    @IsString()
    title: string;

    @ApiProperty()
    @Expose()
    @IsString()
    code: string;

    @ApiProperty()
    @Expose()
    @IsEnum(projectType)
    type: projectType;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    startDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    predictEndDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    workhouseId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    firmId: number;



}

export class UpdateProjectDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    title: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;

    @ApiProperty()
    @Expose()
    @IsEnum(projectType)
    @IsOptional()
    type: projectType | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    startDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    predictEndDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workhouseId: number | null;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    firmId: number | null;
    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}



export class ProjectProgressDto {
  @ApiProperty()
  ProjectId: number;

  @ApiProperty()
  ProjectName: string;

  @ApiProperty({ nullable: true })
  Day: string | null;

  @ApiProperty()
  PctKaziYapilan?: number;

  @ApiProperty()
  PctAltMontaji?: number;

  @ApiProperty()
  PctBetonAtilan?: number;

  @ApiProperty()
  PctUstOrulen?: number;

  @ApiProperty()
  PctUstKurulan?: number;

  @ApiProperty()
  PctDikilenBeton?: number;

  @ApiProperty()
  PctIletken?: number;

  @ApiProperty()
  PctAyirici?: number;

  @ApiProperty()
  PctAydinlatma?: number;

  @ApiProperty()
  PctKabloKanali?: number;

  @ApiProperty()
  PctCekilenKabloM?: number;

  @ApiProperty()
  PctTransformator?: number;

  @ApiProperty()
  PctDagitimPanosu?: number;

  @ApiProperty()
  PctSahaDagitimKutusu?: number;

  @ApiProperty()
  PctBetonKosk?: number;

  @ApiProperty()
  PctHucre?: number;

  @ApiProperty({ nullable: true })
  PctDaily?: number;

  @ApiProperty()
  PctOverall: number;
}

export class ProjectOverallProgressDto {
  @ApiProperty()
  ProjectId: number;

  @ApiProperty()
  ProjectName: string;

  @ApiProperty({ nullable: true })
  ProjectCode: string | null;

  @ApiProperty({ nullable: true })
  WorkhouseManager: string | null;

  @ApiProperty()
  PctOverall: number;
}
