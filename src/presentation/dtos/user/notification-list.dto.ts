import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NotificationListDto {
  @ApiProperty({ description: 'Notification list Id' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Notification list name' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Notification list Turkish name' })
  @Expose()
  nameTr: string;
}

export class RoleNotificationListDto {
  @ApiProperty({ description: 'Role Id' })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ description: 'Notification list ids' })
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  notificationListIds: number[];
}

export class UserNotificationListDto {
  @ApiProperty({ description: 'User Id' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Notification list ids' })
  @Expose()
  @IsArray()
  @IsNumber({}, { each: true })
  notificationListIds: number[];
}

export class CreateNotificationListDto {
  @ApiProperty({ description: 'Notification list name' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Notification list Turkish name' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  nameTr: string;
}

export class UpdateNotificationListDto {
  @ApiProperty({ description: 'Notification list Id' })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Notification list name' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Notification list Turkish name' })
  @Expose()
  @IsString()
  nameTr: string;
}
