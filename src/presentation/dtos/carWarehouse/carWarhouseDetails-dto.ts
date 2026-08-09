
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";
export class CreateCarWarehouseDetailsDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    manufactureDate: Date;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    fuelType: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    plaque: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    carWarehouseId: number;

    @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;
}

export class UpdateCarWarehouseDetailsDto {


    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    brand: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    model: string | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    manufactureDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    fuelType: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    plaque: string | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    carWarehouseId: number | null;

    @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;
    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}