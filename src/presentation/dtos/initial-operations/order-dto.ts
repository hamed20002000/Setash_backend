import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsDecimal, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { orderStatus } from "src/domain/enums/orderStatus.enum";

export class CreateOrderDto {
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    docDate: Date;

    @ApiProperty()
    @Expose()
    @IsNumber()
    status: orderStatus;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    networkId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workhouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    requestId: number | null;

    @ApiProperty({ type: () => [CreateOrderDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    @IsArray()
    orderDetails?: CreateOrderDetailDto[];

}

export class CreateOrderDetailDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    itemId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @Expose()
    @IsDecimal()
    @IsOptional()
    price: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string;

}


export class UpdateOrderDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    docDate: Date;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    networkId: number | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workhouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    requestId: number | null;

    @ApiProperty({ type: () => [CreateOrderDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDetailDto)
    @IsArray()
    @IsOptional()
    orderDetails?: CreateOrderDetailDto[];

}


export class UpdateOrderstatusDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    status: orderStatus;


    @ApiProperty()
    @Expose()
    @IsString()
    description: string;


}
