import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { WarehouseDispatchStatus } from "src/domain/enums/warehouseDispatchStatus.enum";

export class CreateWarehouseDispatchDto {

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
  warehouseId: number;


  @ApiProperty()
  @Expose()
  @IsNumber()
  driverId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverVehicleId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()

  workhouseId: number;

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}

export class CreateWarehouseDispatchDestructionDto {

  @ApiProperty()
  @Expose()
  @IsBoolean()
  destructionStatus: boolean;
  @ApiProperty()
  @Expose()
  @IsString()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  docDate: Date;

  @ApiProperty()
  @Expose()
  @IsNumber()
  warehouseId: number;


  @ApiProperty()
  @Expose()
  @IsNumber()
  driverId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverVehicleId: number;

/*   @ApiProperty()
  @Expose()
  @IsNumber()

  workhouseId: number; */

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}


export class CreateWarehouseDispatchDetailDto {
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



}

export class UpdateWarehouseDispatchDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  code: string;

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

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  workhouseId: number | null;

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}

export class UpdateWarehouseDispatchDestructionDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  destructionStatus: boolean | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  code: string;

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

/*   @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  workhouseId: number | null; */

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}

export class UpdateWarehouseDispatchStatusDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(WarehouseDispatchStatus)
  status: WarehouseDispatchStatus;




}



export class CreateBetweenWarehouseDispatchDto {

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
  warehouseId: number;


  @ApiProperty()
  @Expose()
  @IsNumber()
  driverId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  driverVehicleId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  destinationWarehouseId: number;

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}

export class UpdateBetweenWarehouseDispatchDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  code: string;

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

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  destinationWarehouseId: number | null;

  @ApiProperty({ type: () => [CreateWarehouseDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateWarehouseDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateWarehouseDispatchDetailDto[];

}





