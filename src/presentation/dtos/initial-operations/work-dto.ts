import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateWorkDto {

    @ApiProperty()
    @Expose()
    @IsString()
    title: string;

    @ApiProperty()
    @Expose()
    @IsString()
    startDate: Date;


    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    endDate: Date | null;
    @ApiProperty()
    @Expose()
    @IsNumber()
    tenderId: number;
}

export class UpdateWorkDto {
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
    startDate: Date | null;


    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    endDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    tenderId: number | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: recordStatus | null;
}