import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { invoiceStatus } from "src/domain/enums/invoiceStatus.enum";
import { orderStatus } from "src/domain/enums/orderStatus.enum";

export class CreateInvoiceDto {
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
  status: invoiceStatus;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  statusDescription: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  warehouseId: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverVehicleId: number;



  @ApiProperty({ type: () => [CreateInvoiceDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  @IsArray()
  @IsOptional()
  invoiceDetails?: CreateInvoiceDetailDto[];

}
export class CreateInvoiceForWorkhouseDto {
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
  status: invoiceStatus;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  statusDescription: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  workhouseId: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverVehicleId: number;



  @ApiProperty({ type: () => [CreateInvoiceDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  @IsArray()
  @IsOptional()
  invoiceDetails?: CreateInvoiceDetailDto[];

}
export class CreateInvoiceDetailDto {
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
  price: number;

  @ApiProperty()
  @Expose()
  @IsDecimal()
  @IsOptional()
  discountPercent: number | null;

  @ApiProperty()
  @Expose()
  @IsDecimal()
  @IsOptional()
  discountAmount: number | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  orderDetailId: number | null;
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


export class UpdateInvoiceDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;
  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
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
  @IsNumber()
  @IsOptional()
  driverId: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  driverVehicleId: number | null;



  @ApiProperty({ type: () => [CreateInvoiceDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  @IsArray()
  @IsOptional()
  invoiceDetails?: CreateInvoiceDetailDto[];

}
export class UpdateInvoiceWorkhouseDto {
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
  workhouseId: number | null;


  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  driverId: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  driverVehicleId: number | null;



  @ApiProperty({ type: () => [CreateInvoiceDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceDetailDto)
  @IsArray()
  @IsOptional()
  invoiceDetails?: CreateInvoiceDetailDto[];

}


export class UpdateInvoiceStatusDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  status: invoiceStatus;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string;


}
