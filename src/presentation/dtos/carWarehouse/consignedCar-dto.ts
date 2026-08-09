import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";




export class CreatConsignedCarDto {
    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    kilometer: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    carWarhouseDetailId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    personnelId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workhouseId: number | null;

    @ApiProperty()
    @Expose()
    @IsBoolean()
    consigned: boolean;


}

export class UpdateConsignedCarDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    date: Date | null;

    @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    kilometer: number | null;



    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;
}
