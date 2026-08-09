import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AttachmentDto {
    @ApiProperty({ description: 'File URL' })
    @IsString()
    fileUrl: string;
}
