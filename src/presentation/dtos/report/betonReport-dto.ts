import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DispatchBetonFilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    docNumber?: string;

    @ApiPropertyOptional({ example: "2025-01-01" })
    @IsOptional()
    @IsDateString()
    fromDate?: string;

    @ApiPropertyOptional({ example: "2025-12-31" })
    @IsOptional()
    @IsDateString()
    toDate?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    projectId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    workhouseId?: number; 

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxQuantity?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minQuantity?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number = 1;

    @ApiPropertyOptional({ example: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize: number = 20;
}
export class DispatchFilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    docNumber?: string;

    @ApiPropertyOptional({ example: "2025-01-01" })
    @IsOptional()
    @IsDateString()
    fromDate?: string;

    @ApiPropertyOptional({ example: "2025-12-31" })
    @IsOptional()
    @IsDateString()
    toDate?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    projectId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    workhouseId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()    
    itemId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxQuantity?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minQuantity?: number;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number = 1;

    @ApiPropertyOptional({ example: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize: number = 20;
}

export class DispatchItemDto {
    @ApiProperty() workhouse_id: number;
    @ApiProperty() workhouse_code: string;
    @ApiProperty() workhouse_name: string;

    @ApiProperty() date: string;

    @ApiProperty() project_code: string;
    @ApiProperty() region_name: string;
    @ApiProperty() team_name: string;

    @ApiProperty() province: string;
    @ApiProperty() district: string;

    @ApiProperty() project_name: string;
    @ApiProperty() work_type: string;

    @ApiProperty() itemcode: string;
    @ApiProperty() itemname: string;
    @ApiProperty() unit: string;

    @ApiProperty() quantity: number;

    @ApiProperty() price: number;
    @ApiProperty() total: number;
}

export class GetFilteredDataResponseDto {
    @ApiProperty() totalCount: number;

    @ApiProperty({
        description: 'Total amount of all dispatches',
        example: 128540000,
    })
    totalPrice: number;

    @ApiProperty() page: number;
    @ApiProperty() pageSize: number;
    @ApiProperty() totalPages: number;

    @ApiProperty({ type: [DispatchItemDto] })
    data: DispatchItemDto[];
}
