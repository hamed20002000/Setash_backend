import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";

export class ItemUnitListDto {
    @ApiProperty({ description: 'Item unit Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'unit title' })
    @Expose()
      title: string;
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;
    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
}

export class CreateItemUnitDto {
    @ApiProperty({ description: 'Item unit title' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    title: string
}

export class UpdateItemUnitDto {
    @ApiProperty({ description: 'Item unit id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'Itme unit Title' })
    @Expose()
    @IsString()
    @IsOptional()
    newTitle: string
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;
}



