import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreatePositionDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class UpdatePositionDto {
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
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}