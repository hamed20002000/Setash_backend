import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class TenderFlowFilterDto {
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    tenderId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    itemId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    workhouseId?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()

    page?: number;
    @ApiPropertyOptional()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    pageSize?: number;
}



export class TenderFlowItemDto {
    @ApiProperty() ihale_title: string;
    @ApiProperty() ihale_category: string;

    @ApiProperty() demontaj: number;
    @ApiProperty() demontajMontaj: number;
    @ApiProperty() demontajMontajPrice: number;
    @ApiProperty() demontajTutari: number;
    @ApiProperty() montajPrice: number;

    @ApiProperty() item_id: number;
    @ApiProperty() item_name: string;
    @ApiProperty() unit: string;

    @ApiProperty() work_id: number;
    @ApiProperty() work_name: string;

    @ApiProperty() network_title: string;

    @ApiProperty() order_no: number;
    @ApiProperty() order_date: Date;
    @ApiProperty() order_item_id: number;
    @ApiProperty() order_price: number;
    @ApiProperty() order_qty: number;

    @ApiProperty() invoice_no: string;
    @ApiProperty() invoice_date: Date;
    @ApiProperty() invoice_itemId: number;
    @ApiProperty() invoice_price: number;
    @ApiProperty() invoice_qty: number;

    @ApiProperty() receipt_no: string;
    @ApiProperty() receipt_date: Date;
    @ApiProperty() receipt_item_id: number;
    @ApiProperty() quantity: number;

    @ApiProperty() warehouse_code: string;
    @ApiProperty() warehouse_name: string;

    @ApiProperty() warhouse_dispatch_code: string;
    @ApiProperty() warhouse_dispatch_date: Date;
    @ApiProperty() warhouse_dispatch_item_id: number;
    @ApiProperty() warhouse_dispatch_qty: number;

    @ApiProperty() store_receipt_code: string;
    @ApiProperty() store_receipt_date: Date;
    @ApiProperty() store_receipt_item_id: number;
    @ApiProperty() store_receipt_qty: number;

    @ApiProperty() store_code: string;
    @ApiProperty() store_name: string;

    @ApiProperty() workhouse_code: string;
    @ApiProperty() workhouse_name: string;
}




export class TenderFlowListResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 125 })
    totalCount: number;

    @ApiProperty({ example: 879500 })
    totalDemontaj: number;
    @ApiProperty({ example: 879500 })
    totalMontaj: number;
    @ApiProperty({ example: 879500 })
    totalDemontajMontaj: number;
    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 20 })
    pageSize: number;

    @ApiProperty({ example: 20 })
    totalPages: number;

    @ApiProperty({ type: [TenderFlowItemDto] })
    data: TenderFlowItemDto[];
}

export class TenderFlowItemForProjectDto {
    @ApiProperty() itemId: number;

    @ApiProperty() itmCode: string;
    @ApiProperty() itmName: string;

    @ApiProperty() qty: number;

    @ApiProperty() ihaleTitle: string;
    @ApiProperty() ihaleCategory: string;

    @ApiProperty() firmQty?: number;
    @ApiProperty() ourQty?: number;

    @ApiProperty() demontaj?: boolean;
    @ApiProperty() demontajMontaj?: boolean;

    @ApiProperty() demontajMontajPrice?: number;
    @ApiProperty() demontajTutari?: number;
    @ApiProperty() montajPrice?: number;
    @ApiProperty() demontajPrice?: number;
}


export class TenderFlowForProjectListResponseDto {
    @ApiProperty({ example: true })
    success: boolean;

    @ApiProperty({ example: 125 })
    totalCount: number;

    @ApiProperty({ example: 879500 })
    totalDemontaj: number;
    @ApiProperty({ example: 879500 })
    totalMontaj: number;
    @ApiProperty({ example: 879500 })
    totalDemontajMontaj: number;
    @ApiProperty({ example: 1 })
    page: number;

    @ApiProperty({ example: 20 })
    pageSize: number;

    @ApiProperty({ example: 20 })
    totalPages: number;

    @ApiProperty({ type: [TenderFlowItemForProjectDto] })
    data: TenderFlowItemForProjectDto[];
}
