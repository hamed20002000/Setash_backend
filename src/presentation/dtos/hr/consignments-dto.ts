import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { WorkPlaceType } from "src/domain/enums/workPlaceType.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";

export class CreateConsignmentsDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

     @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    placeId: number | null;

    @ApiProperty()
    @Expose()
    @IsEnum(WorkPlaceType)
    @IsOptional()
    placeType: WorkPlaceType | null;

    @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;

}

export class UpdateConsignmentsDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    name: string | null;

      @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    placeId: number | null;

    @ApiProperty()
    @Expose()
    @IsEnum(WorkPlaceType)
    @IsOptional()
    placeType: WorkPlaceType | null;

    @ApiProperty()
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus: recordStatus | null;


     @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AttachmentDto)
    @IsArray()
    @IsOptional()
    attachments?: AttachmentDto[] | null;
}