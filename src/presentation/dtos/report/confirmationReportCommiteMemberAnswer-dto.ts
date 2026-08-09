import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import { CommiteAnswer } from "src/domain/enums/commiteMember.enum";


export class CreateConfirmationReportCommiteMemberAnswerDto {
    @ApiProperty()
    @Expose()
    @IsNumber()
    answer: CommiteAnswer;

    @ApiProperty()
    @Expose()
    @IsNumber()
    ConfirmationReportCommiteMemberId: number;

}


