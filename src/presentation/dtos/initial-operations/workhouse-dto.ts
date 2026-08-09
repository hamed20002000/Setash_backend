import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsDate, IsDecimal, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AttachmentDto } from "./attachment-dto";
export class SubscriptionDto {
    @ApiProperty()
    @IsString()
    no: string;
    @ApiProperty()
    @IsString()
    owner: string;
    @ApiProperty()
    @IsString()
    title: string
}


export class CreateWorkhouseDto {
    @ApiProperty()
    @Expose()
    @IsString()
    name: string;
    @ApiProperty()
    @Expose()
    @IsString()
    code: string;
    @ApiProperty()
    @Expose()
    @IsString()
    address: string;

    @ApiProperty()
    @Expose()
    @IsNumber()
    workId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    regionId: number;
}

export class UpdateWorkhouseDto {

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
    code: string | null;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    address: string | null;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    regionId: number | null;

    @ApiProperty()
    @Expose()
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endDate: Date | null;
}

export class CreateWorkhouseDetailDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    owner: string;
    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    rentStartDate: Date | null;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    rentEndDate: Date | null;
    @ApiProperty({ type: Number, example: 12.50 })
    @Expose()
    @Type(() => Number)
    @IsNumber({ allowNaN: false }, { message: 'price must be a valid number' })
    @IsOptional()
    price: number | null;

    @ApiProperty({ type: () => [SubscriptionDto], description: 'Subscriptions', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => SubscriptionDto)
    @IsArray()
    @IsOptional()
    subscriptions?: SubscriptionDto[] | null;
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
    workhouseId: number;


}

export class UpdateWorkhouseDetailDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    owner: string;
    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    rentStartDate: Date | null;

    @ApiProperty({ type: String, format: 'date-time', required: false })
    @Expose()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    rentEndDate: Date | null;
    @ApiProperty({ type: Number, example: 12.50 })
    @Expose()
    @Type(() => Number)
    @IsNumber({ allowNaN: false }, { message: 'price must be a valid number' })
    @IsOptional()
    price: number | null;

    @ApiProperty({ type: () => [SubscriptionDto], description: 'Subscriptions', nullable: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => SubscriptionDto)
    @IsArray()
    @IsOptional()
    subscriptions?: SubscriptionDto[] | null;
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
    workhouseId: number;


}