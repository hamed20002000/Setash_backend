import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Validate } from "class-validator";
import { NotEqualValidator } from "src/presentation/helpers/not-equal-validatior";
import { SystemOperationListDto } from "./system-opearion.dto";
import { MenuOperations } from "src/domain/entities/MenuOperations";

export class RoleListDto {
    @ApiProperty({ description: 'Role Id' })
    @Expose()
    id: number
    @ApiProperty({ description: 'Role Name' })
    @Expose()
    name: string
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;
    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
    @ApiProperty({ description: 'The list of the role\'s operations' })
    @Expose()
    menuOperations: MenuOperations[];

}

export class CreateRoleDto {
    @ApiProperty({ description: 'Role Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string
}
export class CreateRoleMenuOperationsDto {
    @ApiProperty({ description: 'Role Id' })
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    roleId: number
    @ApiProperty({ description: 'The list of the role\'s operations' })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    menueOperationIds: number[];
}
export class UpdateRoleDto {
    @ApiProperty({ description: 'Role current Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Validate(NotEqualValidator, ['admin', 'client'], { message: 'Name cannot be admin or client' })
    name: string
    @ApiProperty({ description: 'Role new Name' })
    @Expose()
    @IsString()
    @IsOptional()
    @Validate(NotEqualValidator, ['admin', 'client'], { message: 'Name cannot be admin or client' })
    newname: string
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;
}

export class DeleteRoleDto {
    @ApiProperty({ description: 'Role current Name' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Validate(NotEqualValidator, ['admin', 'client'], { message: 'Name cannot be admin or client' })
    name: string

}

