import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Length, Validate } from "class-validator";
import { Categories } from "src/domain/entities/Categories";
import { ItemUnits } from "src/domain/entities/ItemUnits";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";

export class ItemListDto {
    @ApiProperty({ description: 'Item  Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'Item title' })
    @Expose()
    name: string;
    @ApiProperty({ description: 'Item title' })
    @Expose()
    code: string;
    @ApiProperty({ description: 'Description' })
    @Expose()
    description: string;
    @ApiProperty({ description: 'Abbreviation' })
    @Expose()

    abbreviation: string | null;
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;
    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;

    @ApiProperty({ description: 'category' })
    @Expose()
    category: Categories;

    @ApiProperty({ description: 'unit' })
    @Expose()
    unit: ItemUnits;
    
      @ApiProperty({ description: 'item weight' })
    @Expose() 
    @IsDecimal()
    weight: number|null;

}

export class CreateItemDto {

    @ApiProperty({ description: 'Item title' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({ description: 'code' })
    @Expose()
    @IsOptional()
    @IsString()
    code: string;
    @ApiProperty({ description: 'Description' })
    @Expose()
    @IsOptional()
    @IsString()
    description: string;
    @ApiProperty({ description: 'Abbreviation' })
    @Expose()
    @IsString()
    @IsOptional()
    @Length(4, 4, { message: 'Abbreviation must be exactly 4 characters long' })
    abbreviation: string | null;
    @ApiProperty({ description: 'category  Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    categoryId: number
    @ApiProperty({ description: 'item unit  Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    itemUnitId: number

      @ApiProperty({ description: 'item weight' })
    @Expose()
    @IsNumber()
    @IsOptional()
    weight: number;
}

export class UpdateItemDto {
    @ApiProperty({ description: 'Item  Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    id: number
    @ApiProperty({ description: 'Item Title' })
    @Expose()

    @IsOptional()
    @IsString()
    newName: string
    @IsOptional()
    @IsString()
    code: string
    @ApiProperty({ description: 'Description' })
    @Expose()
    @IsOptional()
    @IsString()
    description: string;
    @ApiProperty({ description: 'Abbreviation' })
    @Expose()
    @IsString()
    @IsOptional()
    @Length(4, 4, { message: 'Abbreviation must be exactly 4 characters long' })
    abbreviation: string;
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;

    @ApiProperty({ description: 'category  Id' })
    @Expose()
    @IsNumber()
    @IsOptional()
    categoryId: number
    @ApiProperty({ description: 'item unit  Id' })
    @Expose()
    @IsNumber()
    @IsOptional()
    itemUnitId: number
    
      @ApiProperty({ description: 'item weight' })
    @Expose()
    @IsNumber()
    @IsOptional()
    weight: number;
}



