import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class ResetPasswordCodeCreateDto {
    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    waiting: boolean;
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    waitingSecond: number;
    @Expose()
    @IsString()
    @IsNotEmpty()
    waitingTime: string;

}
export class newResetPasswordCodeDto {

    @ApiProperty({ description: 'The username for Reset Password' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    userName: string;
}
export class validateResetPasswordCodeDto {
    @ApiProperty({ description: 'The username for Reset Password' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    userName: string;

    @ApiProperty({ description: 'The code for Reset Password' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;
}

export class EmailResetPasswordCodeCreateDto {
    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    waiting: boolean;
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    watingSecond: number;
    @Expose()
    @IsString()
    @IsNotEmpty()
    watingTime: string;

}

export class validateEmailResetPasswordCodeDto {

    @ApiProperty({ description: 'The code for Reset Password' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}



export class PhoneResetPasswordCodeCreateDto {
    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    waiting: boolean;
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    watingSecond: number;
    @Expose()
    @IsString()
    @IsNotEmpty()
    watingTime: string;

}

export class validatePhoneResetPasswordCodeDto {

    @ApiProperty({ description: 'The code for Reset Password' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;

    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' })
    @IsNotEmpty()
    @ApiProperty()
    phone: string

}



