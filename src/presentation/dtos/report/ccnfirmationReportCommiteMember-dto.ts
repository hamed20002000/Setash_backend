import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {  IsBoolean, IsNumber } from "class-validator";


export class CreateConfirmationReportCommiteMemberDto {

    @ApiProperty()
    @Expose()
    @IsNumber()
    commiteMembersId: number;

    @ApiProperty()
    @Expose()
    @IsNumber()
    confirmationProjectReportId: number;



    @ApiProperty()
    @Expose()
    @IsBoolean()
    memberStatus: boolean;

}


