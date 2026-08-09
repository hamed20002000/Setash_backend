import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/presentation/controllers/users/user.controller';
import { UserService } from 'src/application/services/user/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Repository } from 'typeorm';
import { Users } from 'src/domain/entities/Users';
import { EmailService, OtpService } from '../../helper/email-service';

import { BaseRepository } from 'src/infrastructure/repositories/base.repository';

import { PasswordService } from '../../helper/password.service';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { RoleService } from '../role.service';

import { Roles } from 'src/domain/entities/Roles';

import { AuthModule } from 'src/auth/auth.module';
import { RoleMenuOperationRepository } from 'src/infrastructure/repositories/user/role-menu-operation.repository';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { SystemOperationService } from '../../admin/system-operation.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';

import { UserRoles } from 'src/domain/entities/UserRoles';
import { UserRoleRepository } from 'src/infrastructure/repositories/user/user-role.repository';
import { Menus } from 'src/domain/entities/Menus';
import { MenuOperations } from 'src/domain/entities/MenuOperations';
import { MenuOperationService } from '../../admin/menu-operation.service';
import { MenuOperationRepository } from 'src/infrastructure/repositories/admin/menu-operation.repository';
import { UserMenuOperationRepository } from 'src/infrastructure/repositories/user/user-menu-operation.repository';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';
import { RoleMenuOperationService } from '../roleMenuOperation.service';
import { UserRoleService } from '../userRole.service';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { NotificationListRepository } from 'src/infrastructure/repositories/notification/notification-list.repository';
import { RoleNotificationListRepository } from 'src/infrastructure/repositories/notification/role-notification-list.repository';
import { UserNotificationListRepository } from 'src/infrastructure/repositories/notification/user-notification-list.repository';
import { NotificationListService } from '../../notificatin/notification-list.service';
import { RoleNotificationListService } from '../../notificatin/role-notification-list.service';
import { UserNotificationListService } from '../../notificatin/user-notification-list.service';
import { NotificationsModule } from '../../notificatin/notifications.module';
import { ToolRegisterModule } from '../../agent/appModule/toolregister.module';
import { ToolRegister } from '../../agent/toolRegister';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, RoleMenuOperations, SystemOperations, UserMenuOperations, UserRoles, Menus, RoleMenuOperations,
      MenuOperations, UserRoles, NotificationLists, RoleNotificationLists, UserNotificationLists
    ]),
    forwardRef(() => AuthModule),
    NotificationsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RoleService,
    BaseRepository,
    UserRepository,
    RoleRepository,
    OtpService,
    PasswordService,
    EmailService,
    SystemOperationRepository,
    RoleMenuOperationRepository,
    RoleMenuOperations,
    SystemOperationService,
    UserMenuOperationRepository,
    UserMenuOperations,
    UserRoleRepository, Menus, MenuOperations, RoleMenuOperations,
    SystemOperationService, SystemOperationRepository, MenuOperationService, MenuOperationRepository,
    RoleMenuOperationService, RoleMenuOperationRepository,
    UserRoleService, UserRoleRepository,
    NotificationListRepository, RoleNotificationListRepository, UserNotificationListRepository,
    NotificationListService, RoleNotificationListService, UserNotificationListService,UserRoleRepository,UserService
  ],
  exports: [UserRepository, RoleRepository, PasswordService,
    UserService, RoleMenuOperationRepository, SystemOperationService,
    RoleMenuOperations, SystemOperationRepository, UserMenuOperationRepository, UserMenuOperations, UserRoleRepository,
    MenuOperationRepository, MenuOperationService, RoleMenuOperationService, RoleMenuOperationRepository, UserRoleService, UserRoleRepository,
    NotificationListRepository, RoleNotificationListRepository, UserNotificationListRepository,
    NotificationListService, RoleNotificationListService, UserNotificationListService,UserService,RoleService
  ]
})
export class UserModule { }
