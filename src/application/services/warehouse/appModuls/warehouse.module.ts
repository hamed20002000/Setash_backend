import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/services/user/user.service';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { Users } from 'src/domain/entities/Users';
import { RoleRepository } from 'src/infrastructure/repositories/user/role.repository';
import { Roles } from 'src/domain/entities/Roles';
import { AuthModule } from 'src/auth/auth.module';
import { RoleMenuOperationRepository } from 'src/infrastructure/repositories/user/role-menu-operation.repository';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { UserRoleRepository } from 'src/infrastructure/repositories/user/user-role.repository';
import { Menus } from 'src/domain/entities/Menus';
import { UserMenuOperationRepository } from 'src/infrastructure/repositories/user/user-menu-operation.repository';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';
import { Drivers } from 'src/domain/entities/Drivers';
import { DriversRepository } from 'src/infrastructure/repositories/warehouse/driver.repository';
import { DriversService } from '../driver.service';
import { WarehouseController } from 'src/presentation/controllers/warehouse/warehouse.controller';
import { RoleService } from '../../user/role.service';
import { DriverVehicleRepository } from 'src/infrastructure/repositories/warehouse/driver-vehicle.repository';
import { DriverVehicleService } from '../driver-vehicli.service';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { ReceiptHeaders } from 'src/domain/entities/ReceiptHeaders';
import { ReceiptDetails } from 'src/domain/entities/ReceiptDetails';
import { ReceiptService } from '../receipt.service';
import { ReceiptRepository } from 'src/infrastructure/repositories/sale/receipt.repository';
import { WarehouseService } from '../../admin/warehouse.service';
import { WarehouseRepository } from 'src/infrastructure/repositories/admin/warehouse.repository';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseDispatchHeaders } from 'src/domain/entities/WarehouseDispatchHeaders';
import { WarehouseDispatchDetails } from 'src/domain/entities/WarehouseDispatchDetails';
import { WarehouseDispatchRepository } from 'src/infrastructure/repositories/warehouse/warehouse-dispatch.repository';
import { WarehouseDispatchService } from '../warehouse-dispatch.service';
import { WarehouseTransactions } from 'src/domain/entities/WarehouseTransactions';
import { Stores } from 'src/domain/entities/Stores';
import { StoreReceiptHeaders } from 'src/domain/entities/StoreReceiptHeaders';
import { StoreReceiptDetails } from 'src/domain/entities/StoreReceiptDetails';
import { StoreReceiptRepository } from 'src/infrastructure/repositories/store/receipt.repository';
import { StoreReceiptService } from '../../store/receipt.service';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { WarehouseDispatchHeaderStatusHistoriesRepository } from 'src/infrastructure/repositories/warehouse/warehouse-dispatch-header-status-histories.repository';
import { WarehouseDispatchHeaderStatusHistoriesService } from '../warehouse-dispatch-header-status-histories.sevice';
import { Projects } from 'src/domain/entities/Projects';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';
import { ProjectsService } from '../../project/project.service';
import { ProjectsRepository } from 'src/infrastructure/repositories/project/project.repository';
import { ProjectFirmsService } from '../../project/project-firm.service';
import { ProjectFirmsRepository } from 'src/infrastructure/repositories/project/project-firm.repository';
import { StoreDispatchHeaders } from 'src/domain/entities/StoreDispatchHeaders';
import { StoreDispatchDetails } from 'src/domain/entities/StoreDispatchDetails';
import { StoreDispatchHeaderStatusHistories } from 'src/domain/entities/StoreDispatchHeaderStatusHistories';
import { StoreDispatchRepository } from 'src/infrastructure/repositories/store/store-dispatch.repository';
import { StoreDispatchService } from '../../store/store-dispatch.service';
import { StoreDispatchHeaderStatusHistoriesRepository } from 'src/infrastructure/repositories/store/store-dispatch-header-status-histories.repository';
import { StoreDispatchHeaderStatusHistoriesService } from '../../store/store-dispatch-header-status-histories.sevice';
import { StoreService } from '../../admin/store.service';
import { StoreRepository } from 'src/infrastructure/repositories/admin/store.repository';
import { StoreTransactions } from 'src/domain/entities/StoreTransactions';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { ProjectPlanningRepository } from 'src/infrastructure/repositories/project/project-plannign.repository';
import { ProjectPlanningImplementationRepository } from 'src/infrastructure/repositories/project/project-planning-implementation.repository';
import { ProjectPlanningImplementationService } from '../../project/project-plannig-implementation.service';
import { ForceMajors } from 'src/domain/entities/ForceMajors';
import { ForceMajorsRepository } from 'src/infrastructure/repositories/project/force-major.repository';
import { ForceMajorService } from '../../project/force-major.service copy';
import { ProjectPlanningService } from '../../project/project-plannig.service';
import { StoreDispatchNo } from 'src/domain/entities/StoreDispatchNos';
import { ProjectPlanningImplementationDatesService } from '../../project/project-planning-implementation-dates.service';
import { ProjectPlanningImplementationDatesRepository } from 'src/infrastructure/repositories/project/project-planning-implementation-dates.repository';
import { ProjectPlanningImplementationDates } from 'src/domain/entities/ProjectPlanningImplementaionDates';
import { NotificationsGateway } from '../../notificatin/notifications.gateway';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { SystemNotificationsRepository } from 'src/infrastructure/repositories/notification/system-notifications.repository';
import { SystemNotificationsService } from '../../notificatin/systemNotifications.service';
import { WorkhouseRents } from 'src/domain/entities/WorkhouseRents';
import { WorkhouseRentStatusHistories } from 'src/domain/entities/WorkkhouseRentStatusHistories';
import { WorkhouseRentsRepository } from 'src/infrastructure/repositories/warehouse/workhouse-rent.repository';
import { WorkhouseRentsService } from '../workhouse-rent.service';
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { CarWarehouseDetailService } from '../../admin/carWarhouseDetail.service';
import { CarWarehousedetailRepository } from 'src/infrastructure/repositories/admin/carWarehouseDetail.repository';
import { ConsignedCarService } from '../consignedCar.service';
import { ConsignedCarRepository } from 'src/infrastructure/repositories/warehouse/consignedCar.repository';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { CarFuels } from 'src/domain/entities/CarFuels';
import { CarFuelService } from '../carFuels.service';
import { CarFuelRepository } from 'src/infrastructure/repositories/warehouse/carFuels.repository';
import { PersonnelWorkPlacesService } from '../../hr/personnelWorkPlaces.service';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { PersonnelWorkPlacesRepository } from 'src/infrastructure/repositories/hr/personnelWorkPlace.repository';
import { UserRoleService } from '../../user/userRole.service';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { MenuOperationService } from '../../admin/menu-operation.service';
import { MenuOperationRepository } from 'src/infrastructure/repositories/admin/menu-operation.repository';
import { MenuOperations } from 'src/domain/entities/MenuOperations';
import { PasswordService } from '../../helper/password.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([Drivers, Users, UserMenuOperations, Roles, UserRoles, UserMenuOperations, RoleMenuOperations,
      SystemOperations, Menus, DriverVehicles, ReceiptHeaders, ReceiptDetails, Warehouses, WarehouseDispatchHeaders,
      WarehouseDispatchDetails, WarehouseTransactions, Stores, StoreReceiptHeaders, StoreReceiptDetails, WarehouseDispatchHeaderStatusHistories,
      Projects, ProjectFirms, StoreDispatchHeaders, StoreDispatchDetails, StoreDispatchHeaderStatusHistories,
      StoreTransactions, ProjectPlanings, ProjectPlanningImplementation, ForceMajors, ProjectPlanningImplementationDates,SystemNotifications,
      WorkhouseRents,WorkhouseRentStatusHistories, CarWarehouseDetails, ConsignedCars,CarFuels,PersonnelWorkPlaces,
      NotificationLists, RoleNotificationLists, UserNotificationLists,MenuOperations
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [WarehouseController],
  providers: [
    DriversRepository,
    DriversService,
    UserService,
    UserRepository,
    UserMenuOperationRepository,
    RoleRepository,
    RoleService,
    UserMenuOperationRepository,
    UserRoleRepository,
    RoleMenuOperationRepository,
    DriverVehicleRepository,
    DriverVehicleService,
    ReceiptRepository,
    ReceiptService,
    WarehouseService,
    WarehouseRepository,
    WarehouseDispatchRepository,
    WarehouseDispatchService,
    StoreReceiptRepository,
    StoreReceiptService,
    WarehouseDispatchHeaderStatusHistoriesRepository,
    WarehouseDispatchHeaderStatusHistoriesService,
    ProjectsService,
    ProjectsRepository,
    ProjectFirmsService,
    ProjectFirmsRepository,
    StoreDispatchRepository,
    StoreDispatchService,
    StoreDispatchHeaderStatusHistoriesRepository,
    StoreDispatchHeaderStatusHistoriesService,
    StoreService,
    StoreRepository,
    ProjectPlanningRepository,
    ProjectPlanningService,
    ProjectPlanningImplementationRepository,
    ProjectPlanningImplementationService,
    ForceMajorsRepository,
    ForceMajorService,
    ProjectPlanningImplementationDatesService,
    ProjectPlanningImplementationDatesRepository,
    NotificationsGateway,
    SystemNotificationsRepository,
    SystemNotificationsService,
    WorkhouseRentsRepository,
    WorkhouseRentsService,
    CarWarehouseDetailService,
    CarWarehousedetailRepository,
    ConsignedCarService,
    ConsignedCarRepository,
    CarFuelRepository,
    CarFuelService,
    PersonnelWorkPlacesService,
    PersonnelWorkPlacesRepository,
    UserRoleService,
    MenuOperationService,
    MenuOperationRepository,
    PasswordService



  ],
  exports: [DriversService, DriversRepository, UserService, UserRepository, UserMenuOperationRepository, RoleRepository, RoleService,
    UserMenuOperationRepository, UserRoleRepository, RoleMenuOperationRepository, DriverVehicleService, DriverVehicleRepository,
    ReceiptService, ReceiptRepository, WarehouseService, WarehouseRepository, WarehouseDispatchRepository, WarehouseDispatchService,
    StoreReceiptService, StoreReceiptRepository, WarehouseDispatchHeaderStatusHistoriesService, WarehouseDispatchHeaderStatusHistoriesRepository,
    ProjectsService,
    ProjectsRepository,
    ProjectFirmsService,
    ProjectFirmsRepository,
    StoreDispatchRepository,
    StoreDispatchService,
    StoreDispatchHeaderStatusHistoriesRepository,
    StoreDispatchHeaderStatusHistoriesService,
    StoreService,
    StoreRepository,
    ProjectPlanningRepository,
    ProjectPlanningService,
    ProjectPlanningImplementationRepository,
    ProjectPlanningImplementationService,
    ForceMajorsRepository,
    ForceMajorService,
    ProjectPlanningImplementationDatesService,
    ProjectPlanningImplementationDatesRepository,
    NotificationsGateway,  WorkhouseRentsRepository,
    WorkhouseRentsService,
    CarWarehouseDetailService,
    CarWarehousedetailRepository,
    ConsignedCarService,
    ConsignedCarRepository,
    CarFuelRepository,
    CarFuelService
  ]
})
export class WarehouseModule { }
