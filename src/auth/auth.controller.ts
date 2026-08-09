import { Controller, Post, Body, HttpException, HttpStatus, Get, UseGuards, Req, Put, Query, Session, Res, Param, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/presentation/dtos/auth/login-dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { UserService } from 'src/application/services/user/user.service';
import { Users } from 'src/domain/entities/Users';
import { EmptyError } from 'rxjs';

import { GenericMapper } from 'src/presentation/helpers/mapper-classes';
import { UserDto } from 'src/presentation/dtos/user/user.dto';

import { AppleTokenDto, ConvertAppleUserDto, ConvertGoogleUserDto, GoogleTokenDto } from 'src/presentation/dtos/auth/conver-user.dto';
import { log } from 'console';
import { PasswordService } from 'src/application/services/helper/password.service';
import { Response } from 'express';
import { promises } from 'dns';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as fs from "fs";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';
import { AppleAuthService, AppleUser } from 'src/application/services/helper/apple-atuh.service';
import { ImageService } from 'src/application/services/helper/image.service';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';


@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private passwordService: PasswordService,
    private readonly configService: ConfigService,
    private appleService: AppleAuthService,
    private readonly imageService: ImageService
  ) { }
  @Get('download')
  async downloadImage(@Query('url') imageUrl: string) {
    if (!imageUrl) {
      return { message: 'Image URL is required' };
    }

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
    const savedPath = await this.imageService.downloadImage(imageUrl, fileName);

    return { message: 'Image saved successfully', path: savedPath };
  }
  @Post('login')
  @ApiOperation({ summary: 'get token' })  // Operation description
  @ApiResponse({ status: 400, description: 'Bad request' })  // Error response
  @ApiResponse({ status: 200, description: 'Successfull login', type: String })
  async login(@Body() user: LoginDto) {

    const specification = new UsernameSpecification(user.username);

    var checkUser = await this.userService.getWithSpecification(specification, null, null);

    if (checkUser.length > 1) {
      throw new HttpException("The user is not found!", HttpStatus.NOT_FOUND);

    }
    if (checkUser[0].recordStatus != recordStatus.Active) {
      throw new HttpException("The user is InActive!", HttpStatus.BAD_REQUEST);

    }
    var result = await this.authService.login(user);
    if (!result.isAuthenticate) {
      throw new HttpException(result.message, HttpStatus.UNAUTHORIZED);
    }
    return result.access_token;
  }








}
