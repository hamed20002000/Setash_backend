import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";

export class SystemOperationListDto {
    @ApiProperty({ description: 'System Operation Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'System Operation Name' })
    @Expose()
    name: string
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;
    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
}

export class CreateSystemOperationDto {
    @ApiProperty({ description: 'System Operation Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string
}

export class UpdateSystemOperationDto {
    @ApiProperty({ description: 'System Operation current Name' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'System Operation new Name' })
    @Expose()
    @IsString()
    @IsOptional()
    newname: string
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;
}



