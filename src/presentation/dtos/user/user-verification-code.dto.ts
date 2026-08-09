import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class VerificationCodeCreateDto {
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

export class validateVerificationCodeDto {

    @ApiProperty({ description: 'The code for verifying' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;
}

export class EmailVerificationCodeCreateDto {
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

export class validateEmailVerificationCodeDto {

    @ApiProperty({ description: 'The code for verifying' })
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



export class PhoneVerificationCodeCreateDto {
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

export class validatePhoneVerificationCodeDto {

    @ApiProperty({ description: 'The code for verifying' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    code: string;

    @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' })
    @IsNotEmpty()
    @ApiProperty()
    phone: string

}



