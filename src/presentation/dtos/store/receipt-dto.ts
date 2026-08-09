import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { invoiceStatus } from "src/domain/enums/invoiceStatus.enum";
import { orderStatus } from "src/domain/enums/orderStatus.enum";

export class CreateStoreReceiptDto {


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
    storeId: number | null;

    @ApiProperty({ type: () => [CreateStoreReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateStoreReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateStoreReceiptDetailDto[];

}

export class CreateStoreReceiptDetailDto {
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
    warehouseDispatchDetailId: number | null;



}


export class UpdateStoreReceiptDto {
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
    storeId: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;



    @ApiProperty({ type: () => [CreateStoreReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateStoreReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateStoreReceiptDetailDto[];

}




export class CreateBetweenStoreReceiptDto {


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
    storeId: number | null;

    @ApiProperty({ type: () => [CreateBetweenStoreReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateBetweenStoreReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateBetweenStoreReceiptDetailDto[];

}

export class CreateBetweenStoreReceiptDetailDto {
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
    originStoreDispatchDeatailId: number | null;



}

export class UpdateBetweenStoreReceiptDto {
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
    storeId: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;



    @ApiProperty({ type: () => [CreateBetweenStoreReceiptDetailDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateBetweenStoreReceiptDetailDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateBetweenStoreReceiptDetailDto[];

}


export class CreateStoreReceiptByInvoiceDto {


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
    storeId: number | null;

    @ApiProperty({ type: () => [CreateStoreReceiptDetailByInvoiceDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateStoreReceiptDetailByInvoiceDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateStoreReceiptDetailByInvoiceDto[];

}

export class CreateStoreReceiptDetailByInvoiceDto {
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



}


export class UpdateStoreReceiptByInvoiceDto {
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
    storeId: number | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    code: string | null;



    @ApiProperty({ type: () => [CreateStoreReceiptDetailByInvoiceDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateStoreReceiptDetailByInvoiceDto)
    @IsArray()
    @IsOptional()
    receiptDetails?: CreateStoreReceiptDetailByInvoiceDto[];

}



