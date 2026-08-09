import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { workhouseRentStatus } from "src/domain/enums/workhouseRentStatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";




export class CreateWorkhouseRentDto {
    @ApiProperty()
    @Expose()
    @IsString()
    title: string;
    @ApiProperty()
    @Expose()
    @IsString()
    description: string;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    driverInfo: string | null;
    @ApiProperty()
    @Expose()
    @IsDecimal()
    price: number;
    @ApiProperty()
    @Expose()
    @IsString()
    company: string;
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    rentStartDate: Date;
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    rentEndDate: Date;

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
    @IsNotEmpty()
    workhouseId: number;

}

export class UpdateWorkhouseRentDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
     @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    title: string | null;
    @ApiProperty()
    @Expose()
    @IsString()
     @IsOptional()
    description: string | null;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    driverInfo: string | null;
    @ApiProperty()
    @Expose()
    @IsDecimal()
     @IsOptional()
    price: number | null;
    @ApiProperty()
    @Expose()
    @IsString()
     @IsOptional()
    company: string | null;
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
     @IsOptional()
    rentStartDate: Date | null;
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
     @IsOptional()
    rentEndDate: Date | null;

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
    @IsNotEmpty()
     @IsOptional()
    workhouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}


export class UpdateWorkhouseRentStatusDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number | null;

    @ApiProperty()
    @Expose()
    @IsEnum(workhouseRentStatus)
    @IsOptional()
    status: workhouseRentStatus | null;

      @ApiProperty()
    @Expose()
    @IsString()
    statusDescription: string;
}