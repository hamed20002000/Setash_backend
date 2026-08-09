import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { WorkPlaceType } from "src/domain/enums/workPlaceType.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";

export class CreateCarWarehousesDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    address: string;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    regionId: number;
}

export class UpdateCarWarehousesDto {

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
    @IsString()
    @IsOptional()
    code: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    address: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    regionId: number | null;

    
    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}
