import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { invoiceStatus } from "src/domain/enums/invoiceStatus.enum";
import { orderStatus } from "src/domain/enums/orderStatus.enum";

export class CreateReceiptDto {


    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    docDate: Date;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty({ type: () => [CreateReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateReceiptDetailDto[];

}

export class CreateReceiptDetailDto {
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
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    invoiceDetailId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    providerId: number | null;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    @IsOptional()
    firm: boolean | null;

}


export class UpdateReceiptDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    docDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;



    @ApiProperty({ type: () => [CreateReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateReceiptDetailDto[];

}


export class CreateBetweenReceiptDto {


    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    docDate: Date;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty({ type: () => [CreateBetweenReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateBetweenReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateBetweenReceiptDetailDto[];

}

export class CreateBetweenReceiptDetailDto {
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
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    originWarehouseDispatchDeatailId: number | null;



}

export class UpdateBetweenReceiptDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    docDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;



    @ApiProperty({ type: () => [CreateBetweenReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateBetweenReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateBetweenReceiptDetailDto[];

}



export class CreateReceiptForSendedFromStoreDto {
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    docDate: Date;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty({ type: () => [CreateReceiptDetailForSendedFromStoreDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateReceiptDetailForSendedFromStoreDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateReceiptDetailForSendedFromStoreDto[];

}

export class UpdateReceiptForSendedFromStoreDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    docDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    warehouseId: number | null;

    @ApiProperty({ type: () => [CreateReceiptDetailForSendedFromStoreDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateReceiptDetailForSendedFromStoreDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateReceiptDetailForSendedFromStoreDto[];

}

export class CreateReceiptDetailForSendedFromStoreDto {
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
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()

    StoreDispatchDetailId: number;




}

export class UpdateIsEnd {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsBoolean()
    isEnd: boolean;
}



