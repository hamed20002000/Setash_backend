import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal } from "class-validator";

export class ProjectUsedItemReportDto {
    @ApiProperty()
    work_id: number;
    @ApiProperty()
    work_title: string;
    @ApiProperty()
    workhouse_id: number;
    @ApiProperty()
    workhouse_name: string;
    @ApiProperty()
    store_id: number;
    @ApiProperty()
    store_name: string;
    @ApiProperty()
    project_id: number;
    @ApiProperty()
    project_code: string;
    @ApiProperty()
    project_name: string;
    @ApiProperty()
    item_id: number;
    @ApiProperty()
    item_code: string;
    @ApiProperty()
    item_name: string;
    @ApiProperty()
    total_qty: number;
    @ApiProperty()
    invoice_no: string;
    @ApiProperty()
    invoice_date: Date;
    @ApiProperty()
   
    item_price: number;
    @ApiProperty()
   
    item_disocount: number;
    @ApiProperty()
   
    total_net_price: number;
}
