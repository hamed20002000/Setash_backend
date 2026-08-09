import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";

import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateProjectPlanningImpelimentationDateDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    projectPlanningId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    forceMajorId?: number | null;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    endDate: Date;
}

export class UpdateProjectPlanningImpelimentationDateDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    projectPlanningId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    forceMajorId?: number | null;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    startDate: Date | null;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate: Date | null;
    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}