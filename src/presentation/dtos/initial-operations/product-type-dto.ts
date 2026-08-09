import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductType } from "src/domain/enums/productType-type.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateProductTypeDto {
    @ApiProperty()
    @Expose()
    @IsString()
    name: string;

    @ApiProperty()
    @Expose()
    @IsEnum(ProductType)
    type: ProductType;
}

export class UpdateProductTypeDto {
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
    @IsEnum(ProductType)
    @IsOptional()
    type: ProductType | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: recordStatus | null;
}