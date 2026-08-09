import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/presentation/controllers/users/user.controller';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Positions } from 'src/domain/entities/Positions';
import { PositionRepository } from 'src/infrastructure/repositories/hr/position.repository';
import { PositionService } from '../position.service';
import { HrController } from 'src/presentation/controllers/hr/hr.controller';
import { Users } from 'src/domain/entities/Users';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { UserService } from '../../user/user.service';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { Menus } from 'src/domain/entities/Menus';
import { MenuOperations } from 'src/domain/entities/MenuOperations';
import { RoleService } from '../../user/role.service';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { RoleMenuOperationRepository } from 'src/infrastructure/repositories/user/role-menu-operation.repository';
import { SystemOperationService } from '../../admin/system-operation.service';
import { UserMenuOperationRepository } from 'src/infrastructure/repositories/user/user-menu-operation.repository';
import { UserRoleRepository } from 'src/infrastructure/repositories/user/user-role.repository';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { MenuOperationService } from '../../admin/menu-operation.service';
import { MenuOperationRepository } from 'src/infrastructure/repositories/admin/menu-operation.repository';
import { Personnels } from 'src/domain/entities/Personnels';
import { PersonnelsRepository } from 'src/infrastructure/repositories/hr/personnels.repository';
import { PersonnelsService } from '../personnels.service';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeavesRepository } from 'src/infrastructure/repositories/hr/leaves.repository';
import { LeavesService } from '../leaves.service';
import { LeaveHistories } from 'src/domain/entities/LeaveHistories';
import { LeaveHistoriesService } from '../leaveHistories.service';
import { LeaveHistoriesRepository } from 'src/infrastructure/repositories/hr/leaveHistory.repository';
import { NotificationsGateway } from '../../notificatin/notifications.gateway';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { SystemNotificationsService } from '../../notificatin/systemNotifications.service';
import { SystemNotificationsRepository } from 'src/infrastructure/repositories/notification/system-notifications.repository';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { PersonnelWorkPlacesRepository } from 'src/infrastructure/repositories/hr/personnelWorkPlace.repository';
import { PersonnelWorkPlacesService } from '../personnelWorkPlaces.service';
import { Requests } from 'src/domain/entities/Requests';
import { RequestsService } from '../requests.service';
import { RequestsRepository } from 'src/infrastructure/repositories/hr/requsts.repository';
import { RollcallsService } from '../rollcals.service';
import { RollCallRepository } from 'src/infrastructure/repositories/hr/rollCals.repository';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { ConsignmentsService } from '../consignments.service';
import { ConsignmentsRepository } from 'src/infrastructure/repositories/hr/consignments.repository';
import { Consignments } from 'src/domain/entities/Consignments';
import { PersonnelConsignedsRepository } from 'src/infrastructure/repositories/hr/personnelConsigneds.repository';
import { PersonnelConsignedsService } from '../personnelConsigneds.service';
import { PersonnelConsigneds } from 'src/domain/entities/PersonnelConsigneds';
import { ConsignmentNos } from 'src/domain/entities/ConsignmentNos';
import { ConsignmentNosService } from '../consignmentNo.service';
import { ConsignmentNosRepository } from 'src/infrastructure/repositories/hr/consignmentsNo.repository';
import { RoleMenuOperationService } from '../../user/roleMenuOperation.service';
import { StoreService } from '../../admin/store.service';
import { Stores } from 'src/domain/entities/Stores';
import { StoreRepository } from 'src/infrastructure/repositories/admin/store.repository';
import { StoreTransactions } from 'src/domain/entities/StoreTransactions';
import { PersonnelSalary } from 'src/domain/entities/PersonnelSalary';
import { PersonnelSalaryService } from '../personnelSalary.service';
import { PersonnelSalaryRepository } from 'src/infrastructure/repositories/hr/personnelSalary.repository';
import { UserRoleService } from '../../user/userRole.service';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { PasswordService } from '../../helper/password.service';




@Module({
  imports: [
    TypeOrmModule.forFeature([Positions, Users, Roles, RoleMenuOperations, SystemOperations, UserMenuOperations, UserRoles, Menus,
      MenuOperations,Personnels,Leaves,LeaveHistories,SystemNotifications,PersonnelWorkPlaces,Requests,Rollcalls, Consignments,PersonnelConsigneds,
      ConsignmentNos,Stores,StoreTransactions,PersonnelSalary,NotificationLists,RoleNotificationLists,UserNotificationLists
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [HrController],
  providers: [
    UserService,
    RoleService,
    BaseRepository,
    UserRepository,
    RoleRepository,
    RoleMenuOperationRepository,
    RoleMenuOperations,
    SystemOperationService,
    UserMenuOperationRepository,
    UserMenuOperations,
    UserRoleRepository, Menus, MenuOperations, RoleMenuOperations,
    SystemOperationService, SystemOperationRepository, MenuOperationService, MenuOperationRepository,
    PositionRepository,
    PositionService,
    BaseRepository,
    PersonnelsRepository,
    PersonnelsService,
    LeavesRepository,
    LeavesService,
    LeaveHistoriesRepository,
    LeaveHistoriesService,
    NotificationsGateway,
    SystemNotificationsRepository,
    SystemNotificationsService,
    PersonnelWorkPlacesRepository,
    PersonnelWorkPlacesService,
    RequestsRepository,
    RequestsService,
    RollcallsService,
    RollCallRepository,
    ConsignmentsService,
    ConsignmentsRepository,
    PersonnelConsignedsService,
    PersonnelConsignedsRepository,  
    ConsignmentNosService,
    ConsignmentNosRepository,    
    RoleMenuOperationService,
    StoreService,
    StoreRepository,
    PersonnelSalaryService,
    PersonnelSalaryRepository,   
    UserRoleService,
    PasswordService
  ],
  exports: [PositionRepository,
    PositionService, UserService,
    RoleService,
    BaseRepository,
    UserRepository,
    RoleRepository,
    RoleMenuOperationRepository,
    RoleMenuOperations,
    SystemOperationService,
    UserMenuOperationRepository,
    UserMenuOperations,
    UserRoleRepository, Menus, MenuOperations, RoleMenuOperations,
    SystemOperationService, SystemOperationRepository, MenuOperationService, MenuOperationRepository,
    PersonnelsRepository,
    PersonnelsService,
    LeavesRepository,
    LeavesService,
    LeaveHistoriesRepository,
    LeaveHistoriesService, NotificationsGateway,
    SystemNotificationsRepository,
    SystemNotificationsService,
    PersonnelWorkPlacesRepository,
    PersonnelWorkPlacesService,
    RequestsRepository,
    RequestsService,
    RollcallsService,
    RollCallRepository,
    ConsignmentsService,
    ConsignmentsRepository,
    PersonnelConsignedsService,
    PersonnelConsignedsRepository,
    ConsignmentNosService,
    ConsignmentNosRepository,
    RoleMenuOperationService,
    StoreService,
    StoreRepository,
    PersonnelSalaryService,
    PersonnelSalaryRepository,
    UserRoleService
  ]
})
export class HrModule { }
