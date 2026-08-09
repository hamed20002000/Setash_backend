import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";
import { SystemOperationListDto } from "../user/system-opearion.dto";


export class MenuListDto {
    @ApiProperty({ description: 'Category Id' })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Name' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Icon' })
    @Expose()
    icon: string;
    @ApiProperty({ description: 'URL' })
    @Expose()
    url: string | null;

    @ApiProperty({ description: 'Depth' })
    @Expose()
    depth: number;

    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;

    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    parentId: number | null;

    @ApiProperty({ type: () => [MenuListDto], description: 'Children Menu' })
    @Expose()
    @Type(() => MenuListDto)
    menus?: MenuListDto[];

    @ApiProperty({ description: 'The list of the menu\'s operations' })
    @Expose()
    systemOperations: SystemOperationListDto[];
}

export class CreateMenuDto {
    @ApiProperty({ description: 'Menu Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'Menu Icon' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    icon: string

    @ApiProperty({ description: 'URL' })
    @Expose()
    @IsString()
    @IsOptional()
    url: string | null;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    @IsOptional()
    parentId: number | null;

    @ApiProperty()
    @Expose()
    @IsNumber()
    order: number;


}

export class CreateMenuOperationsDto {
    @ApiProperty({ description: 'Menu Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    menuId: number
    @ApiProperty({ description: 'The list of the menu\'s operations' })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    OperationIds: number[];
}

export class UpdateMenuDto {
    @ApiProperty({ description: 'Category Id' })
    @Expose()
    @IsNumber()
    id: number
    @ApiProperty({ description: 'Menu new Name' })
    @Expose()
    @IsString()
    @IsOptional()
    newname: string

    
      @ApiProperty({ description: 'Icom' })
    @Expose()
    @IsString()
    @IsOptional()
    icon: string

    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;
    @ApiProperty({ description: 'parent Id' })
    @Expose()
    @IsNumber()
    @IsOptional()
    parentId: number | null;
    @ApiProperty({ description: 'URL' })
    @Expose()
    @IsString()
    @IsOptional()
    url: string | null;
    @ApiProperty()
    @Expose()
    @IsNumber()
    @IsOptional()
    order: number | null;
}



