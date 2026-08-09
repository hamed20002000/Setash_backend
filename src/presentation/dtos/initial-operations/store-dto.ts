import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateStoreDto {

    @ApiProperty()
    @Expose()
    @IsString()
    name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    code: string;

    @ApiProperty()
    @Expose()
    @IsString()
    address: string;

    @ApiProperty()
    @Expose()
    @IsNumber()
    regionId: number;

    
    @ApiProperty()
    @Expose()
    @IsNumber()
    workhouseId: number;
}

export class UpdateStoreDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    name: string| null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string| null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    address: string| null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    regionId: number| null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: recordStatus | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workhouseId: number | null;
}