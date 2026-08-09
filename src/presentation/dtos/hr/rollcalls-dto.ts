import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRollCallDto {

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    date: Date;


    @ApiProperty()
    @Expose()
    @IsString()
    startTime: string;


    @ApiProperty()
    @Expose()
    @IsString()
    endTime: string;


    @ApiProperty()
    @Expose()
    @IsNumber()
    personnelWorkPlaceId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    absence: boolean;

}


export class UpdateRollCallDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;


    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsOptional()
    @IsDate()
    date: Date | null;


    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    startTime: string | null;


    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    endTime: string | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    personnelWorkPlaceId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    absence?: boolean;
}
