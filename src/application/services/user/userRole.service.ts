import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';



import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { BaseService } from '../base.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Users } from 'src/domain/entities/Users';
import { Roles } from 'src/domain/entities/Roles';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { RoleNamesSpecification, RoleSpecification } from 'src/application/specifications/user/role-specifications';


import { ForgotPasswordDto, ResetPasswordDto } from 'src/presentation/dtos/user/user.dto';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { EmailService } from '../helper/email-service';
import { use } from 'passport';
import { PasswordService } from '../helper/password.service';


import { FindOptionsRelations } from 'typeorm';


import { UserRoles } from 'src/domain/entities/UserRoles';
import { UserRoleRepository } from 'src/infrastructure/repositories/user/user-role.repository';
import { UserMenuOperationRepository } from 'src/infrastructure/repositories/user/user-menu-operation.repository';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';


@Injectable()
export class UserRoleService extends BaseService<UserRoles> {
  constructor(

    private readonly userRoleRepository: UserRoleRepository,
   
  ) {
    super(userRoleRepository);
  }
 
}
