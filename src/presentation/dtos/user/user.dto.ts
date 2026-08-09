import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isString, Length, Matches, MaxLength, MinLength } from "class-validator";
import { VerificationCodeCreateDto } from "./user-verification-code.dto";
import { IsNotReservedUsername, IsUsernameValid } from "src/presentation/helpers/check-username";
import { Match } from "src/presentation/helpers/compare-password";
import { SystemOperationListDto } from "./system-opearion.dto";
import { RoleListDto } from "./role.dto";
import { Roles } from "src/domain/entities/Roles";

export class UserDto {
    @ApiProperty({ description: 'user Id' })
    @Expose()
    id: string
    @ApiProperty({ description: 'The username of the user' })
    @Expose()
    username: string;
    @ApiProperty({ description: 'The profile image of the user' })
     @Expose()
    imageSrc: string;
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    recordStatus: number;
    @ApiProperty({ description: 'CreateAt' })
    @Expose()
    createAt: Date;
    @ApiProperty({ description: 'The list of the user\'s roles' })
    @Expose()
    roles: Roles[];
    @ApiProperty({ description: 'The list of the role\'s operations' })
    @Expose()
    systemOperations: SystemOperationListDto[];
}
export class CreateUserOperationsDto {
    @ApiProperty({ description: 'user Id' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    UserId: string
    @ApiProperty({ description: 'The list of the user\'s operations' })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    menueOperationIds: number[];
}
export class CreateUserRolesDto {
    @ApiProperty({ description: 'user Id' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    UserId: string
    @ApiProperty({ description: 'The list of the user\'s roles' })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    roleIds: number[];
}

export class UserUpdateDto {
    @ApiProperty({ description: 'user Id' })
    @Expose()
    @IsNotEmpty()
    id: string
    @ApiProperty({ description: 'The username of the user' })
    @Expose()
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'The username of the user', minLength: 5, maxLength: 320 })
    @IsString()
    @Length(5, 320)
    @IsNotReservedUsername({ message: "This username is not allowed." })
    username: string;
    @ApiProperty({ description: 'The profile image of the user' })
    @Expose()
    @IsString()
    @IsOptional()
    @IsString()
    imageSrc: string;
    @ApiProperty({ description: 'RecordStatus' })
    @Expose()
    @IsNumber()
    @IsOptional()
    recordStatus: number;

}

export class ForgotPasswordDto {
    @ApiProperty({ description: 'The username of the user' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The username of the user', minLength: 5, maxLength: 320 })
    @IsString()
    @Length(5, 320)
    @IsNotReservedUsername({ message: "This username is not allowed." })
    username: string;

}



export class ResetPasswordDto {


    @ApiProperty({ description: 'The password for the user', minLength: 8, maxLength: 20 })
    @IsString()
    @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
    @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
    /*  @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' }) */
    password: string;

    @ApiProperty({ description: 'Re-enter the password to confirm' })
    @IsString()
    @Match('password', { message: 'Passwords do not match.' })
    rePassword: string;
}

export class CheckUserNameDto {
    @IsNotReservedUsername({ message: "This username is not allowed." })
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string
}

export class EmailVerificationDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string
}

export class PhoneVerificationDto {

    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' })
    @IsNotEmpty()
    @ApiProperty()
    phone: string
}