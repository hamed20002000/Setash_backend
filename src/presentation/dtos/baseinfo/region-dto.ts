import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";


export class RegionListDto {
    @ApiProperty({ description: 'Region Id' })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Depth' })
    @Expose()
    depth: number;

    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;

    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    parentId: number | null;

    @ApiProperty({ type: () => [RegionListDto], description: 'Children regions' })
    @Expose()
    @Type(() => RegionListDto)
    regions?: RegionListDto[];
}

export class CreateRegionDto {
    @ApiProperty({ description: 'Region Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'parent Id' })
    @Expose()
    @IsOptional()
    parentId: number | null;
}

export class UpdateRegionDto {
    @ApiProperty({ description: 'Region Id' })
    @Expose()
    @IsNumber()
    id: number
    @ApiProperty({ description: 'Region new Name' })
    @Expose()
    @IsString()
    @IsOptional()
    newname: string;

    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    @IsOptional()
    parentId: number | null;
}



