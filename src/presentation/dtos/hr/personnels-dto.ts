import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { bloodType } from "src/domain/enums/bloodType.enum";
import { educationStatus } from "src/domain/enums/educationStatus.enum";
import { maritalStatus } from "src/domain/enums/maritalStatu.enum";
import { personnelGroup } from "src/domain/enums/pesonalGroup.enum";
import { recordStatus } from "src/domain/enums/recordstatus.enum";
import { salaryAccrualMethod } from "src/domain/enums/salaryAccrualMethod.enum";
import { salaryType } from "src/domain/enums/salaryType.enum";
import { sex } from "src/domain/enums/sex.enum";
import { AttachmentDto } from "../initial-operations/attachment-dto";
import exp from "constants";

export class CreatePersonnelDto {

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  imageSrc: string | null;
  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  family: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  identityNumber: string;

  @ApiProperty()
  @Expose()

  @IsDate()
  @Type(() => Date)
  workStartDate: Date;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  workEndDate: Date | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  insuranceNumber: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(sex)
  sex: sex;

  @ApiProperty()
  @Expose()
  @IsEnum(salaryType)
  salaryType: salaryType;

  @ApiProperty()
  @Expose()
  @IsEnum(salaryAccrualMethod)
  salaryAccrualMethod: salaryAccrualMethod;

  @ApiProperty()
  @Expose()
  @IsNumber()
  salary: number;

  @ApiProperty()
  @Expose()
  @IsEnum(personnelGroup)
  group: personnelGroup;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  birthPlace: string | null;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty()
  @Expose()
  @IsEnum(maritalStatus)
  @IsOptional()
  maritalStatus: maritalStatus | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  fatherName: string;

  @ApiProperty()
  @Expose()
  @IsEnum(bloodType)
  @IsOptional()
  bloodType: bloodType | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @Expose()
  @IsEnum(educationStatus)
  educationStatus: educationStatus;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  iban: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  telephone: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  mobile: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  positionId: number;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  hasISG: boolean | null;

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;
}

export class UpdatePersonnelDto {

  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  imageSrc: string | null;
  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  name: string | null;
  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  family: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  identityNumber: string | null;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  workStartDate: Date | null;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  workEndDate: Date | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  insuranceNumber: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(sex)
  @IsOptional()
  sex: sex | null;

  @ApiProperty()
  @Expose()
  @IsEnum(salaryType)
  @IsOptional()
  salaryType: salaryType | null;

  @ApiProperty()
  @Expose()
  @IsEnum(salaryAccrualMethod)
  @IsOptional()
  salaryAccrualMethod: salaryAccrualMethod | null;

  @ApiProperty()
  @Expose()
  @IsEnum(personnelGroup)
  @IsOptional()
  group: personnelGroup | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  birthPlace: string | null;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthDate: Date | null;

  @ApiProperty()
  @Expose()
  @IsEnum(maritalStatus)
  @IsOptional()
  maritalStatus: maritalStatus | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  fatherName: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(bloodType)
  @IsOptional()
  bloodType: bloodType | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address: string | null;

  @ApiProperty()
  @Expose()
  @IsEnum(educationStatus)
  @IsOptional()
  educationStatus: educationStatus | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  iban: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  telephone: string | null;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsOptional()
  mobile: string | null;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  positionId: number | null;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  hasISG: boolean | null;

  @ApiProperty({ type: () => [AttachmentDto], description: 'Attachments', nullable: true })
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @IsArray()
  @IsOptional()
  attachments?: AttachmentDto[] | null;

  @ApiProperty()
  @Expose()
  @IsEnum(recordStatus)
  @IsOptional()
  recordStatus: recordStatus | null;
}

export class PersonnelSalaryDto {

  @ApiProperty()
  @Expose()
  @IsNumber()
  personnelId: number;


  @ApiProperty()
  @Expose()
  @IsNumber()
  salary: number;


}