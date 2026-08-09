import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { leaveStatus } from "src/domain/enums/leaveStatus.enum";
import { leaveType } from "src/domain/enums/leaveType.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";

export class CreateLeaveDto {


    @ApiProperty()
    @Expose()
    @IsEnum(leaveType)
    type: leaveType;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @Expose()
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty()
    @Expose()
    @IsNumber()
    personnelId: number;
}


export class UpdateLeaveStatusDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    id: number;
    @ApiProperty()
    @Expose()    
    @IsEnum(leaveStatus)   
     status: leaveStatus;

}


export class LeaveDaysDto {
     @ApiProperty()
    @Expose()
    @IsNumber()
    age: number;
      @ApiProperty()
    @Expose()
    @IsNumber()
    yearOfWork: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    official: number;
    @ApiProperty()
    @Expose()
    @IsNumber()
    remaining: number;
}
