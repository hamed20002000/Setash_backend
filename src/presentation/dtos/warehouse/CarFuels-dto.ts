import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";




export class CreateCarFuelDto {
  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @Expose()
  @IsString()
  fuelType: string;


  @ApiProperty()
  @Expose()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  totatPrice: number;

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  consignedCarId: number;


}

export class UpdateCarFuelDto {

  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

   @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date: Date| null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  fuelType: string| null;


  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  amount: number | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  description: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  fee: number | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  totatPrice: number| null;

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsOptional()
  consignedCarId: number | null;

}


