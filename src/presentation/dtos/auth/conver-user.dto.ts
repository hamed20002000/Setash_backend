import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/presentation/helpers/compare-password";

export class ConvertGoogleUserDto {
    @ApiProperty({ description: 'gmail', minLength: 8, maxLength: 20 })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty({ description: 'The password for the user', minLength: 8, maxLength: 20 })
    @IsString()
    @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
    @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' })
    password: string;

    @ApiProperty({ description: 'Re-enter the password to confirm' })
    @IsString()
    @Match('password', { message: 'Passwords do not match.' })
    rePassword: string;
}
export class ConvertAppleUserDto {
    @ApiProperty({ description: 'appleid', minLength: 8, maxLength: 20 })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty({ description: 'The password for the user', minLength: 8, maxLength: 20 })
    @IsString()
    @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
    @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' })
    password: string;

    @ApiProperty({ description: 'Re-enter the password to confirm' })
    @IsString()
    @Match('password', { message: 'Passwords do not match.' })
    rePassword: string;
}
export class GoogleTokenDto{
    @ApiProperty({ description: 'The google token' })
    @IsString()
    token:string;
}

export class AppleTokenDto{
    @ApiProperty({ description: 'The apple token' })
    @IsString()
    token:string;
}