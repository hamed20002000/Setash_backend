import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { TransmissionRowItmes } from "src/domain/entities/TransmissionRowItmes";
import { productStatus, transmissionProductStatus } from "src/domain/enums/channelrow-product-status.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { Column } from "typeorm";

export class CreateNetworkDto {

    @ApiProperty()
    @Expose()
    @IsString()
    title: string;

    @ApiProperty()
    @Expose()
    @IsString()
    description: string | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    workId: number;


}




export class UpdateNetworkDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    description: string | null;


    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    workId: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: recordStatus | null;

    @ApiProperty({ type: () => [UpdateNetworkTrAdiDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => UpdateNetworkTrAdiDto)
    @IsArray()
    @IsOptional()
    networkTrAdis?: UpdateNetworkTrAdiDto[];


}

export class UpdateNetworkTrAdiDto {
    @ApiProperty()
    @Expose()
    @IsString()
    title: string;
    @ApiProperty({ type: () => [UpdateChannelRowDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => UpdateChannelRowDto)
    @IsArray()
    channelRows?: UpdateChannelRowDto[];

}

export class UpdateChannelRowDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    productStatus: productStatus;
    @ApiProperty()
    @Expose()
    @IsString()
    title: string;

    @ApiProperty()
    @Expose()
    @IsString()
    label: string;

    @ApiProperty({ type: () => [UpdateChannelRowDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => UpdateChannelRowDto)
    @IsArray()
    childChannelRows?: UpdateChannelRowDto[];

    @ApiProperty({ type: Number })
    @Expose()
    @IsOptional()
    productTypeId: number;

    @ApiProperty({ type: () => [UpdateChannelRowItemDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => UpdateChannelRowItemDto)
    @IsArray()
    channelRowItems?: UpdateChannelRowItemDto[];


}

export class UpdateChannelRowItemDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    value: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    itemId: number;



}
export class CreateNetworkTransmissionRowDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    networkId: number;
    @ApiProperty({ type: () => [CreateTransmissionRowDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateTransmissionRowDto)
    @IsArray()
    createTransmissionRows?: CreateTransmissionRowDto[];

}

export class CreateTransmissionRowDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    distance: number;
    @ApiProperty()
    @Expose()
    @IsString()
    formulaTitle: string;
    @ApiProperty()
    @Expose()
    @IsNumber()
    fromProductTypeId: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    toProductTypeId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    productStatus: transmissionProductStatus;
    @ApiProperty({ type: () => [CreateTransmissionRowItmesDto] })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateTransmissionRowItmesDto)
    @IsArray()
    transmissionRowItmes?: CreateTransmissionRowItmesDto[];
}

export class CreateTransmissionRowItmesDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    value: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    itemId: number;
}

export class CreateNetworkTransmissionSummaryDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    networkId: number;
    @ApiProperty({ type: () => CreateTransmissionSummaryDto, isArray: true })
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => CreateTransmissionSummaryDto)
    @IsArray()
    transmissionSummaries?: CreateTransmissionSummaryDto[];

}


export class CreateTransmissionSummaryDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    itemId: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    weight: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    length: number;
    @ApiProperty()
    @Expose()
    @IsEnum(transmissionProductStatus)
    productStatus: transmissionProductStatus;
    @ApiProperty()
    @Expose()
    @IsNumber()
    dMMPercent: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    totalWeight: number;
}








