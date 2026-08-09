import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AttachmentDto } from "../initial-operations/attachment-dto";
import { requestStatus } from "src/domain/enums/requestSatus.enum";

export class CreateRequestDto {

    @ApiProperty()
    @Expose()
    @IsString()
    subject: string;


    @ApiProperty()
    @Expose()
    @IsString()
    description: string;

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
    workhouseId: number | null;



}


export class UpdateRequestDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    subject: string | null;


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
    @IsOptional()
    workhouseId: number | null;
}

export class UpdateRequestStatusDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsEnum(requestStatus)
    status: requestStatus;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    statusDescription: string | null;
}