import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CommiteMemberPosition } from "src/domain/enums/commiteMember.enum";
import { leaveStatus } from "src/domain/enums/leaveStatus.enum";
import { leaveType } from "src/domain/enums/leaveType.enum";
import { projectType } from "src/domain/enums/projectType.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateCommiteMemberDto {

    @ApiProperty()
    @Expose()
    @IsString()
    name: string;

    @ApiProperty()
    @Expose()
    @IsString()
    family: string;

    @ApiProperty()
    @Expose()
    @IsEnum(CommiteMemberPosition)
    position: CommiteMemberPosition;

}

export class UpdateCommiteMemberDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;

    @ApiProperty({ required: false })
    @Expose()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ required: false })
    @Expose()
    @IsString()
    @IsOptional()
    family?: string;

    @ApiProperty({ required: false })
    @Expose()
    @IsEnum(CommiteMemberPosition)
    @IsOptional()
    position?: CommiteMemberPosition;

    @ApiProperty({ required: false })
    @Expose()
    @IsEnum(recordStatus)
    @IsOptional()
    recordStatus?: recordStatus;

}

