import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";




export class CreateProviderDto {
    @ApiProperty()
    @Expose()
    @IsString()
    name: string;
    @ApiProperty()
    @Expose()
    @IsString()
    address: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    phone: string | null;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    firm: boolean;

    @ApiProperty()
    @Expose()
    @IsNumber()
    regionId: number;
}

export class UpdateProviderDto {

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
    address: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    phone: string | null;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    @IsOptional()
    firm: boolean | null;

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

