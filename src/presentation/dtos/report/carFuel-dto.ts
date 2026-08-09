import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CarFuelFilterDto {
    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    workhouseId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    workId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    personnelId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional()
    @IsOptional()
    model?: string;

    @ApiPropertyOptional()
    @IsOptional()
    fromDate?: string;

    @ApiPropertyOptional()
    @IsOptional()
    toDate?: string;

    @ApiPropertyOptional({ default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number = 1;

    @ApiPropertyOptional({ default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    pageSize: number = 20;
}


export class CarFuelListResponseDto {
    @ApiProperty()
    totalCount: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty() totalPages: number;
    
    @ApiProperty()
    totalPrice: number;

    @ApiProperty({ type: Object, isArray: true })
    data: any[];
}
