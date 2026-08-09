import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, isEnum, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { planningStatus } from "src/domain/enums/planningStatus.enum";
import { projectImplementationFieldStatus } from "src/domain/enums/projectImplementaionFieldStatus";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { implementsValueObjectDto, ValueObjectDto } from "src/domain/helper/value-object";
import { Column } from "typeorm";



export class CreateProjectPlanningDto {
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    kaziYapilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    altMontajiYapilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    betonAtilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ustMontajiOrulenDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ustMontajiKurulanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dikilenBetonDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    iletkenCekilenDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ayiriciTakilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dikilenAydinlatmaDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    kabloKanali: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    cekilenKabloMiktari: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    transformator: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dagitimPanosu: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    sahaDagTMKutusu: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    betonKosk: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    hucre: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    projectId: number;

}

export class UpdateProjectPlanningDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    kaziYapilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    altMontajiYapilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    betonAtilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ustMontajiOrulenDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ustMontajiKurulanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dikilenBetonDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    iletkenCekilenDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    ayiriciTakilanDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dikilenAydinlatmaDirekSayisi: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    kabloKanali: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    cekilenKabloMiktari: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    transformator: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    dagitimPanosu: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    sahaDagTMKutusu: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    betonKosk: ValueObjectDto | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @Type(() => ValueObjectDto)
    @ValidateNested() // <-- Add to validate the nested DTO
    @IsObject()
    hucre: ValueObjectDto | null;
    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    projectId: number | null;

}

export class CreateProjectPlanningImplementationDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    projectPlanningDateId: number;

   
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    channelRowId: number|null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    transmissionRowId: number|null;


    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)

    kaziYapilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    altMontajiYapilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    betonAtilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ustMontajiOrulenDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ustMontajiKurulanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dikilenBetonDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    iletkenCekilenDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ayiriciTakilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dikilenAydinlatmaDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    kabloKanaliDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    cekilenKabloMiktari: number | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    transformatorDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dagitimPanosuDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    sahaDagTMKutusuDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    betonKoskDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    hucreDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    description: string | null;

    /*     @ApiProperty()
        @Expose()
        @IsEnum(planningStatus)
        @IsOptional()
        planningStatus: planningStatus | null; */
}

export class UpdateProjectPlanningImplementationDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    projectPlanningDateId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    channelRowId: number|null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    transmissionRowId: number|null;
    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)

    kaziYapilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    altMontajiYapilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    betonAtilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ustMontajiOrulenDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ustMontajiKurulanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dikilenBetonDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    iletkenCekilenDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    ayiriciTakilanDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dikilenAydinlatmaDirekDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    kabloKanaliDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    cekilenKabloMiktari: number | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    transformatorDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    dagitimPanosuDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    sahaDagTMKutusuDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    betonKoskDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsEnum(projectImplementationFieldStatus)
    hucreDurumu: projectImplementationFieldStatus | null;

    @ApiProperty()
    @Expose()
    @IsOptional()
    @IsString()
    description: string | null;

    /*     @ApiProperty()
        @Expose()
        @IsEnum(planningStatus)
        @IsOptional()
        planningStatus: planningStatus | null; */

    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}
