import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { StoreDispatchStatus } from "src/domain/enums/StoreDispatchStatus";
import { WarehouseDispatchStatus } from "src/domain/enums/warehouseDispatchStatus.enum";

export class CreateStoreDispatchDto {

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
  storeId: number;


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

  projectId: number;

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}

export class CreateStoreDispatchDetailDto {
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

export class UpdateStoreDispatchDto {
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
  storeId: number | null;


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
  projectId: number | null;

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}

export class UpdateStoreDispatchStatusDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @Expose()
  @IsEnum(StoreDispatchStatus)
  status: StoreDispatchStatus;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;



}



export class CreateBetweenStoreDispatchDto {

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
  storeId: number;


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
  destinationStoreId: number;

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}

export class UpdateBetweenStoreDispatchDto {
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
  storeId: number | null;


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
  destinationStoreId: number | null;

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}


export class CreateStoreDispatchToCenterDto {

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
  storeId: number;


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

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}

export class UpdateStoreDispatchToCenterDto {
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
  storeId: number | null;


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

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}


export class CreateStoreDispatchReturnToCenterDto {
  @ApiProperty()
  @Expose()
  @IsBoolean()
  destruction: boolean;

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
  storeId: number;


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

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}

export class UpdateStoreDispatchReturnToCenterDto {
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
  destruction: boolean;
  
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
  storeId: number | null;


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

  @ApiProperty({ type: () => [CreateStoreDispatchDetailDto] })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => CreateStoreDispatchDetailDto)
  @IsArray()
  @IsOptional()
  dispatchDetails?: CreateStoreDispatchDetailDto[];

}


