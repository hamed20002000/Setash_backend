import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import {  IsNumber,  IsString } from "class-validator";




export class ValueObjectDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    estimatedNumber: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    min: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    max: number;
}

export class implementsValueObjectDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @Expose()
    @IsString()
    item: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    from: string | null;

    @ApiProperty()
    @Expose()
    to: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    lang: string;

    @ApiProperty()
    @Expose()
    @IsString()
    lat: string;

    @ApiProperty()
    @Expose()
    @IsString()
    attachment: string;
}




