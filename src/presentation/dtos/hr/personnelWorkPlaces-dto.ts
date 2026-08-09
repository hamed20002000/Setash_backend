import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { leaveStatus } from "src/domain/enums/leaveStatus.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { WorkPlaceType } from "src/domain/enums/workPlaceType.enum";

export class CreatePersonnelWorkPlacesDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    personnelId: number;



    @ApiProperty()
    @Expose()
    @IsNumber()
    positionId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    userRoleId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    placeId: number;

    @ApiProperty()
    @Expose()
    @IsEnum(WorkPlaceType)
    type: WorkPlaceType;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;


}

export class UpdatePersonnelWorkPlacesDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    personnelId: number | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    positionId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    userRoleId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    placeId: number | null;

    @ApiProperty()
    @Expose()
    @IsEnum(WorkPlaceType)
    @IsOptional()
    type: WorkPlaceType | null;

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
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;


}

