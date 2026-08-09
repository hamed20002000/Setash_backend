import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, MaxLength, Matches, IsBoolean, Length, IsArray, ArrayMinSize, ArrayNotEmpty, IsOptional } from 'class-validator';
import { TrueOnly } from 'src/presentation/helpers/check-true-boolean';
import { IsNotReservedUsername, IsUsernameValid } from 'src/presentation/helpers/check-username';
import { Match } from 'src/presentation/helpers/compare-password';


export class registerUserDto {


  @ApiProperty({ description: 'The username of the user', minLength: 5, maxLength: 320 })
  @IsString()
  @Length(5, 320)
  /*  @IsUsernameValid() */
  @IsNotReservedUsername({ message: "This username is not allowed." })
  username: string;

  @ApiProperty({ description: 'The password for the user', minLength: 8, maxLength: 20 })
  @IsString()
  @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  /* @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' }) */
  password: string;

  @ApiProperty({ description: 'Re-enter the password to confirm' })
  @IsString()
  @Match('password', { message: 'Passwords do not match.' })
  rePassword: string;
  @ApiProperty({ description: 'The profile image of the user' })
  @IsString() 
   imageSrc: string;
  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'List of selected roles' })
  roleNames: string[];

}

export class changePasswordDto {
  @ApiProperty({ description: 'The username of the user', minLength: 5, maxLength: 320 })
  @IsString()
  @Length(5, 320)
  /*  @IsUsernameValid() */
  @IsNotReservedUsername({ message: "This username is not allowed." })
  username: string
  @ApiProperty({ description: 'The current password for the user', minLength: 8, maxLength: 20 })
  @IsString()
  @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  currentPassword: string
  @ApiProperty({ description: 'The new password for the user', minLength: 8, maxLength: 20 })
  @IsString()
  @MinLength(8, { message: 'Password is too short. It must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password is too long. It can be at most 20 characters long.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  newPassword: string
}

export class resetPasswordDto {
  @ApiProperty({ description: 'The username of the user', minLength: 5, maxLength: 320 })
  @IsString()
  @Length(5, 320)
  /*  @IsUsernameValid() */
  @IsNotReservedUsername({ message: "This username is not allowed." })
  username: string

}



