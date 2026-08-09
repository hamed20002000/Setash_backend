import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";




export class CreateDriverDto {
    @ApiProperty()
    @Expose()
    @IsString()
    name: string;
    @ApiProperty()
    @Expose()
    @IsString()
    family: string;
    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
     @Type(() => Date)
    birthdate: Date|null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    fatherName: string|null;

    @ApiProperty()
    @Expose()
    @IsString()
    identityNo: string;
    
    @ApiProperty()
    @Expose()
    @IsBoolean()
    internal: boolean;
}

export class UpdateDriverDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
     @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    name: string|null;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    family: string|null;
    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
      @Type(() => Date)
    birthdate: Date|null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    fatherName: string|null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    identityNo: string|null;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    @IsOptional()
    internal: boolean|null;

     @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus|null;
}


export class CreateDriverVehicleDto {
    @ApiProperty()
    @Expose()
    @IsString()
    name: string;
    @ApiProperty()
    @Expose()
    @IsNumber()
    model: number;
    @ApiProperty()
    @Expose()
    @IsString()       
    plaque: string;   
    
    @ApiProperty()
    @Expose()
    @IsNumber()
    driverId: number;
}

export class UpdateDriverVehicleDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
      @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    name: string|null;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    model: number|null;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    plaque: string|null;

    @ApiProperty()
    @Expose()
    @IsNumber()
     @IsOptional()
    driverId: number|null;

     @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus|null;
}


