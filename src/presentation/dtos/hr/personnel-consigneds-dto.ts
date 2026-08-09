import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { WorkPlaceType } from "src/domain/enums/workPlaceType.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";

export class CreatePersonnelConsignedsDto {
    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    assignmentDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

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
    consignmentId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    personnelId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    parentId: number | null;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    returnDate: Date | null;

}

export class UpdatePersonelConsignmentsDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    assignmentDate: Date | null;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;

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
    consignmentId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    personnelId: number | null;

    @Expose()
    @IsNumber()
    @IsOptional()
    parentId: number | null;

     @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    returnDate: Date | null;



}