import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IS_LENGTH, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class UserContactUsListDto {
    @ApiProperty()
    @Expose()
    id: number;
    @ApiProperty()
    @Expose()
    subject: string;
    @ApiProperty()
    @Expose()
    description: string;
    @ApiProperty()
    @Expose()
    userName: string;
    @ApiProperty()
    @Expose()
    recordStatus: recordStatus;
}

export class CreateUserContactUsDto {

    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'symbol is too short. It must be at least 3 characters long.' })

    subject: string;
    @ApiProperty()
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'symbol is too short. It must be at least 3 characters long.' })
   
    description: string;
   
}

