import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";


export class CategoryListDto {
    @ApiProperty({ description: 'Category Id' })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Name' })
    @Expose()
    name: string;
    @ApiProperty({ description: 'Code' })
    @Expose()
    code: string;
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

    @ApiProperty({ type: () => [CategoryListDto], description: 'Children categories' })
    @Expose()
    @Type(() => CategoryListDto)
    categories?: CategoryListDto[];
}

export class CreateCategoryDto {
    @ApiProperty({ description: 'Category Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string
    @ApiProperty({ description: 'Code' })
    @Expose()
    @IsString()
    @IsOptional()
    code: string;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    @IsOptional()
    parentId: number | null;
}

export class UpdateCategoryDto {
    @ApiProperty({ description: 'Category Id' })
    @Expose()
    @IsNumber()
    id: number
    @ApiProperty({ description: 'Category new Name' })
    @Expose()
    @IsString()
    @IsOptional()
    newname: string
    @ApiProperty({ description: 'Category new code' })
    @Expose()
    @IsString()
    @IsOptional()
    code: string;
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



