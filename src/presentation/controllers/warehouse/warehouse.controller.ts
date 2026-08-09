import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpException, HttpStatus, Request, Put, BadRequestException, Req, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from '../../../application/services/user/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericMapper } from '../../helpers/mapper-classes';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAndClientRolesGuard, AdminRolesGuard } from 'src/auth/guards/roles.guard';
import { FindManyOptions, FindOptionsRelations, FindOptionsWhere } from 'typeorm';
import { DriversService } from 'src/application/services/warehouse/driver.service';
import { Drivers } from 'src/domain/entities/Drivers';
import { CreateDriverDto, CreateDriverVehicleDto, UpdateDriverDto, UpdateDriverVehicleDto } from 'src/presentation/dtos/warehouse/driver-dto';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { DriverVehicleService } from 'src/application/services/warehouse/driver-vehicli.service';
import { DriverVehicleByIdSpecification, DriverVehicleSpecification } from 'src/application/specifications/warehouse/driver-vehicle-specifications';
import { ReceiptHeaders } from 'src/domain/entities/ReceiptHeaders';
import { ReceiptService } from 'src/application/services/warehouse/receipt.service';
import { CreateBetweenReceiptDto, CreateReceiptDto, CreateReceiptForSendedFromStoreDto, UpdateBetweenReceiptDto, UpdateIsEnd, UpdateReceiptDto, UpdateReceiptForSendedFromStoreDto } from 'src/presentation/dtos/warehouse/receipt-dto';
import { WarehouseSpecification } from 'src/application/specifications/admin/warehouse-specifications';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseService } from 'src/application/services/admin/warehouse.service';
import { WarehouseDispatchHeaders } from 'src/domain/entities/WarehouseDispatchHeaders';
import { CreateBetweenWarehouseDispatchDto, CreateWarehouseDispatchDestructionDto, CreateWarehouseDispatchDto, UpdateBetweenWarehouseDispatchDto, UpdateWarehouseDispatchDestructionDto, UpdateWarehouseDispatchDto, UpdateWarehouseDispatchStatusDto } from 'src/presentation/dtos/warehouse/warhouse-dispatch-dto';
import { WarehouseDispatchService } from 'src/application/services/warehouse/warehouse-dispatch.service';
import { StoreReceiptService } from 'src/application/services/store/receipt.service';
import { StoreReceiptHeaders } from 'src/domain/entities/StoreReceiptHeaders';
import { CreateBetweenStoreReceiptDto, CreateStoreReceiptByInvoiceDto, CreateStoreReceiptDto, UpdateBetweenStoreReceiptDto, UpdateStoreReceiptByInvoiceDto, UpdateStoreReceiptDto } from 'src/presentation/dtos/store/receipt-dto';
import { WarehouseDispatchHeaderStatusHistoriesService } from 'src/application/services/warehouse/warehouse-dispatch-header-status-histories.sevice';
import { WarehouseDispatchHeaderStatusHistoriesSpecification } from 'src/application/specifications/warehouse/warehouseDispatchheaderSatusHistory-specifications';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';
import { ProjectFirmsService } from 'src/application/services/project/project-firm.service';
import { CreateProjectDto, CreateProjectFirmDto, ProjectOverallProgressDto, ProjectProgressDto, UpdateProjectDto, UpdateProjectFirmDto } from 'src/presentation/dtos/project/project-dto';
import { Projects } from 'src/domain/entities/Projects';
import { ProjectsService } from 'src/application/services/project/project.service';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { StoreDispatchHeaders } from 'src/domain/entities/StoreDispatchHeaders';
import { StoreDispatchService } from 'src/application/services/store/store-dispatch.service';
import { CreateBetweenStoreDispatchDto, CreateStoreDispatchDto, CreateStoreDispatchReturnToCenterDto, CreateStoreDispatchToCenterDto, UpdateBetweenStoreDispatchDto, UpdateStoreDispatchDto, UpdateStoreDispatchReturnToCenterDto, UpdateStoreDispatchStatusDto, UpdateStoreDispatchToCenterDto } from 'src/presentation/dtos/store/store-dispatch-dto';
import { StoreDispatchHeaderStatusHistoriesSpecification } from 'src/application/specifications/store/storeDispatchheaderSatusHistory-specifications';
import { StoreDispatchHeaderStatusHistoriesService } from 'src/application/services/store/store-dispatch-header-status-histories.sevice';
import { StoreDispatchHeaderStatusHistories } from 'src/domain/entities/StoreDispatchHeaderStatusHistories';
import { ProjectIsEndSpecification, ProjectSpecification } from 'src/application/specifications/project/project-specifications';
import { StoreService } from 'src/application/services/admin/store.service';
import { Stores } from 'src/domain/entities/Stores';
import { StoreSpecification } from 'src/application/specifications/admin/store-specifications';
import { ForceMajors } from 'src/domain/entities/ForceMajors';
import { ForceMajorService } from 'src/application/services/project/force-major.service copy';
import { CreateForceMajorDto, UpdateForceMajorDto } from 'src/presentation/dtos/project/forceMajor-dto';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningService } from 'src/application/services/project/project-plannig.service';
import { CreateProjectPlanningDto, CreateProjectPlanningImplementationDto, UpdateProjectPlanningDto, UpdateProjectPlanningImplementationDto } from 'src/presentation/dtos/project/projectPlanning-dto';
import { ProjectPlanningByProjectIdSpecification, ProjectPlanningSpecification } from 'src/application/specifications/project/project-planning-specifications';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { ProjectPlanningImplementationService } from 'src/application/services/project/project-plannig-implementation.service';
import { ProjectPlanningImplementationByProjectPlanningIdSpecification, ProjectPlanningImplementationSpecification } from 'src/application/specifications/project/project-planning-Implementation-specifications';
import { ProjectPlanningImplementationDates } from 'src/domain/entities/ProjectPlanningImplementaionDates';
import { ProjectPlanningImplementationDatesService } from 'src/application/services/project/project-planning-implementation-dates.service';
import { CreateProjectPlanningImpelimentationDateDto, UpdateProjectPlanningImpelimentationDateDto } from 'src/presentation/dtos/project/project-planning-impelimentation-date-dto';
import { ProjectPlanningImplementationDateByProjectPlanningIdSpecification, ProjectPlanningImplementationDatesSpecification } from 'src/application/specifications/project/project-planning-Implementation-date-specifications';
import { ChannelRows } from 'src/domain/entities/ChannelRows';
import { TransmissionRows } from 'src/domain/entities/TransmissionRows';
import { ProjectImplementationReportDto } from 'src/presentation/dtos/project/project-implementation-report.dto';
import { ChantierManagerKpiReportDto } from 'src/presentation/dtos/project/project-manager-kpi-report.dto';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { CarWarehouseDetailSpecification } from 'src/application/specifications/admin/car-warehouse-detail-specifications';
import { CarWarehouseDetailService } from 'src/application/services/admin/carWarhouseDetail.service';
import { CarWarehouses } from 'src/domain/entities/CarWarehouses';
import { CreateCarWarehouseDetailsDto, UpdateCarWarehouseDetailsDto } from 'src/presentation/dtos/carWarehouse/carWarhouseDetails-dto';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { ConsignedCarByCarWarehouseDetailIdSpecification, ConsignedCarByCarWarehouseIdSpecification, ConsignedCarByIdSpecification } from 'src/application/specifications/admin/consigned-car-specifications';
import { ConsignedCarService } from 'src/application/services/warehouse/consignedCar.service';
import { CreatConsignedCarDto, UpdateConsignedCarDto } from 'src/presentation/dtos/carWarehouse/consignedCar-dto';
import { Personnels } from 'src/domain/entities/Personnels';
import { CarFuels } from 'src/domain/entities/CarFuels';
import { CarFuelsByCarIdSpecification } from 'src/application/specifications/admin/car-fuels-specifications';
import { CarFuelService } from 'src/application/services/warehouse/carFuels.service';
import { CreateCarFuelDto, UpdateCarFuelDto } from 'src/presentation/dtos/warehouse/CarFuels-dto';
import { UserRoleSpecification } from 'src/application/specifications/user/user-role-specifications';
import { PersonnelWorkPlacesBytypeAndUserRoleIdSpecification } from 'src/application/specifications/hr/personnelWorkPlaces-specifications';
import { WorkPlaceType } from 'src/domain/enums/workPlaceType.enum';
import { PersonnelWorkPlacesService } from 'src/application/services/hr/personnelWorkPlaces.service';
import { UserRoleService } from 'src/application/services/user/userRole.service';




@Controller('api/warehouse')
export class WarehouseController {
  constructor(private readonly userService: UserService,

    private readonly driversService: DriversService,
    private readonly driverVehicleService: DriverVehicleService,
    private readonly receiptService: ReceiptService,
    private readonly warehouseService: WarehouseService,
    private readonly storeService: StoreService,
    private readonly warehouseDispatchService: WarehouseDispatchService,
    private readonly storeReceiptService: StoreReceiptService,
    private readonly warehouseDispatchHeaderStatusHistoriesService: WarehouseDispatchHeaderStatusHistoriesService,
    private readonly projectFirmsService: ProjectFirmsService,
    private readonly projectsService: ProjectsService,
    private readonly storeDispatchService: StoreDispatchService,
    private readonly storeDispatchHeaderStatusHistoriesService: StoreDispatchHeaderStatusHistoriesService,
    private readonly forceMajorsService: ForceMajorService,
    private readonly projectPlanningService: ProjectPlanningService,
    private readonly projectPlanningImplementationDatesService: ProjectPlanningImplementationDatesService,
    private readonly projectPlanningImplementationService: ProjectPlanningImplementationService,
    private readonly gateway: NotificationsGateway,
    private readonly carWarehouseDetailsService: CarWarehouseDetailService,
    private readonly consignedCarService: ConsignedCarService,
    private readonly carFuelsService: CarFuelService,
    private readonly personnelWorkPlacesService: PersonnelWorkPlacesService,
    private readonly userRoleService: UserRoleService,
  ) { }

  //#region warehouse  transaction
  @Get("get-warehouse-all-items-balance/:warehouseId")
  @ApiTags('Warehouses Transactions')
  @ApiOperation({ summary: 'Warehouses Transactions' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseAllItemsBalance(@Param('warehouseId') warehouseId: number): Promise<any[]> {
    return this.warehouseService.getWarehouseAllItemsBalances(warehouseId);
  }
  @Get("get-warehouse-items-balance/:warehouseId/:itemId")
  @ApiTags('Warehouses Transactions')
  @ApiOperation({ summary: 'Warehouses Transactions' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseItemBalance(@Param('warehouseId') warehouseId: number, @Param('itemId') itemId: number): Promise<any> {
    return this.warehouseService.getItemBalances(warehouseId, itemId);
  }

  @Get("get-warehouse-transaction-by-warehouseId/:id")
  @ApiTags('Warehouses Transactions')
  @ApiOperation({ summary: 'Warehouses Transactions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse transactions.', type: Warehouses })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseTransactionByWarehouseId(@Param('id') id: number): Promise<Warehouses> {
    var spec = new WarehouseSpecification(id);
    const relations: FindOptionsRelations<Warehouses> = {
      region: true,

      warehouseTransactions: {
        user: true,
        adminUser: true,
        item: true,
        provider: true,
        receiptDetail: {
          receiptHeader: true,
          provider: true,
          item: true,

        },
        warehouseDispatchDetail: {
          warehouseDispatchHeaders: true,
          item: true,

        },
      },

    };
    const options: FindManyOptions<Warehouses> = {
      relations,
      order: {
        warehouseTransactions: {
          createAt: "DESC",   // مرتب‌سازی بر اساس createAt
        },
      },
    };
    var operations = await this.warehouseService.getWithSpecification(spec, options, null, relations);

    return operations[0];
  }
  //#endregion warehouse  transaction


  //#region Drivers
  @Get("get-drivers")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'Driver list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver list.', type: Drivers })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getDrivers(): Promise<Drivers[]> {

    var drivers = await this.driversService.getAllRecords();
    return drivers;
  }

  @Get("get-drivers-with-vehicle")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'Driver list with vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver list with vehicle.', type: Drivers })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getDriverWithVehicle(): Promise<Drivers[]> {
    var relation: FindOptionsRelations<Drivers> = {
      driverVehicles: true
    };

    var drivers = await this.driversService.getWithSpecification(null, null, null, relation);
    return drivers;
  }

  @Post("create-driver")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'new driver' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver .', type: Drivers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewDriver(@Body() driverDto: CreateDriverDto, @Request() req): Promise<Drivers> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var driver = GenericMapper.toEntity(Drivers, driverDto);
    driver.createAt = new Date();
    driver.recordStatus = recordStatus.Active;
    driver.user = checkUser[0];

    var createDriver = await this.driversService.add(driver);
    var result = GenericMapper.toDto(Drivers, createDriver, { excludeExtraneousValues: true });
    return result;
  }



  @Get("get-driver-by-id/:id")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'get driver by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver.', type: Drivers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getDriverById(@Param('id') id: number): Promise<Drivers> {

    // بررسی وجود Driver
    const driver = await this.driversService.getById(id);
    if (!driver) {
      throw new HttpException("Driver not found", HttpStatus.NOT_FOUND);
    }
    return driver;

  }
  @Put("update-driver")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'update driver' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver.', type: Drivers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateDriver(@Body() driverDto: UpdateDriverDto): Promise<Drivers> {


    var checkDriver = await this.driversService.getById(driverDto.id);
    if (!checkDriver) {
      throw new HttpException("The driver is not found!", HttpStatus.NOT_FOUND);
    }
    checkDriver.name = driverDto.name ?? checkDriver.name;
    checkDriver.family = driverDto.family ?? checkDriver.family;
    checkDriver.birthdate = driverDto.birthdate ?? checkDriver.birthdate;
    checkDriver.fatherName = driverDto.fatherName ?? checkDriver.fatherName;
    checkDriver.identityNo = driverDto.identityNo ?? checkDriver.identityNo;
    checkDriver.internal = driverDto.internal ?? checkDriver.internal;
    checkDriver.recordStatus = driverDto.recordStatus ?? checkDriver.recordStatus;

    var updateDriver = await this.driversService.update(checkDriver);
    var result = GenericMapper.toDto(Drivers, updateDriver, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-driver/:id")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'remove driver' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteDriver(@Param('id') id: number): Promise<boolean> {

    var checkDriver = await this.driversService.getById(id);
    if (!checkDriver) {
      throw new HttpException("Driver not found", HttpStatus.NOT_FOUND);
    }

    var deleteDriver = await this.driversService.delete(id);
    return true;
  }

  //#endregion 
  //#region Driver Vehicle
  @Get("get-driver-vehicle-by-driver-id/:id")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'Driver vehicle list by driver id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver vehicle list.', type: DriverVehicles })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getDriverVehicleByDriverId(@Param('id') id: number): Promise<DriverVehicles[]> {

    var spec = new DriverVehicleSpecification(id);
    var driverVehicles = await this.driverVehicleService.getWithSpecification(spec, null, null, { driver: true });
    /* if (!driverVehicles || driverVehicles.length === 0) {
      throw new HttpException("No vehicles found for this driver", HttpStatus.NOT_FOUND);
    } */
    return driverVehicles;
  }

  @Post("create-driver-vehicle")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'new driver vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver vehicle.', type: DriverVehicles })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewDriverVehicle(@Body() driverDto: CreateDriverVehicleDto, @Request() req): Promise<DriverVehicles> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var driver = GenericMapper.toEntity(DriverVehicles, driverDto);
    driver.driver = { id: driverDto.driverId } as Drivers;
    driver.createAt = new Date();
    driver.recordStatus = recordStatus.Active;
    driver.user = checkUser[0];

    var createDriver = await this.driverVehicleService.add(driver);

    return createDriver;
  }



  @Get("get-driver-vehicle-by-id/:id")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'get driver vehicle by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver vehicle.', type: DriverVehicles })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getDriverVehicleById(@Param('id') id: number): Promise<DriverVehicles> {

    var spec = new DriverVehicleByIdSpecification(id);
    var driverVehicles = await this.driverVehicleService.getWithSpecification(spec, null, null, { driver: true });
    if (!driverVehicles || driverVehicles.length === 0) {
      throw new HttpException("No vehicles found for this driver", HttpStatus.NOT_FOUND);
    }
    return driverVehicles[0];

  }
  @Put("update-driver-vehicle")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'update driver vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return driver vehicle.', type: DriverVehicles })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateDriverVehicle(@Body() driverVehicleDto: UpdateDriverVehicleDto): Promise<DriverVehicles> {

    var checkDriverVehicle = await this.driverVehicleService.getById(driverVehicleDto.id);
    if (!checkDriverVehicle) {
      throw new HttpException("The driver vehicle is not found!", HttpStatus.NOT_FOUND);
    }
    checkDriverVehicle.name = driverVehicleDto.name ?? checkDriverVehicle.name;
    checkDriverVehicle.model = driverVehicleDto.model ?? checkDriverVehicle.model;
    checkDriverVehicle.plaque = driverVehicleDto.plaque ?? checkDriverVehicle.plaque;
    checkDriverVehicle.recordStatus = driverVehicleDto.recordStatus ?? checkDriverVehicle.recordStatus;
    checkDriverVehicle.driver = { id: driverVehicleDto.driverId ?? checkDriverVehicle.driver.id } as Drivers;

    var updateDriver = await this.driverVehicleService.update(checkDriverVehicle);

    return updateDriver;
  }
  @Delete("delete-driver-vehicle/:id")
  @ApiTags('Drivers')
  @ApiOperation({ summary: 'remove driver vehicle' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteDriverVehicle(@Param('id') id: number): Promise<boolean> {

    var checkDriverVehicle = await this.driverVehicleService.getById(id);
    if (!checkDriverVehicle) {
      throw new HttpException("Driver vehicle not found", HttpStatus.NOT_FOUND);
    }

    var deleteDriver = await this.driverVehicleService.delete(id);
    return true;
  }

  //#endregion 

  //#region Receipt
  @Get("get-Receipt")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipts list.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceipts(@Req() req: any, @Query('rolename') rolename?: string): Promise<ReceiptHeaders[]> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getAllReceipts();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.warehouse?.id) > -1);
      return operations;
    } else {
      var operations = await this.receiptService.getAllReceipts();
      return operations;
    }
  }
  @Get("get-receipt-by-id/:id")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceiptById(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<ReceiptHeaders> {
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getReceiptById(id);

      // Check if this receipt's warehouse is in the allowed workplaces
      const hasAccess = workPlaces.findIndex(wp => wp.placeId === operations.warehouse?.id) > -1;
      if (!hasAccess) {
        throw new HttpException("Access denied to this receipt", HttpStatus.FORBIDDEN);
      }

      return operations;
    } else {
      var operations = await this.receiptService.getReceiptById(id);
      return operations;
    }
  }
  @Post("create-receipt")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'new Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewReceipt(@Body() receiptDto: CreateReceiptDto, @Request() req): Promise<ReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.receiptService.createReceipt(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(ReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-receipt")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'update receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateReceipt(@Body() receiptDto: UpdateReceiptDto, @Request() req): Promise<ReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.receiptService.updateReceipt(receiptDto, checkUser.id);
    var result = await this.receiptService.getReceiptById(receiptDto.id);
    return result;
  }

  @Put("update-receipt-is-end")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'update receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateReceiptIsEnd(@Body() receiptDto: UpdateIsEnd, @Request() req): Promise<ReceiptHeaders> {

    var receipt = await this.receiptService.getById(receiptDto.id);
    receipt.isEnd = receiptDto.isEnd;

    const updateReceipt = await this.receiptService.update(receipt);
    var result = await this.receiptService.getReceiptById(receiptDto.id);
    return result;
  }

  @Delete("delete-receipt/:id")
  @ApiTags('Receipts')
  @ApiOperation({ summary: 'remove Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteReceipt(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.receiptService.getReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.receiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion

  //#region send from store to warhouse Receipt
  @Get("get-Receipt-sended-from-store-to-warehouse")
  @ApiTags('Receipts sended from store')
  @ApiOperation({ summary: 'Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipts list.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceiptsSendedFromStore(@Req() req: any, @Param('rolename') rolename?: string): Promise<ReceiptHeaders[]> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getAllReceiptsSendedFromStore();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.warehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.receiptService.getAllReceiptsSendedFromStore();

      return operations;
    }
  }
  @Get("get-receipt-sended-from-store-to-warehouse-by-id/:id")
  @ApiTags('Receipts sended from store')
  @ApiOperation({ summary: 'Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceiptSendeFromStoreToWarehouseById(@Param('id') id: number, @Req() req: any, @Param('rolename') rolename?: string): Promise<ReceiptHeaders> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getAllReceiptsSendedFromStoreById(id);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.warehouse.id) > -1);
      return operations[0];
    } else {
      var operations = await this.receiptService.getAllReceiptsSendedFromStoreById(id);

      return operations[0];
    }
  }
  @Post("create-receipt-sended-from-store-to-warehouse")
  @ApiTags('Receipts sended from store')
  @ApiOperation({ summary: 'new Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewReceiptSendedFromStore(@Body() receiptDto: CreateReceiptForSendedFromStoreDto, @Request() req): Promise<ReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.receiptService.createReceiptForSendedFromStore(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(ReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-receipt-sended-from-store-to-warehouse")
  @ApiTags('Receipts sended from store')
  @ApiOperation({ summary: 'update receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateReceiptSendedFromStore(@Body() receiptDto: UpdateReceiptForSendedFromStoreDto, @Request() req): Promise<ReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.receiptService.updateReceiptSendedFromStore(receiptDto, checkUser.id);
    var result = await this.receiptService.getReceiptById(receiptDto.id);
    return result;
  }

  @Delete("delete-receipt-sended-from-store-to-warehouse/:id")
  @ApiTags('Receipts sended from store')
  @ApiOperation({ summary: 'remove Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteReceiptSendedFromStore(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.receiptService.getReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.receiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion

  //#region destruction send from store to warhouse Receipt
  @Get("get-Receipt-destruction-sended-from-store-to-warehouse")
  @ApiTags('Receipts destruction sended from store')
  @ApiOperation({ summary: 'Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipts list.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceiptsdestructionSendedFromStore(@Req() req: any, @Param('rolename') rolename?: string): Promise<ReceiptHeaders[]> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getAllReceiptsDestructionSendedFromStore();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.warehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.receiptService.getAllReceiptsDestructionSendedFromStore();

      return operations;
    }
  }
  @Get("get-receipt-destruction-sended-from-store-to-warehouse-by-id/:id")
  @ApiTags('Receipts destruction sended from store')
  @ApiOperation({ summary: 'Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getReceiptDestructionSendedFromStoreToWarehouseById(@Param('id') id: number, @Req() req: any, @Param('rolename') rolename?: string): Promise<ReceiptHeaders> {
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);
      var operations = await this.receiptService.getAllReceiptsDestructionSendedFromStoreById(id);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.warehouse.id) > -1);
      return operations[0];
    } else {
      var operations = await this.receiptService.getAllReceiptsDestructionSendedFromStoreById(id);

      return operations[0];
    }
  }
  @Post("create-receipt-destruction-sended-from-store-to-warehouse")
  @ApiTags('Receipts destruction sended from store')
  @ApiOperation({ summary: 'new Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewReceiptDestructionSendedFromStore(@Body() receiptDto: CreateReceiptForSendedFromStoreDto, @Request() req): Promise<ReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.receiptService.createReceiptDestructionForSendedFromStore(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(ReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-receipt-destruction-sended-from-store-to-warehouse")
  @ApiTags('Receipts destruction sended from store')
  @ApiOperation({ summary: 'update receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateReceiptDestructionSendedFromStore(@Body() receiptDto: UpdateReceiptForSendedFromStoreDto, @Request() req): Promise<ReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.receiptService.updateReceiptDestructionSendedFromStore(receiptDto, checkUser.id);
    var result = await this.receiptService.getReceiptById(receiptDto.id);
    return result;
  }

  @Delete("delete-receipt-destruction-sended-from-store-to-warehouse/:id")
  @ApiTags('Receipts destruction sended from store')
  @ApiOperation({ summary: 'remove Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteReceiptDestructionSendedFromStore(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.receiptService.getReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.receiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion

  //#region Warehouse Dispatch
  @Get("get-warehouse-dispatches/:warehouseId")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'Warehouse Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatches list.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatches(@Param('warehouseId') warehouseId: number): Promise<WarehouseDispatchHeaders[]> {

    var operations = await this.warehouseDispatchService.getAllWarehouseDispatches(warehouseId);

    return operations;
  }

  @Get("get-warehouse-dispatches-by-workhouse-id/:workhouseId")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'Warehouse Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatches list.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatchesByWorkhouseId(@Param('workhouseId') workhouseId: number): Promise<WarehouseDispatchHeaders[]> {
    var operations = await this.warehouseDispatchService.getAllWarehouseDispatchesByWorkhouseId(workhouseId);
    return operations;
  }


  @Get("get-warehouse-dispatch-by-id/:id")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatchById(@Param('id') id: number): Promise<WarehouseDispatchHeaders> {

    var operations = await this.warehouseDispatchService.getWarehouseDispatchById(id);

    return operations;
  }
  @Post("create-warehouse-dispatch")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'new Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewWarehouseDispatch(@Body() warehouseDispatchDto: CreateWarehouseDispatchDto, @Request() req): Promise<WarehouseDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdWarehouseDispatch = await this.warehouseDispatchService.createWarehouseDispatch(warehouseDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(WarehouseDispatchHeaders, createdWarehouseDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-warehouse-dispatch")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'update warehouse dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateWarehouseDispatch(@Body() warehouseDispatchDto: UpdateWarehouseDispatchDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateWarehouseDispatch = await this.warehouseDispatchService.updateWarehouseDispatch(warehouseDispatchDto, checkUser.id);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    return result;
  }

  @Put("update-warehouse-dispatch-status")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'update Warehouse Dispatch status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Warehouse Dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateWarehouseDispatchStatus(@Body() warehouseDispatchDto: UpdateWarehouseDispatchStatusDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    operations.status = warehouseDispatchDto.status;
    operations.statusDescription = warehouseDispatchDto.description;
    var spec = new WarehouseDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.warehouseDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.warehouseDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var warehouseDispatchStatusHistory = new WarehouseDispatchHeaderStatusHistories();
    warehouseDispatchStatusHistory.warehouseDispatchHeader = { id: operations.id } as WarehouseDispatchHeaders;
    warehouseDispatchStatusHistory.status = operations.status;
    warehouseDispatchStatusHistory.description = warehouseDispatchDto.description;
    warehouseDispatchStatusHistory.createAt = new Date();
    warehouseDispatchStatusHistory.recordStatus = recordStatus.Active;
    warehouseDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.warehouseDispatchHeaderStatusHistoriesService.add(warehouseDispatchStatusHistory);
    const updated = await this.warehouseDispatchService.update(operations);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(operations.id);
    return result;
  }

  @Put("update-warehouse-dispatch-is-end")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'update Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatewarehousedispatchIsEnd(@Body() dto: UpdateIsEnd, @Request() req): Promise<WarehouseDispatchHeaders> {



    var item = await this.warehouseDispatchService.getById(dto.id);
    item.isEnd = dto.isEnd;

    const updateReceipt = await this.warehouseDispatchService.update(item);

    return item;
  }

  @Delete("delete-warehouse-dispatch/:id")
  @ApiTags('Warehouse Dispatch')
  @ApiOperation({ summary: 'remove Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteWarehouseDispatch(@Param('id') id: number): Promise<boolean> {

    var checkWarehouseDispatch = await this.warehouseDispatchService.getWarehouseDispatchById(id);
    if (!checkWarehouseDispatch) {
      throw new HttpException("The warehouse dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.warehouseDispatchService.deleteWarehouseDispatch(checkWarehouseDispatch.id);
    return true;
  }
  //#endregion 
  //#region Warehouse Destuction 
  @Get("get-warehouse-dispatches-destruction/:warehouseId")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'Warehouse Dispatch Destruction list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatches Destruction list.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatchesDestruction(@Param('warehouseId') warehouseId: number): Promise<WarehouseDispatchHeaders[]> {

    var operations = await this.warehouseDispatchService.getAllWarehouseDispatchesDestruction(warehouseId);

    return operations;
  }




  @Get("get-warehouse-dispatch-destruction-by-id/:id")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'Warehouse Dispatch Destruction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatchDestructionById(@Param('id') id: number): Promise<WarehouseDispatchHeaders> {

    var operations = await this.warehouseDispatchService.getWarehouseDispatchById(id);

    return operations;
  }
  @Post("create-warehouse-dispatch-destruction")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'new Warehouse Dispatch Destruction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewWarehouseDispatchDestruction(@Body() warehouseDispatchDto: CreateWarehouseDispatchDestructionDto, @Request() req): Promise<WarehouseDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdWarehouseDispatch = await this.warehouseDispatchService.createWarehouseDispatchDestruction(warehouseDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(WarehouseDispatchHeaders, createdWarehouseDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-warehouse-dispatch-destruction")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'update warehouse dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateWarehouseDispatchDestruction(@Body() warehouseDispatchDto: UpdateWarehouseDispatchDestructionDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateWarehouseDispatch = await this.warehouseDispatchService.updateWarehouseDispatchDestruction(warehouseDispatchDto, checkUser.id);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    return result;
  }

  @Put("update-warehouse-dispatch-destruction-status")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'update Warehouse Dispatch Destruction status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Warehouse Dispatch Destruction.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateWarehouseDispatchDestructionStatus(@Body() warehouseDispatchDto: UpdateWarehouseDispatchStatusDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    operations.status = warehouseDispatchDto.status;
    operations.statusDescription = warehouseDispatchDto.description;
    var spec = new WarehouseDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.warehouseDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.warehouseDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var warehouseDispatchStatusHistory = new WarehouseDispatchHeaderStatusHistories();
    warehouseDispatchStatusHistory.warehouseDispatchHeader = { id: operations.id } as WarehouseDispatchHeaders;
    warehouseDispatchStatusHistory.status = operations.status;
    warehouseDispatchStatusHistory.description = warehouseDispatchDto.description;
    warehouseDispatchStatusHistory.createAt = new Date();
    warehouseDispatchStatusHistory.recordStatus = recordStatus.Active;
    warehouseDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.warehouseDispatchHeaderStatusHistoriesService.add(warehouseDispatchStatusHistory);
    const updated = await this.warehouseDispatchService.update(operations);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(operations.id);
    return result;
  }

  @Delete("delete-warehouse-dispatch-destruction/:id")
  @ApiTags('Warehouse Dispatch Destruction')
  @ApiOperation({ summary: 'remove Warehouse Dispatch Destruction' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteWarehouseDispatchDestruction(@Param('id') id: number): Promise<boolean> {

    var checkWarehouseDispatch = await this.warehouseDispatchService.getWarehouseDispatchById(id);
    if (!checkWarehouseDispatch) {
      throw new HttpException("The warehouse dispatch Destruction is not found!", HttpStatus.NOT_FOUND);
    }

    await this.warehouseDispatchService.deleteWarehouseDispatch(checkWarehouseDispatch.id);
    return true;
  }
  //#endregion 

  //#region Store Receipt
  @Get("get-store-receipts")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'Store Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipts list.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreReceipts(@Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders[]> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);
      var operations = await this.storeReceiptService.getAllReceipts();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.store.id) > -1);
      return operations;
    } else {
      var operations = await this.storeReceiptService.getAllReceipts();
      return operations;
    }


  }

  @Get("get-store-receipt-by-storeid/:storeId")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'Store Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipts list.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreReceiptByStoreId(@Param('storeId') storeId: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders[]> {

    //var operations = await this.storeReceiptService.getAllReceiptsWithStoreId(storeId);
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);
      var operations = await this.storeReceiptService.getAllReceiptsWithStoreId(storeId);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.id) > -1);
      return operations;
    } else {
      var operations = await this.storeReceiptService.getAllReceiptsWithStoreId(storeId);
      return operations;
    }
  }
  @Get("get-store-receipt-by-id/:id")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'Store Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreReceiptById(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders> {

    var operations = await this.storeReceiptService.getReceiptById(id);
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);

      // Check if this receipt's store is in the allowed workplaces
      const hasAccess = workPlaces.findIndex(wp => wp.placeId === operations.store?.id) > -1;
      if (!hasAccess) {
        throw new HttpException("Access denied to this store receipt", HttpStatus.FORBIDDEN);
      }
    }
    return operations;
  }
  @Post("create-store-receipt")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'new Store Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewStoreReceipt(@Body() receiptDto: CreateStoreReceiptDto, @Request() req): Promise<StoreReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.storeReceiptService.createReceipt(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-store-receipt")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'update store receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt .', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreReceipt(@Body() receiptDto: UpdateStoreReceiptDto, @Request() req): Promise<StoreReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.storeReceiptService.updateReceipt(receiptDto, checkUser.id);
    var result = await this.storeReceiptService.getReceiptById(receiptDto.id);
    return result;
  }
  @Put("update-store-receipt-is-end")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'update Store Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreReceiptIsEnd(@Body() dto: UpdateIsEnd, @Request() req): Promise<StoreReceiptHeaders> {

    var item = await this.storeReceiptService.getById(dto.id);
    item.isEnd = dto.isEnd;
    const updateReceipt = await this.storeReceiptService.update(item);
    return item;
  }


  @Delete("delete-store-receipt/:id")
  @ApiTags('Store Receipts')
  @ApiOperation({ summary: 'remove Store Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteStoreReceipt(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.storeReceiptService.getReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The store receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeReceiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion

  //#region Store Receipt by invoice
  @Get("get-store-receipts-by-invoice")
  @ApiTags('Store Receipts invoice')
  @ApiOperation({ summary: 'Store Receipts invoice list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipts invoice list.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreReceiptsByInvoice(@Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders[]> {
    var operations = await this.storeReceiptService.getAllReceiptsByInvoice();
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);
      var operations = await this.storeReceiptService.getAllReceiptsByInvoice();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.store?.id) > -1);
      return operations;
    } else {
      var operations = await this.storeReceiptService.getAllReceiptsByInvoice();
      return operations;
    }

  }



  @Post("create-store-receipt-by-invoice")
  @ApiTags('Store Receipts invoice')
  @ApiOperation({ summary: 'new Store Receipt invoice' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewStoreReceiptByInvoice(@Body() receiptDto: CreateStoreReceiptByInvoiceDto, @Request() req): Promise<StoreReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.storeReceiptService.createReceiptByInvoice(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-store-receipt-by-invoice")
  @ApiTags('Store Receipts invoice')
  @ApiOperation({ summary: 'update store receipt invoice' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt .', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreReceiptByInvoice(@Body() receiptDto: UpdateStoreReceiptByInvoiceDto, @Request() req): Promise<StoreReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.storeReceiptService.updateReceiptByInvoice(receiptDto, checkUser.id);
    var result = await this.storeReceiptService.getReceiptById(receiptDto.id);
    return result;
  }

  //#endregion

  //#region Store Dispatch
  @Get("get-Store-dispatches/:storeId")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'Store Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatches(@Param('storeId') storeId: number): Promise<StoreDispatchHeaders[]> {

    var operations = await this.storeDispatchService.getAllStoreDispatches(storeId);

    return operations;
  }

  @Get("get-store-dispatches-by-project-id/:projectId")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'Store Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesByProjectId(@Param('projectId') projectId: number): Promise<StoreDispatchHeaders[]> {
    var operations = await this.storeDispatchService.getAllStoreDispatchesByProjectId(projectId);
    return operations;
  }


  @Get("get-store-dispatch-by-id/:id")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchById(@Param('id') id: number): Promise<StoreDispatchHeaders> {

    var operations = await this.storeDispatchService.getStoreDispatchById(id);

    return operations;
  }
  @Post("create-store-dispatch")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'new Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewStoreDispatch(@Body() storeDispatchDto: CreateStoreDispatchDto, @Request() req): Promise<StoreDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdStoreDispatch = await this.storeDispatchService.createStoreDispatch(storeDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreDispatchHeaders, createdStoreDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-store-dispatch")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'update store dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatch(@Body() storeDispatchDto: UpdateStoreDispatchDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateStoreDispatch = await this.storeDispatchService.updateStoreDispatch(storeDispatchDto, checkUser.id);
    var result = await this.storeDispatchService.getStoreDispatchById(storeDispatchDto.id);
    return result;
  }

  @Put("update-store-dispatch-status")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'update Store Dispatch status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Store Dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatchStatus(@Body() storeDispatchDto: UpdateStoreDispatchStatusDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.storeDispatchService.getStoreDispatchById(storeDispatchDto.id);
    operations.status = storeDispatchDto.status;
    operations.statusDescription = storeDispatchDto.description;
    var spec = new StoreDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.storeDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.storeDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var storeDispatchStatusHistory = new StoreDispatchHeaderStatusHistories();
    storeDispatchStatusHistory.storeDispatchHeader = { id: operations.id } as StoreDispatchHeaders;
    storeDispatchStatusHistory.status = operations.status;
    storeDispatchStatusHistory.description = storeDispatchDto.description;
    storeDispatchStatusHistory.createAt = new Date();
    storeDispatchStatusHistory.recordStatus = recordStatus.Active;
    storeDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.storeDispatchHeaderStatusHistoriesService.add(storeDispatchStatusHistory);
    const updated = await this.storeDispatchService.update(operations);
    var result = await this.storeDispatchService.getStoreDispatchById(operations.id);
    return result;
  }

  @Put("update-store-dispatch-is-end")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'update Store Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatchIsEnd(@Body() dto: UpdateIsEnd, @Request() req): Promise<StoreDispatchHeaders> {
    var item = await this.storeDispatchService.getById(dto.id);
    item.isEnd = dto.isEnd;
    const updateReceipt = await this.storeDispatchService.update(item);
    return item;
  }

  @Delete("delete-store-dispatch/:id")
  @ApiTags('Store Dispatch')
  @ApiOperation({ summary: 'remove Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteStoreDispatch(@Param('id') id: number): Promise<boolean> {

    var checkStoreDispatch = await this.storeDispatchService.getStoreDispatchById(id);
    if (!checkStoreDispatch) {
      throw new HttpException("The store dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeDispatchService.deleteStoreDispatch(checkStoreDispatch.id);
    return true;
  }
  //#endregion 
  //#region Store Dispatch to Center
  @Get("get-Store-dispatches-to-center/:storeId")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'Store Dispatch to center list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches to center list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesToCenter(@Param('storeId') storeId: number): Promise<StoreDispatchHeaders[]> {

    var operations = await this.storeDispatchService.getAllStoreDispatchesToCenter(storeId);
    return operations;
  }

  @Get("get-store-dispatches-by-center-id/:centerId")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'Store Dispatch list by center id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesByCenterId(@Param('centerId') centerId: number): Promise<StoreDispatchHeaders[]> {
    var operations = await this.storeDispatchService.getAllStoreDispatchesByCenterId(centerId);
    return operations;
  }


  @Get("get-store-dispatch-to-center-by-id/:id")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'Store Dispatch to center by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchToCenterById(@Param('id') id: number): Promise<StoreDispatchHeaders> {

    var operations = await this.storeDispatchService.getStoreDispatchToCenterById(id);

    return operations;
  }
  @Post("create-store-dispatch-to-center")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'new Store Dispatch to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch to center.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewStoreDispatchToCenter(@Body() storeDispatchDto: CreateStoreDispatchToCenterDto, @Request() req): Promise<StoreDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdStoreDispatch = await this.storeDispatchService.createStoreDispatchToCenter(storeDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreDispatchHeaders, createdStoreDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-store-dispatch-to-center")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'update store dispatch to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch to center.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatchToCenter(@Body() storeDispatchDto: UpdateStoreDispatchToCenterDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateStoreDispatch = await this.storeDispatchService.updateStoreDispatchToCenter(storeDispatchDto, checkUser.id);
    var result = await this.storeDispatchService.getStoreDispatchToCenterById(storeDispatchDto.id);
    return result;
  }

  @Put("update-store-dispatch-to-center-status")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'update Store Dispatch to center status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Store Dispatch to center.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatchToCenterStatus(@Body() storeDispatchDto: UpdateStoreDispatchStatusDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.storeDispatchService.getStoreDispatchById(storeDispatchDto.id);
    operations.status = storeDispatchDto.status;
    operations.statusDescription = storeDispatchDto.description;
    var spec = new StoreDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.storeDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.storeDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var storeDispatchStatusHistory = new StoreDispatchHeaderStatusHistories();
    storeDispatchStatusHistory.storeDispatchHeader = { id: operations.id } as StoreDispatchHeaders;
    storeDispatchStatusHistory.status = operations.status;
    storeDispatchStatusHistory.description = storeDispatchDto.description;
    storeDispatchStatusHistory.createAt = new Date();
    storeDispatchStatusHistory.recordStatus = recordStatus.Active;
    storeDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.storeDispatchHeaderStatusHistoriesService.add(storeDispatchStatusHistory);
    const updated = await this.storeDispatchService.update(operations);
    var result = await this.storeDispatchService.getStoreDispatchById(operations.id);
    return result;
  }

  @Delete("delete-store-dispatch-to-center/:id")
  @ApiTags('Store Dispatch to center')
  @ApiOperation({ summary: 'remove Store Dispatch to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteStoreDispatchToCenter(@Param('id') id: number): Promise<boolean> {

    var checkStoreDispatch = await this.storeDispatchService.getStoreDispatchToCenterById(id);
    if (!checkStoreDispatch) {
      throw new HttpException("The store dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeDispatchService.deleteStoreDispatch(checkStoreDispatch.id);
    return true;
  }
  //#endregion 

  //#region Store Dispatch return to  Center
  @Get("get-Store-dispatches-return-to-center/:storeId")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'Store Dispatch return to center list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches return to center list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesReturnToCenter(@Param('storeId') storeId: number): Promise<StoreDispatchHeaders[]> {

    var operations = await this.storeDispatchService.getAllStoreDispatchesDestructionToCenter(storeId);
    return operations;
  }

  @Get("get-store-dispatches-return-by-center-id/:centerId")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'Store Dispatch return to center list by center id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatches return to center list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesReturnByCenterId(@Param('centerId') centerId: number): Promise<StoreDispatchHeaders[]> {
    var operations = await this.storeDispatchService.getAllStoreDispatchesByCenterId(centerId);
    return operations;
  }


  @Get("get-store-dispatch-return-to-center-by-id/:id")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'Store Dispatch return to center by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchReturnToCenterById(@Param('id') id: number): Promise<StoreDispatchHeaders> {

    var operations = await this.storeDispatchService.getStoreDispatchToCenterById(id);

    return operations;
  }
  @Post("create-store-dispatch-return-to-center")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'new Store Dispatch to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch to center.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewStoreDispatchRetunToCenter(@Body() storeDispatchDto: CreateStoreDispatchReturnToCenterDto, @Request() req): Promise<StoreDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdStoreDispatch = await this.storeDispatchService.createStoreDispatchReturnToCenter(storeDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreDispatchHeaders, createdStoreDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-store-dispatch-return-to-center")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'update store dispatch return to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch return to center.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateStoreDispatchReturnToCenter(@Body() storeDispatchDto: UpdateStoreDispatchReturnToCenterDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateStoreDispatch = await this.storeDispatchService.updateStoreDispatchReturnToCenter(storeDispatchDto, checkUser.id);
    var result = await this.storeDispatchService.getStoreDispatchToCenterById(storeDispatchDto.id);
    return result;
  }

  @Delete("delete-store-dispatch-return-to-center/:id")
  @ApiTags('Store Dispatch return to center')
  @ApiOperation({ summary: 'remove Store Dispatch return to center' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteStoreDispatchReturnToCenter(@Param('id') id: number): Promise<boolean> {

    var checkStoreDispatch = await this.storeDispatchService.getStoreDispatchToCenterById(id);
    if (!checkStoreDispatch) {
      throw new HttpException("The store dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeDispatchService.deleteStoreDispatch(checkStoreDispatch.id);
    return true;
  }
  //#endregion 

  //#region store  transaction
  @Get("get-store-all-items-balance/:storeId")
  @ApiTags('Store Transactions')
  @ApiOperation({ summary: 'Store Transactions' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreAllItemsBalance(@Param('storeId') storeId: number): Promise<any[]> {
    return this.storeService.getStoreAllItemsBalances(storeId);
  }
  @Get("get-store-items-balance/:storeId/:itemId")
  @ApiTags('Store Transactions')
  @ApiOperation({ summary: 'Store Transactions' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreItemBalance(@Param('storeId') storeId: number, @Param('itemId') itemId: number): Promise<any> {
    return this.storeService.getItemBalances(storeId, itemId);
  }

  @Get("get-store-transaction-by-storeId/:id")
  @ApiTags('Store Transactions')
  @ApiOperation({ summary: 'Store Transactions' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store transactions.', type: Warehouses })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreTransactionByStoreId(@Param('id') id: number): Promise<Stores> {
    var spec = new StoreSpecification(id);
    const relations: FindOptionsRelations<Stores> = {
      region: true,

      storeTransactions: {
        user: true,
        adminUser: true,
        item: true,
        storeReceiptDetail: {
          storeReceiptHeader: true,
          item: true,
        },

        storeDispatchDetail: {
          storeDispatchHeaders: true,
          item: true,

        },
      },

    };
    const options: FindManyOptions<Stores> = {
      relations,
      order: {
        storeTransactions: {
          createAt: "DESC",   // مرتب‌سازی بر اساس createAt
        },
      },
    };
    var operations = await this.storeService.getWithSpecification(spec, options, null, relations);

    return operations[0];
  }
  //#endregion warehouse  transaction

  //#region Warehouse Dispatch between Warehouses
  @Get("get-between-warehouse-dispatches/:warehouseId")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'Between Warehouse Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between warehouse dispatches list.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenWarehouseDispatches(@Param('warehouseId') warehouseId: number): Promise<WarehouseDispatchHeaders[]> {

    var operations = await this.warehouseDispatchService.getAllBetweenWarehouseDispatches(warehouseId);

    return operations;
  }

  @Get("get-between-warehouse-dispatches-by-destination-warehouse-id/:warehouseId")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'Between Warehouse Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between warehouse dispatches list.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWarehouseDispatchesByDestinationWarehouseId(@Param('warehouseId') warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    var operations = await this.warehouseDispatchService.getAllWarehouseDispatchesByDestinationWarehouseId(warehouseId);
    return operations;
  }


  @Get("get-between-warehouse-dispatch-by-id/:id")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'Between Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenWarehouseDispatchById(@Param('id') id: number): Promise<WarehouseDispatchHeaders> {
    var operations = await this.warehouseDispatchService.getBetweenWarehouseDispatchById(id);
    return operations;
  }

  @Post("create-between-warehouse-dispatch")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'new Between Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewBetweenWarehouseDispatch(@Body() warehouseDispatchDto: CreateBetweenWarehouseDispatchDto, @Request() req): Promise<WarehouseDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdWarehouseDispatch = await this.warehouseDispatchService.createBetweenWarehouseDispatch(warehouseDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(WarehouseDispatchHeaders, createdWarehouseDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-between-warehouse-dispatch")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'update between warehouse dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between warehouse dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenWarehouseDispatch(@Body() warehouseDispatchDto: UpdateBetweenWarehouseDispatchDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateWarehouseDispatch = await this.warehouseDispatchService.updateBetweenWarehouseDispatch(warehouseDispatchDto, checkUser.id);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    return result;
  }

  @Put("update-between-warehouse-dispatch-status")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'update Between Warehouse Dispatch status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Between Warehouse Dispatch.', type: WarehouseDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenWarehouseDispatchStatus(@Body() warehouseDispatchDto: UpdateWarehouseDispatchStatusDto, @Request() req): Promise<WarehouseDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.warehouseDispatchService.getWarehouseDispatchById(warehouseDispatchDto.id);
    operations.status = warehouseDispatchDto.status;
    operations.statusDescription = warehouseDispatchDto.description;
    var spec = new WarehouseDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.warehouseDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.warehouseDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var warehouseDispatchStatusHistory = new WarehouseDispatchHeaderStatusHistories();
    warehouseDispatchStatusHistory.warehouseDispatchHeader = { id: operations.id } as WarehouseDispatchHeaders;
    warehouseDispatchStatusHistory.status = operations.status;
    warehouseDispatchStatusHistory.description = warehouseDispatchDto.description;
    warehouseDispatchStatusHistory.createAt = new Date();
    warehouseDispatchStatusHistory.recordStatus = recordStatus.Active;
    warehouseDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.warehouseDispatchHeaderStatusHistoriesService.add(warehouseDispatchStatusHistory);
    const updated = await this.warehouseDispatchService.update(operations);
    var result = await this.warehouseDispatchService.getWarehouseDispatchById(operations.id);
    return result;
  }

  @Delete("delete-between-warehouse-dispatch/:id")
  @ApiTags('Between Warehouse Dispatch')
  @ApiOperation({ summary: 'remove Between Warehouse Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteBetweenWarehouseDispatch(@Param('id') id: number): Promise<boolean> {

    var checkWarehouseDispatch = await this.warehouseDispatchService.getWarehouseDispatchById(id);
    if (!checkWarehouseDispatch) {
      throw new HttpException("The warehouse dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.warehouseDispatchService.deleteWarehouseDispatch(checkWarehouseDispatch.id);
    return true;
  }
  //#endregion 

  //#region Between Receipt
  @Get("get-between-receipts")
  @ApiTags('Between Receipts')
  @ApiOperation({ summary: 'Between Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between receipts list.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenReceipts(): Promise<ReceiptHeaders[]> {
    var operations = await this.receiptService.getAllBetweenReceipts();
    return operations;
  }
  @Get("get-between-receipt-by-id/:id")
  @ApiTags('Between Receipts')
  @ApiOperation({ summary: 'Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenReceiptById(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<ReceiptHeaders> {

    var operations = await this.receiptService.getBetweenReceiptById(id);

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Warehouse), null, { placeId: true }, null);

      // Check if this receipt's warehouse is in the allowed workplaces
      const hasAccess = workPlaces.findIndex(wp => wp.placeId === operations.warehouse?.id) > -1;
      if (!hasAccess) {
        throw new HttpException("Access denied to this receipt", HttpStatus.FORBIDDEN);
      }
    }

    return operations;
  }
  @Post("create-between-receipt")
  @ApiTags('Between Receipts')
  @ApiOperation({ summary: 'new Between Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewBetweenReceipt(@Body() receiptDto: CreateBetweenReceiptDto, @Request() req): Promise<ReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.receiptService.createBetweenReceipt(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(ReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-between-receipt")
  @ApiTags('Between Receipts')
  @ApiOperation({ summary: 'update between receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: ReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenReceipt(@Body() receiptDto: UpdateBetweenReceiptDto, @Request() req): Promise<ReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.receiptService.updateBetweenReceipt(receiptDto, checkUser.id);
    var result = await this.receiptService.getBetweenReceiptById(receiptDto.id);
    return result;
  }

  @Delete("delete-between-receipt/:id")
  @ApiTags('Between Receipts')
  @ApiOperation({ summary: 'remove Between Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteBetweenReceipt(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.receiptService.getBetweenReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.receiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion

  //#region Projects
  @Get("get-project-firm")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Project firm list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project firm list.', type: ProjectFirms })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectFirms(): Promise<ProjectFirms[]> {

    var projectFirms = await this.projectFirmsService.getAllRecords();
    return projectFirms;
  }

  @Get("get-project-firm-by-id/:id")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Get project firm by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project firm.', type: ProjectFirms })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectFirmById(@Param('id') id: number): Promise<ProjectFirms> {
    const projectFirm = await this.projectFirmsService.getById(id);
    if (!projectFirm) {
      throw new HttpException("Project firm not found", HttpStatus.NOT_FOUND);
    }
    return projectFirm;
  }



  @Post("create-project-firm")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'new project firm' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project firm .', type: ProjectFirms })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewProjectFirm(@Body() projectFirmDto: CreateProjectFirmDto, @Request() req): Promise<ProjectFirms> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var projectFirm = GenericMapper.toEntity(ProjectFirms, projectFirmDto);
    projectFirm.createAt = new Date();
    projectFirm.recordStatus = recordStatus.Active;
    projectFirm.user = checkUser[0];

    var createProjectFirm = await this.projectFirmsService.add(projectFirm);
    var result = GenericMapper.toDto(ProjectFirms, createProjectFirm, { excludeExtraneousValues: true });
    return result;
  }




  @Put("update-project-firm")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'update project firm' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project firm.', type: ProjectFirms })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateProjectFirm(@Body() projectFirmDto: UpdateProjectFirmDto): Promise<ProjectFirms> {


    var checkProjectFirm = await this.projectFirmsService.getById(projectFirmDto.id);
    if (!checkProjectFirm) {
      throw new HttpException("The project firm is not found!", HttpStatus.NOT_FOUND);
    }
    checkProjectFirm.title = projectFirmDto.title ?? checkProjectFirm.title;
    checkProjectFirm.abbreviation = projectFirmDto.abbreviation ?? checkProjectFirm.abbreviation;
    checkProjectFirm.recordStatus = projectFirmDto.recordStatus ?? checkProjectFirm.recordStatus;

    var updateProjectFirm = await this.projectFirmsService.update(checkProjectFirm);
    var result = GenericMapper.toDto(ProjectFirms, updateProjectFirm, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-project-firm/:id")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'remove project firm' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteProjectFirm(@Param('id') id: number): Promise<boolean> {

    var checkProjectFirm = await this.projectFirmsService.getById(id);
    if (!checkProjectFirm) {
      throw new HttpException("Project firm not found", HttpStatus.NOT_FOUND);
    }

    var deleteProjectFirm = await this.projectFirmsService.delete(id);
    return true;
  }




  @Get("get-project")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Project list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project list.', type: Projects })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProject(@Req() req: any, @Query('rolename') rolename?: string): Promise<Projects[]> {
    const relations: FindOptionsRelations<Projects> = {
      workhouse: true,
      projectFirm: true
    };

    // var projects = await this.projectsService.getWithSpecification(null, null, null, relations);

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Workhouse), null, { placeId: true }, null);
      var operations = await this.projectsService.getWithSpecification(null, null, null, relations);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.workhouse?.id) > -1);
      return operations;
    } else {
      var operations = await this.projectsService.getWithSpecification(null, null, null, relations);

      return operations;
    }

  }

  @Get("get-project-is-end")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Project list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project list.', type: Projects })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectIsEnd(@Req() req: any, @Query('rolename') rolename?: string): Promise<Projects[]> {
    const relations: FindOptionsRelations<Projects> = {
      workhouse: true,
      projectFirm: true
    };
    var specProject = new ProjectIsEndSpecification();
    //var projects = await this.projectsService.getWithSpecification(specProject, null, null, relations);
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Workhouse), null, { placeId: true }, null);
      var operations = await this.projectsService.getWithSpecification(specProject, null, null, relations);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.workhouse?.id) > -1);
      return operations;
    } else {
      var operations = await this.projectsService.getWithSpecification(specProject, null, null, relations);
      return operations;
    }
  }

  @Get("get-project-by-id/:id")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project.', type: Projects })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectById(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<Projects> {
    var specProject = new ProjectSpecification(id);
    const relations: FindOptionsRelations<Projects> = {
      workhouse: true,
      projectFirm: true
    };

    var project = await this.projectsService.getWithSpecification(specProject, null, null, relations);
    if (!project || project.length === 0) {
      throw new HttpException("Project not found", HttpStatus.NOT_FOUND);
    }

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Workhouse), null, { placeId: true }, null);
      var project = await this.projectsService.getWithSpecification(specProject, null, null, relations);
      project = project.filter(w => workPlaces.findIndex(wp => wp.placeId === w.workhouse?.id) > -1);
      return project[0];
    } else {
      var project = await this.projectsService.getWithSpecification(specProject, null, null, relations);

      return project[0];
    }

  }
  @Get('get-project-progress/:id')
  @ApiOperation({ summary: 'Get project progress' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project progress.', type: [ProjectProgressDto] })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectProgress(@Param('id') id: number): Promise<ProjectProgressDto[]> {
    return this.projectsService.getProjectProgress(id);
  }

  @Get('get-projects-overall-progress')
  @ApiTags('Projects')
  @ApiOperation({ summary: 'Get projects overall progress' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return projects overall progress.', type: [ProjectOverallProgressDto] })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectsOverallProgress(): Promise<ProjectOverallProgressDto[]> {
    return this.projectsService.getProjectsOverallProgress();
  }


  @Post("create-project")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'new project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project.', type: Projects })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewProject(@Body() projectDto: CreateProjectDto, @Request() req): Promise<Projects> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var project = GenericMapper.toEntity(Projects, projectDto);
    project.projectFirm = { id: projectDto.firmId } as ProjectFirms;
    project.workhouse = { id: projectDto.workhouseId } as Workhouses;
    project.createAt = new Date();
    project.recordStatus = recordStatus.Active;
    project.user = checkUser[0];

    var createProject = await this.projectsService.add(project);
    var result = GenericMapper.toDto(Projects, createProject, { excludeExtraneousValues: true });
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: createProject.id,
      createdAt: createProject.createAt,
      type: 'project-created',
    });

    return result;
  }




  @Put("update-project")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'update project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project.', type: Projects })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateProject(@Body() projectDto: UpdateProjectDto): Promise<Projects> {


    var checkProject = await this.projectsService.getById(projectDto.id);
    if (!checkProject) {
      throw new HttpException("The project is not found!", HttpStatus.NOT_FOUND);
    }
    checkProject.title = projectDto.title ?? checkProject.title;
    checkProject.code = projectDto.code ?? checkProject.code;
    checkProject.type = projectDto.type ?? checkProject.type;
    checkProject.startDate = projectDto.startDate ?? checkProject.startDate;
    checkProject.predictEndDate = projectDto.predictEndDate ?? checkProject.predictEndDate;
    checkProject.endDate = projectDto.endDate ?? checkProject.endDate;
    checkProject.projectFirm = projectDto.firmId ? { id: projectDto.firmId } as ProjectFirms : checkProject.projectFirm;
    checkProject.workhouse = projectDto.workhouseId ? { id: projectDto.workhouseId } as Workhouses : checkProject.workhouse;
    checkProject.recordStatus = projectDto.recordStatus ?? checkProject.recordStatus;

    var updateProject = await this.projectsService.update(checkProject);
    var result = GenericMapper.toDto(Projects, updateProject, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-project/:id")
  @ApiTags('Projects')
  @ApiOperation({ summary: 'remove project' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteProject(@Param('id') id: number): Promise<boolean> {

    var checkProject = await this.projectsService.getById(id);
    if (!checkProject) {
      throw new HttpException("Project not found", HttpStatus.NOT_FOUND);
    }
    var deleteProject = await this.projectsService.delete(id);
    return true;
  }

  //#endregion 


  //#region Store Dispatch between Stores
  @Get("get-between-store-dispatches/:storeId")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'Between Store Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between store dispatches list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenStoreDispatches(@Param('storeId') storeId: number): Promise<StoreDispatchHeaders[]> {

    var operations = await this.storeDispatchService.getAllBetweenStoreDispatches(storeId);

    return operations;
  }

  @Get("get-between-store-dispatches-by-destination-store-id/:storeId")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'Between Store Dispatch list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between store dispatches list.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStoreDispatchesByDestinationStoreId(@Param('storeId') storeId: number): Promise<StoreDispatchHeaders[]> {
    var operations = await this.storeDispatchService.getAllStoreDispatchesByDestinationStoreId(storeId);
    return operations;
  }


  @Get("get-between-store-dispatch-by-id/:id")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'Between Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenStoreDispatchById(@Param('id') id: number): Promise<StoreDispatchHeaders> {
    var operations = await this.storeDispatchService.getBetweenStoreDispatchById(id);
    return operations;
  }

  @Post("create-between-store-dispatch")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'new Between Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewBetweenStoreDispatch(@Body() storeDispatchDto: CreateBetweenStoreDispatchDto, @Request() req): Promise<StoreDispatchHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdStoreDispatch = await this.storeDispatchService.createBetweenStoreDispatch(storeDispatchDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreDispatchHeaders, createdStoreDispatch, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-between-store-dispatch")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'update between store dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between store dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenStoreDispatch(@Body() storeDispatchDto: UpdateBetweenStoreDispatchDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateStoreDispatch = await this.storeDispatchService.updateBetweenStoreDispatch(storeDispatchDto, checkUser.id);
    var result = await this.storeDispatchService.getBetweenStoreDispatchById(storeDispatchDto.id);
    return result;
  }

  @Put("update-between-store-dispatch-status")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'update Between Store Dispatch status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Between Store Dispatch.', type: StoreDispatchHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenStoreDispatchStatus(@Body() storeDispatchDto: UpdateStoreDispatchStatusDto, @Request() req): Promise<StoreDispatchHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var operations = await this.storeDispatchService.getBetweenStoreDispatchById(storeDispatchDto.id);
    operations.status = storeDispatchDto.status;
    operations.statusDescription = storeDispatchDto.description;
    var spec = new StoreDispatchHeaderStatusHistoriesSpecification(operations.id);
    var oldHistory = await this.storeDispatchHeaderStatusHistoriesService.getWithSpecification(spec);
    if (oldHistory && oldHistory.length > 0) {
      oldHistory.forEach(async history => {
        history.recordStatus = recordStatus.Inactive;

      });
      await this.storeDispatchHeaderStatusHistoriesService.updateMany(oldHistory);
    }

    var storeDispatchStatusHistory = new StoreDispatchHeaderStatusHistories();
    storeDispatchStatusHistory.storeDispatchHeader = { id: operations.id } as StoreDispatchHeaders;
    storeDispatchStatusHistory.status = operations.status;
    storeDispatchStatusHistory.description = storeDispatchDto.description;
    storeDispatchStatusHistory.createAt = new Date();
    storeDispatchStatusHistory.recordStatus = recordStatus.Active;
    storeDispatchStatusHistory.user = checkUser;
    const historyCreated = await this.storeDispatchHeaderStatusHistoriesService.add(storeDispatchStatusHistory);
    const updated = await this.storeDispatchService.update(operations);
    var result = await this.storeDispatchService.getBetweenStoreDispatchById(operations.id);
    return result;
  }

  @Delete("delete-between-store-dispatch/:id")
  @ApiTags('Between Store Dispatch')
  @ApiOperation({ summary: 'remove Between Store Dispatch' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteBetweenStoreDispatch(@Param('id') id: number): Promise<boolean> {

    var checkStoreDispatch = await this.storeDispatchService.getBetweenStoreDispatchById(id);
    if (!checkStoreDispatch) {
      throw new HttpException("The store dispatch is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeDispatchService.deleteStoreDispatch(checkStoreDispatch.id);
    return true;
  }
  //#endregion 

  //#region Between Store Receipt
  @Get("get-between-store-receipts")
  @ApiTags('Between Store Receipts')
  @ApiOperation({ summary: 'Between Store Receipts list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return between store receipts list.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenStoreReceipts(@Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders[]> {
    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);
      var operations = await this.storeReceiptService.getAllBetweenReceipts();
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.store.id) > -1);
      return operations;
    } else {
      var operations = await this.storeReceiptService.getAllBetweenReceipts();
      return operations;
    }
  }
  @Get("get-between-store-receipt-by-id/:id")
  @ApiTags('Between Store Receipts')
  @ApiOperation({ summary: 'Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetweenStoreReceiptById(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<StoreReceiptHeaders> {

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Store), null, { placeId: true }, null);
      var operations = await this.storeReceiptService.getBetweenReceiptById(id);

      // Check if this receipt's store is in the allowed workplaces
      const hasAccess = workPlaces.findIndex(wp => wp.placeId === operations.store?.id) > -1;
      if (!hasAccess) {
        throw new HttpException("Access denied to this store receipt", HttpStatus.FORBIDDEN);
      }

      return operations;
    } else {
      var operations = await this.storeReceiptService.getBetweenReceiptById(id);

      return operations;
    }
  }
  @Post("create-between-store-receipt")
  @ApiTags('Between Store Receipts')
  @ApiOperation({ summary: 'new Between Store Receipts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return store receipt.', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewBetweenStoreReceipt(@Body() receiptDto: CreateBetweenStoreReceiptDto, @Request() req): Promise<StoreReceiptHeaders> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const createdReceipt = await this.storeReceiptService.createBetweenReceipt(receiptDto, checkUser.id);
    // تبدیل به DTO
    const result = GenericMapper.toDto(StoreReceiptHeaders, createdReceipt, {
      excludeExtraneousValues: true,
    });

    return result;
  }

  @Put("update-between-store-receipt")
  @ApiTags('Between Store Receipts')
  @ApiOperation({ summary: 'update between store receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return receipt .', type: StoreReceiptHeaders })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateBetweenStoreReceipt(@Body() receiptDto: UpdateBetweenStoreReceiptDto, @Request() req): Promise<StoreReceiptHeaders> {

    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const updateReceipt = await this.storeReceiptService.updateBetweenReceipt(receiptDto, checkUser.id);
    var result = await this.storeReceiptService.getBetweenReceiptById(receiptDto.id);
    return result;
  }

  @Delete("delete-between-store-receipt/:id")
  @ApiTags('Between Store Receipts')
  @ApiOperation({ summary: 'remove Between Store Receipt' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteBetweenStoreReceipt(@Param('id') id: number): Promise<boolean> {

    var checkReceipt = await this.storeReceiptService.getBetweenReceiptById(id);
    if (!checkReceipt) {
      throw new HttpException("The store receipt is not found!", HttpStatus.NOT_FOUND);
    }

    await this.storeReceiptService.deleteReceipt(checkReceipt.id);
    return true;
  }
  //#endregion


  //#region Force Major
  @Get("get-force-majors")
  @ApiTags('Force Majors')
  @ApiOperation({ summary: 'Force Major list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return force major list.', type: ForceMajors })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getForceMajors(): Promise<ForceMajors[]> {

    var forceMajors = await this.forceMajorsService.getAllRecords();
    return forceMajors;
  }


  @Post("create-force-major")
  @ApiTags('Force Majors')
  @ApiOperation({ summary: 'new force major' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return force major .', type: ForceMajors })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewForceMajor(@Body() forceMajorDto: CreateForceMajorDto, @Request() req): Promise<ForceMajors> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var forceMajor = GenericMapper.toEntity(ForceMajors, forceMajorDto);
    forceMajor.createAt = new Date();
    forceMajor.recordStatus = recordStatus.Active;
    forceMajor.user = checkUser[0];

    var createForceMajor = await this.forceMajorsService.add(forceMajor);
    var result = GenericMapper.toDto(ForceMajors, createForceMajor, { excludeExtraneousValues: true });
    return result;
  }



  @Get("get-force-major-by-id/:id")
  @ApiTags('Force Majors')
  @ApiOperation({ summary: 'get force major by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return force major.', type: ForceMajors })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getForceMajorById(@Param('id') id: number): Promise<ForceMajors> {

    // بررسی وجود Force Major
    const forceMajor = await this.forceMajorsService.getById(id);
    if (!forceMajor) {
      throw new HttpException("Force Major not found", HttpStatus.NOT_FOUND);
    }
    return forceMajor;

  }
  @Put("update-force-major")
  @ApiTags('Force Majors')
  @ApiOperation({ summary: 'update force major' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return force major.', type: ForceMajors })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateForceMajor(@Body() forceMajorDto: UpdateForceMajorDto): Promise<ForceMajors> {


    var checkForceMajor = await this.forceMajorsService.getById(forceMajorDto.id);
    if (!checkForceMajor) {
      throw new HttpException("The force major is not found!", HttpStatus.NOT_FOUND);
    }
    checkForceMajor.title = forceMajorDto.title ?? checkForceMajor.title;

    checkForceMajor.recordStatus = forceMajorDto.recordStatus ?? checkForceMajor.recordStatus;

    var updateForceMajor = await this.forceMajorsService.update(checkForceMajor);
    var result = GenericMapper.toDto(ForceMajors, updateForceMajor, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-force-major/:id")
  @ApiTags('Force Majors')
  @ApiOperation({ summary: 'remove force major' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteForceMajor(@Param('id') id: number): Promise<boolean> {

    var checkForceMajor = await this.forceMajorsService.getById(id);
    if (!checkForceMajor) {
      throw new HttpException("Force Major not found", HttpStatus.NOT_FOUND);
    }

    var deleteForceMajor = await this.forceMajorsService.delete(id);
    return true;
  }

  //#endregion 

  //#region Project Planning
  @Get("get-project-plannings")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'Project Planning list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning list.', type: ProjectPlanings })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlannings(): Promise<ProjectPlanings[]> {
    const relation: FindOptionsRelations<ProjectPlanings> = {
      project: {
        workhouse: {
          work: true,
        },
      },
    };
    var projectPlannings = await this.projectPlanningService.getWithSpecification(null, null, null, relation);
    return projectPlannings;
  }


  @Post("create-project-planning")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'new project planning' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning.', type: ProjectPlanings })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewProjectPlanning(@Body() projectPlanningDto: CreateProjectPlanningDto, @Request() req): Promise<ProjectPlanings> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var projectPlanning = GenericMapper.toEntity(ProjectPlanings, projectPlanningDto);
    projectPlanning.project = { id: projectPlanningDto.projectId } as Projects;
    projectPlanning.createAt = new Date();
    projectPlanning.recordStatus = recordStatus.Active;
    projectPlanning.user = checkUser[0];
    var createProjectPlanning = await this.projectPlanningService.add(projectPlanning);
    var result = GenericMapper.toDto(ProjectPlanings, createProjectPlanning, { excludeExtraneousValues: true });
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: createProjectPlanning.id,
      createdAt: createProjectPlanning.createAt,
      type: 'project-planning-created',
      projectId: projectPlanningDto.projectId,
    });
    return result;
  }



  @Get("get-project-planning-by-id/:id")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'get project planning by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning.', type: ProjectPlanings })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningById(@Param('id') id: number): Promise<ProjectPlanings> {

    var spec = new ProjectPlanningSpecification(id);
    const relations: FindOptionsRelations<ProjectPlanings> = {
      project: {
        workhouse: {
          work: true,
        },
      },
    };
    // بررسی وجود Project Planning
    const projectPlanning = await this.projectPlanningService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanning) {
      throw new HttpException("Project Planning not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanning[0];

  }


  @Get("get-project-planning-by-project-id/:projectId")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'get project planning by project id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning.', type: ProjectPlanings })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningByProjectId(@Param('projectId') projectId: number): Promise<ProjectPlanings[]> {

    var spec = new ProjectPlanningByProjectIdSpecification(projectId);
    const relations: FindOptionsRelations<ProjectPlanings> = {
      project: {
        workhouse: {
          work: true,
        },
      },
    };
    // بررسی وجود Project Planning
    const projectPlanning = await this.projectPlanningService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanning) {
      throw new HttpException("Project Planning not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanning;

  }
  @Put("update-project-planning")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'update project planning' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning.', type: ProjectPlanings })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateProjectPlanning(@Body() projectPlanningDto: UpdateProjectPlanningDto): Promise<ProjectPlanings> {

    var checkProjectPlanning = await this.projectPlanningService.getById(projectPlanningDto.id);
    if (!checkProjectPlanning) {
      throw new HttpException("The project planning is not found!", HttpStatus.NOT_FOUND);
    }
    checkProjectPlanning.startDate = projectPlanningDto.startDate ?? checkProjectPlanning.startDate;
    checkProjectPlanning.endDate = projectPlanningDto.endDate ?? checkProjectPlanning.endDate;
    checkProjectPlanning.kaziYapilanDirekSayisi = projectPlanningDto.kaziYapilanDirekSayisi ?? checkProjectPlanning.kaziYapilanDirekSayisi;
    checkProjectPlanning.altMontajiYapilanDirekSayisi = projectPlanningDto.altMontajiYapilanDirekSayisi ?? checkProjectPlanning.altMontajiYapilanDirekSayisi;
    checkProjectPlanning.betonAtilanDirekSayisi = projectPlanningDto.betonAtilanDirekSayisi ?? checkProjectPlanning.betonAtilanDirekSayisi;
    checkProjectPlanning.ustMontajiOrulenDirekSayisi = projectPlanningDto.ustMontajiOrulenDirekSayisi ?? checkProjectPlanning.ustMontajiOrulenDirekSayisi;
    checkProjectPlanning.ustMontajiKurulanDirekSayisi = projectPlanningDto.ustMontajiKurulanDirekSayisi ?? checkProjectPlanning.ustMontajiKurulanDirekSayisi;
    checkProjectPlanning.dikilenBetonDirekSayisi = projectPlanningDto.dikilenBetonDirekSayisi ?? checkProjectPlanning.dikilenBetonDirekSayisi;
    checkProjectPlanning.iletkenCekilenDirekSayisi = projectPlanningDto.iletkenCekilenDirekSayisi ?? checkProjectPlanning.iletkenCekilenDirekSayisi;
    checkProjectPlanning.ayiriciTakilanDirekSayisi = projectPlanningDto.ayiriciTakilanDirekSayisi ?? checkProjectPlanning.ayiriciTakilanDirekSayisi;
    checkProjectPlanning.dikilenAydinlatmaDirekSayisi = projectPlanningDto.dikilenAydinlatmaDirekSayisi ?? checkProjectPlanning.dikilenAydinlatmaDirekSayisi;
    checkProjectPlanning.kabloKanali = projectPlanningDto.kabloKanali ?? checkProjectPlanning.kabloKanali;
    checkProjectPlanning.cekilenKabloMiktari = projectPlanningDto.cekilenKabloMiktari ?? checkProjectPlanning.cekilenKabloMiktari;
    checkProjectPlanning.transformator = projectPlanningDto.transformator ?? checkProjectPlanning.transformator;
    checkProjectPlanning.dagitimPanosu = projectPlanningDto.dagitimPanosu ?? checkProjectPlanning.dagitimPanosu;
    checkProjectPlanning.sahaDagTMKutusu = projectPlanningDto.sahaDagTMKutusu ?? checkProjectPlanning.sahaDagTMKutusu;
    checkProjectPlanning.betonKosk = projectPlanningDto.betonKosk ?? checkProjectPlanning.betonKosk;
    checkProjectPlanning.hucre = projectPlanningDto.hucre ?? checkProjectPlanning.hucre;
    checkProjectPlanning.project = { id: projectPlanningDto.projectId ?? checkProjectPlanning.project.id } as Projects;
    checkProjectPlanning.recordStatus = projectPlanningDto.recordStatus ?? checkProjectPlanning.recordStatus;

    var updateProjectPlanning = await this.projectPlanningService.update(checkProjectPlanning);
    var result = GenericMapper.toDto(ProjectPlanings, updateProjectPlanning, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-project-planning/:id")
  @ApiTags('Project Planning')
  @ApiOperation({ summary: 'remove project planning' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteProjectPlanning(@Param('id') id: number): Promise<boolean> {

    var checkProjectPlanning = await this.projectPlanningService.getById(id);
    if (!checkProjectPlanning) {
      throw new HttpException("Project Planning not found", HttpStatus.NOT_FOUND);
    }

    var deleteProjectPlanning = await this.projectPlanningService.delete(id);
    return true;
  }

  //#endregion 
  //#region Project Planning Implementation Dates
  @Get("get-project-planning-implementation-dates")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'Project Planning Implementation Dates list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation dates list.', type: ProjectPlanningImplementationDates })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningProjectPlanningImplementationDate(): Promise<ProjectPlanningImplementationDates[]> {
    var relation: FindOptionsRelations<ProjectPlanningImplementationDates> = {
      projectPlanning: {
        project: {
          workhouse: {
            work: true,
          },
        },
      },
      forceMajor: true,

    };
    var projectPlannings = await this.projectPlanningImplementationDatesService.getWithSpecification(null, null, null, relation);
    return projectPlannings;
  }


  @Post("create-project-planning-implementation-date")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'new project planning implementation date' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation date.', type: ProjectPlanningImplementationDates })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewProjectPlanningImplementationDate(@Body() projectPlanningDto: CreateProjectPlanningImpelimentationDateDto, @Request() req): Promise<ProjectPlanningImplementationDates> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var projectPlanningDate = GenericMapper.toEntity(ProjectPlanningImplementationDates, projectPlanningDto);
    projectPlanningDate.projectPlanning = { id: projectPlanningDto.projectPlanningId } as ProjectPlanings;

    projectPlanningDate.forceMajor = { id: projectPlanningDto.forceMajorId ?? null } as ForceMajors;

    projectPlanningDate.createAt = new Date();
    projectPlanningDate.recordStatus = recordStatus.Active;
    projectPlanningDate.user = checkUser[0];
    var createProjectPlanning = await this.projectPlanningImplementationDatesService.add(projectPlanningDate);
    var result = GenericMapper.toDto(ProjectPlanningImplementationDates, createProjectPlanning, { excludeExtraneousValues: true });
    var spec = new ProjectPlanningSpecification(projectPlanningDto.projectPlanningId);
    var relations: FindOptionsRelations<ProjectPlanings> = {
      project: true,
    };
    // بررسی وجود Project Planning  
    var projectPlannig = await this.projectPlanningService.getWithSpecification(spec, null, null, relations);

    if (projectPlanningDto.forceMajorId) {
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: projectPlanningDate.id,
        createdAt: projectPlanningDate.createAt,
        type: 'project-planning-date-created',
        projectId: projectPlannig[0].project.id,

      });
    }
    return result;
  }



  @Get("get-project-planning-implementation-dates-by-id/:id")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'get project planning implementation dates by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation dates.', type: ProjectPlanningImplementationDates })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationDateById(@Param('id') id: number): Promise<ProjectPlanningImplementationDates> {

    var spec = new ProjectPlanningImplementationDatesSpecification(id);
    const relations: FindOptionsRelations<ProjectPlanningImplementationDates> = {
      projectPlanning: {
        project: {
          workhouse: {
            work: true,
          },
          
        },
      },
      forceMajor: true,
    };
    // بررسی وجود Project Planning
    const projectPlanningImplementations = await this.projectPlanningImplementationDatesService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanningImplementations) {
      throw new HttpException("Project Planning Implementation Dates not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanningImplementations[0];

  }


  @Get("get-project-planning-implementation-dates-by-project-planning-id/:projectPlanningId")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'get project planning implementation dates by project id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation dates.', type: [ProjectPlanningImplementationDates] })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationDateByProjectPlanningId(@Param('projectPlanningId') projectPlanningId: number): Promise<ProjectPlanningImplementationDates[]> {

    var spec = new ProjectPlanningImplementationDateByProjectPlanningIdSpecification(projectPlanningId);
    const relations: FindOptionsRelations<ProjectPlanningImplementationDates> = {
      projectPlanning: {
        project: {
          workhouse: {
            work: true,
          },
        },
      },
      forceMajor: true,
    };
    // بررسی وجود Project Planning
    const projectPlanningImplementationDates = await this.projectPlanningImplementationDatesService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanningImplementationDates) {
      throw new HttpException("Project Planning Implementation Dates not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanningImplementationDates;

  }
  @Put("update-project-planning-implementation-dates")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'update project planning implementation dates' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation dates.', type: ProjectPlanningImplementationDates })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateProjectPlanningImplementationDates(@Body() projectPlanningDateDto: UpdateProjectPlanningImpelimentationDateDto): Promise<ProjectPlanningImplementationDates> {


    var checkProjectPlanning = await this.projectPlanningImplementationDatesService.getById(projectPlanningDateDto.id);
    if (!checkProjectPlanning) {
      throw new HttpException("The project planning implementation dates is not found!", HttpStatus.NOT_FOUND);
    }
    checkProjectPlanning.startDate = projectPlanningDateDto.startDate ?? checkProjectPlanning.startDate;
    checkProjectPlanning.endDate = projectPlanningDateDto.endDate ?? checkProjectPlanning.endDate;
    checkProjectPlanning.forceMajor = { id: projectPlanningDateDto.forceMajorId ?? checkProjectPlanning.forceMajor.id } as ForceMajors;
    checkProjectPlanning.projectPlanning = { id: projectPlanningDateDto.projectPlanningId ?? checkProjectPlanning.projectPlanning.id } as ProjectPlanings;
    checkProjectPlanning.recordStatus = projectPlanningDateDto.recordStatus ?? checkProjectPlanning.recordStatus;

    var updateProjectPlanning = await this.projectPlanningImplementationDatesService.update(checkProjectPlanning);
    var result = GenericMapper.toDto(ProjectPlanningImplementationDates, updateProjectPlanning, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-project-planning-implementation-dates/:id")
  @ApiTags('Project Planning Implementation Dates')
  @ApiOperation({ summary: 'remove project planning implementation dates' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteProjectPlanningImplementationDates(@Param('id') id: number): Promise<boolean> {

    var checkProjectPlanning = await this.projectPlanningImplementationDatesService.getById(id);
    if (!checkProjectPlanning) {
      throw new HttpException("Project Planning Implementation Dates not found", HttpStatus.NOT_FOUND);
    }

    var deleteProjectPlanning = await this.projectPlanningImplementationDatesService.delete(id);
    return true;
  }

  //#endregion 



  //#region Project Planning Implementation
  @Get("get-project-planning-Implementation")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'Project Planning Implementation list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning list.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningProjectPlanningImplementation(): Promise<ProjectPlanningImplementation[]> {
    const relation: FindOptionsRelations<ProjectPlanningImplementation> = {

      forceMajor: true,
      channelRow: {
        productType: true
      },
      transmissionRow: {
        fromProductType: {
          channelRows: {
            productType: true
          }
        }
      },

      projectPlanningImplementationDate: {

        projectPlanning: {
          project: {
            workhouse: {
              work: true,
            }
          }
        }
      }
    };
    var projectPlannings = await this.projectPlanningImplementationService.getWithSpecification(null, null, null, relation);
    return projectPlannings;
  }

  @Get("get-project-planning-Implementation-report/:projectId")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'Project Planning Implementation list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning list.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningProjectPlanningImplementationReport(@Param('projectId') projectId: number): Promise<ProjectImplementationReportDto[]> {

    var report = await this.projectPlanningImplementationService.getProjectPlanningImplementatoinReport(projectId);
    return report;
  }

  @Get("get-project-kpi/:projectId")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'Project Planning KPI report' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return project planning KPI total score.',
    schema: { type: 'number', example: 12 },
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationKpi(@Param('projectId') projectId: number): Promise<number> {
    return this.projectPlanningImplementationService.getProjectPlanningKpiTotal(projectId);
  }

  @Get("get-project-manager-kpi/:personnelId")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'Project Planning KPI total by chantier manager' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return chantier manager KPI average score (average of project KPI scores).',
    schema: { type: 'number', example: 16 },
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationKpiByManager(@Param('personnelId') personnelId: number): Promise<number> {
    return this.projectPlanningImplementationService.getChantierManagerKpiTotal(personnelId);
  }

  @Get("get-project-manager-kpi-report/:personnelId")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'Project KPI report by chantier manager with manager, workhouse, work and tender details' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return chantier manager KPI report (project KPI list + manager average KPI).',
    type: ChantierManagerKpiReportDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationKpiReportByManager(@Param('personnelId') personnelId: number): Promise<ChantierManagerKpiReportDto> {
    const report = await this.projectPlanningImplementationService.getChantierManagerKpiReport(personnelId);
    if (!report) {
      throw new HttpException("The manager is not found!", HttpStatus.NOT_FOUND);
    }

    return report;
  }

  @Post("create-project-planning-implementation")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'new project planning implementation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewProjectPlanningImplementation(@Body() projectPlanningDto: CreateProjectPlanningImplementationDto, @Request() req): Promise<ProjectPlanningImplementation> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    var projectPlanning = GenericMapper.toEntity(ProjectPlanningImplementation, projectPlanningDto);
    projectPlanning.projectPlanningImplementationDate = { id: projectPlanningDto.projectPlanningDateId } as ProjectPlanningImplementationDates;
    projectPlanning.channelRow = { id: projectPlanningDto.channelRowId } as ChannelRows;
    projectPlanning.transmissionRow = { id: projectPlanningDto.transmissionRowId } as TransmissionRows;
    projectPlanning.createAt = new Date();
    projectPlanning.recordStatus = recordStatus.Active;
    projectPlanning.user = checkUser[0];
    var createProjectPlanning = await this.projectPlanningImplementationService.add(projectPlanning);
    var result = GenericMapper.toDto(ProjectPlanningImplementation, createProjectPlanning, { excludeExtraneousValues: true });

    return result;
  }



  @Get("get-project-planning-implementation-by-id/:id")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'get project planning implementation by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationById(@Param('id') id: number): Promise<ProjectPlanningImplementation> {

    var spec = new ProjectPlanningImplementationSpecification(id);
    const relations: FindOptionsRelations<ProjectPlanningImplementation> = {

      forceMajor: true,
      channelRow: {
        productType: true
      },
      transmissionRow: {
        fromProductType: {
          channelRows: {
            productType: true
          }
        }
      },

      projectPlanningImplementationDate: {

        projectPlanning: {
          project: {
            workhouse: {
              work: true,
            }
          }
        }
      }
    };
    // بررسی وجود Project Planning
    const projectPlanningImplementations = await this.projectPlanningImplementationService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanningImplementations) {
      throw new HttpException("Project Planning Implementation not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanningImplementations[0];

  }


  @Get("get-project-planning-implementation-by-project-planning-id/:projectPlanningDateId")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'get project planning implementation by project id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getProjectPlanningImplementationByProjectPlanningDateId(@Param('projectPlanningDateId') projectPlanningDateId: number): Promise<ProjectPlanningImplementation> {

    var spec = new ProjectPlanningImplementationByProjectPlanningIdSpecification(projectPlanningDateId);
    const relations: FindOptionsRelations<ProjectPlanningImplementation> = {

      forceMajor: true,
      channelRow: {
        productType: true
      },
      transmissionRow: {
        fromProductType: {
          channelRows: {
            productType: true
          }
        }
      },

      projectPlanningImplementationDate: {

        projectPlanning: {
          project: {
            workhouse: {
              work: true,
            }
          }
        }
      }
    };
    // بررسی وجود Project Planning
    const projectPlanningImplementations = await this.projectPlanningImplementationService.getWithSpecification(spec, null, null, relations);
    if (!projectPlanningImplementations) {
      throw new HttpException("Project Planning Implementation not found", HttpStatus.NOT_FOUND);
    }
    return projectPlanningImplementations[0];

  }
  @Put("update-project-planning-implementation")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'update project planning implementation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return project planning implementation.', type: ProjectPlanningImplementation })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateProjectPlanningImplementation(@Body() projectPlanningDto: UpdateProjectPlanningImplementationDto): Promise<ProjectPlanningImplementation> {


    var checkProjectPlanning = await this.projectPlanningImplementationService.getById(projectPlanningDto.id);
    if (!checkProjectPlanning) {
      throw new HttpException("The project planning implementation is not found!", HttpStatus.NOT_FOUND);
    }

    checkProjectPlanning.kaziYapilanDirekDurumu = projectPlanningDto.kaziYapilanDirekDurumu ?? checkProjectPlanning.kaziYapilanDirekDurumu;
    checkProjectPlanning.altMontajiYapilanDirekDurumu = projectPlanningDto.altMontajiYapilanDirekDurumu ?? checkProjectPlanning.altMontajiYapilanDirekDurumu;
    checkProjectPlanning.betonAtilanDirekDurumu = projectPlanningDto.betonAtilanDirekDurumu ?? checkProjectPlanning.betonAtilanDirekDurumu;
    checkProjectPlanning.ustMontajiOrulenDirekDurumu = projectPlanningDto.ustMontajiOrulenDirekDurumu ?? checkProjectPlanning.ustMontajiOrulenDirekDurumu;
    checkProjectPlanning.ustMontajiKurulanDirekDurumu = projectPlanningDto.ustMontajiKurulanDirekDurumu ?? checkProjectPlanning.ustMontajiKurulanDirekDurumu;
    checkProjectPlanning.dikilenBetonDirekDurumu = projectPlanningDto.dikilenBetonDirekDurumu ?? checkProjectPlanning.dikilenBetonDirekDurumu;
    checkProjectPlanning.iletkenCekilenDirekDurumu = projectPlanningDto.iletkenCekilenDirekDurumu ?? checkProjectPlanning.iletkenCekilenDirekDurumu;
    checkProjectPlanning.ayiriciTakilanDirekDurumu = projectPlanningDto.ayiriciTakilanDirekDurumu ?? checkProjectPlanning.ayiriciTakilanDirekDurumu;
    checkProjectPlanning.dikilenAydinlatmaDirekDurumu = projectPlanningDto.dikilenAydinlatmaDirekDurumu ?? checkProjectPlanning.dikilenAydinlatmaDirekDurumu;
    checkProjectPlanning.kabloKanaliDurumu = projectPlanningDto.kabloKanaliDurumu ?? checkProjectPlanning.kabloKanaliDurumu;
    checkProjectPlanning.cekilenKabloMiktari = projectPlanningDto.cekilenKabloMiktari ?? checkProjectPlanning.cekilenKabloMiktari;
    checkProjectPlanning.transformatorDurumu = projectPlanningDto.transformatorDurumu ?? checkProjectPlanning.transformatorDurumu;
    checkProjectPlanning.dagitimPanosuDurumu = projectPlanningDto.dagitimPanosuDurumu ?? checkProjectPlanning.dagitimPanosuDurumu;
    checkProjectPlanning.sahaDagTMKutusuDurumu = projectPlanningDto.sahaDagTMKutusuDurumu ?? checkProjectPlanning.sahaDagTMKutusuDurumu;
    checkProjectPlanning.betonKoskDurumu = projectPlanningDto.betonKoskDurumu ?? checkProjectPlanning.betonKoskDurumu;
    checkProjectPlanning.hucreDurumu = projectPlanningDto.hucreDurumu ?? checkProjectPlanning.hucreDurumu;

    if (projectPlanningDto.projectPlanningDateId) {
      checkProjectPlanning.projectPlanningImplementationDate = { id: projectPlanningDto.projectPlanningDateId ?? checkProjectPlanning.projectPlanningImplementationDate.id } as ProjectPlanningImplementationDates;
    }
    if (projectPlanningDto.channelRowId) {
      checkProjectPlanning.channelRow = { id: projectPlanningDto.channelRowId ?? checkProjectPlanning.channelRow.id } as ChannelRows;
    }
    if (projectPlanningDto.transmissionRowId) {
      checkProjectPlanning.transmissionRow = { id: projectPlanningDto.transmissionRowId ?? checkProjectPlanning.transmissionRow.id } as TransmissionRows;
    }
    checkProjectPlanning.recordStatus = projectPlanningDto.recordStatus ?? checkProjectPlanning.recordStatus;

    var updateProjectPlanning = await this.projectPlanningImplementationService.update(checkProjectPlanning);
    var result = GenericMapper.toDto(ProjectPlanningImplementation, updateProjectPlanning, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-project-planning-implementation/:id")
  @ApiTags('Project Planning Implementation')
  @ApiOperation({ summary: 'remove project planning implementation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteProjectPlanningImplementation(@Param('id') id: number): Promise<boolean> {

    var checkProjectPlanning = await this.projectPlanningImplementationService.getById(id);
    if (!checkProjectPlanning) {
      throw new HttpException("Project Planning Implementation not found", HttpStatus.NOT_FOUND);
    }

    var deleteProjectPlanning = await this.projectPlanningImplementationService.delete(id);
    return true;
  }

  //#endregion 


  //#region car warehouse  details

  @Get("get-car-warehouse-details-by-warehouseId/:id")
  @ApiTags('Car Warehouse Details')
  @ApiOperation({ summary: 'Car Warehouses Details' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return car warehouse details.', type: [CarWarehouseDetails] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCarWarehouseDetailsByWarehouseId(@Param('id') id: number): Promise<CarWarehouseDetails[]> {
    var spec = new CarWarehouseDetailSpecification(id);
    const relations: FindOptionsRelations<CarWarehouseDetails> = {
      carWarehouse: {
        region: true,

      },

    };

    var operations = await this.carWarehouseDetailsService.getWithSpecification(spec, null, null, relations);

    return operations;
  }


  @Post("create-car-warehouse-detail")
  @ApiTags('Car Warehouse Details')
  @ApiBody({ type: CreateCarWarehouseDetailsDto, isArray: true })
  @ApiOperation({ summary: 'create new car warehouse detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return created car warehouse detail.', type: [CarWarehouseDetails] })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewCarWarehouseDetail(@Body() warehouseDto: CreateCarWarehouseDetailsDto[], @Request() req): Promise<boolean> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );
    var details: CarWarehouseDetails[] = [];
    warehouseDto.forEach(async (wh) => {
      const warehouse = new CarWarehouseDetails();
      warehouse.brand = wh.brand;
      warehouse.model = wh.model;
      warehouse.manufactureDate = wh.manufactureDate;
      warehouse.fuelType = wh.fuelType;
      warehouse.plaque = wh.plaque;
      warehouse.description = wh.description;
      warehouse.carWarehouse = { id: wh.carWarehouseId } as CarWarehouses;
      warehouse.attacments = wh.attachments ? wh.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
      warehouse.createAt = new Date();
      warehouse.recordStatus = recordStatus.Active;
      warehouse.available = true;
      warehouse.user = checkUser;
      details.push(warehouse);
    });


    await this.carWarehouseDetailsService.addMany(details);
    return true;
  }

  @Put("update-car-warehouse-detail")
  @ApiTags('Car Warehouse Details')
  @ApiOperation({ summary: 'update car warehouse detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated car warehouse detail.', type: CarWarehouseDetails })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCarWarehouse(@Body() warehouseDto: UpdateCarWarehouseDetailsDto, @Request() req): Promise<CarWarehouseDetails> {
    const user = req.user;
    var warehouse = await this.carWarehouseDetailsService.getById(warehouseDto.id);

    if (!warehouse) {
      throw new HttpException("The carwarehouse is not found!", HttpStatus.NOT_FOUND);
    }
    if (warehouse.available === false) {
      throw new HttpException("The carwarehouse is in use and cannot be set to unavailable!", HttpStatus.BAD_REQUEST);
    }
    warehouse.brand = warehouseDto.brand ?? warehouse.brand;
    warehouse.model = warehouseDto.model ?? warehouse.model;
    warehouse.manufactureDate = warehouseDto.manufactureDate ?? warehouse.manufactureDate;
    warehouse.fuelType = warehouseDto.fuelType ?? warehouse.fuelType;
    warehouse.plaque = warehouseDto.plaque ?? warehouse.plaque;
    if (warehouseDto.carWarehouseId) {
      warehouse.carWarehouse = { id: warehouseDto.carWarehouseId ?? warehouse.carWarehouse.id } as CarWarehouses;
    }
    if (warehouseDto.attachments && warehouseDto.attachments.length > 0) {
      warehouse.attacments = warehouseDto.attachments ? warehouseDto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    }
    warehouse.description = warehouseDto.description ?? warehouse.description;
    warehouse.recordStatus = warehouseDto.recordStatus ?? warehouse.recordStatus;
    await this.carWarehouseDetailsService.update(warehouse);
    return await this.carWarehouseDetailsService.getById(warehouseDto.id);
  }


  @Delete("delete-car-warehouse-details/:id")
  @ApiTags('Car Warehouse Details')
  @ApiOperation({ summary: 'remove car warehouse detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCarWarehouse(@Param('id') id: number): Promise<boolean> {
    await this.carWarehouseDetailsService.delete(id);
    return true;
  }
  //#endregion car  warehouse  details

  //#region Consigned Car
  @Get("get-all-consigned-cars")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'Consigned Car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllConsignedCars(@Req() req: any, @Query('rolename') rolename?: string): Promise<ConsignedCars[]> {


    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.CarWarehouse), null, { placeId: true }, null);
      var operations = await this.consignedCarService.getAllConsignedCars();

      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.carWarehouseDetail?.carWarehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.consignedCarService.getAllConsignedCars();

      return operations;
    }

  }

  @Get("get-all-available-cars")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'Consigned Car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllAvailableCars(@Req() req: any, @Query('rolename') rolename?: string): Promise<ConsignedCars[]> {


    //var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.CarWarehouse), null, { placeId: true }, null);
      var operations = await this.consignedCarService.getAllAvailableCars();

      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.carWarehouseDetail?.carWarehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.consignedCarService.getAllAvailableCars();

      return operations;
    }

  }
  @Get("get-consigned-cars-with-car-warehouseId/:id")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'Consigned Car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignedCarsByCarWarehouseId(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<ConsignedCars[]> {
    var specCarWare = new ConsignedCarByCarWarehouseIdSpecification(id);
    const relations: FindOptionsRelations<ConsignedCars> = {
      personnel: true,
      workhouse: true,
      carWarehouseDetail: {
        carWarehouse: {
          region: true,
        },

      }
    };

    //var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.CarWarehouse), null, { placeId: true }, null);
      var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.carWarehouseDetail?.carWarehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

      return operations;
    }

  }
  @Get("get-consigned-cars-with-car-warehouseDetailId/:id")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'Consigned Car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignedCarsByWarehouseId(@Param('id') id: number, @Req() req: any, @Query('rolename') rolename?: string): Promise<ConsignedCars[]> {
    var specCarWare = new ConsignedCarByCarWarehouseDetailIdSpecification(id);
    const relations: FindOptionsRelations<ConsignedCars> = {
      personnel: true,
      workhouse: true,
      carWarehouseDetail: {
        carWarehouse: {
          region: true,

        },


      }
    };

    //var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

    if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.CarWarehouse), null, { placeId: true }, null);
      var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.carWarehouseDetail?.carWarehouse.id) > -1);
      return operations;
    } else {
      var operations = await this.consignedCarService.getWithSpecification(specCarWare, null, null, relations);

      return operations;
    }

  }

  @Get("personnel-current-car/:id")
  @ApiOperation({ summary: "Get the current consigned car for a personnel" })
  @ApiTags('Consigned Car')
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCurrentCar(@Param("id") personnelId: number) {
    const result = await this.consignedCarService.getCurrentCarForPersonnel(
      personnelId,
    );

    if (!result) {
      return {
        message: "This personnel currently has no consigned car.",
      };
    }

    return result;
  }

  @Get("workhouse-current-car/:id")
  @ApiOperation({ summary: "Get the current consigned car for a personnel" })
  @ApiTags('Consigned Car')
  @ApiResponse({ status: HttpStatus.OK, description: 'return Consigned Car.', type: [ConsignedCars] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWorkhouseCurrentCar(@Param("id") workhouseId: number) {
    const result = await this.consignedCarService.getCarsConsignedToWorkhouse(
      workhouseId,
    );

    if (!result) {
      return {
        message: "This personnel currently has no consigned car.",
      };
    }

    return result;
  }


  @Post("create-consigned-car")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'create new consigned car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return created consigned car.', type: ConsignedCars })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createConsignedCar(@Body() dto: CreatConsignedCarDto, @Request() req): Promise<boolean> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const warehouse = new ConsignedCars();
    warehouse.date = dto.date;
    warehouse.consigned = dto.consigned;
    warehouse.description = dto.description;
    warehouse.kilometer = dto.kilometer;

    warehouse.carWarehouseDetail = { id: dto.carWarhouseDetailId } as CarWarehouseDetails;
    warehouse.personnel = { id: dto.personnelId } as Personnels;
    if (dto.workhouseId) {
      warehouse.workhouse = { id: dto.workhouseId } as Workhouses;
    }
    warehouse.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    warehouse.createAt = new Date();
    warehouse.recordStatus = recordStatus.Active;
    warehouse.user = checkUser;
    await this.consignedCarService.add(warehouse);

    var cardetail = await this.carWarehouseDetailsService.getById(dto.carWarhouseDetailId);
    cardetail.available = !dto.consigned;
    await this.carWarehouseDetailsService.update(cardetail);



    return true;
  }

  @Put("update-consigned-car")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'update consigned car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated consigned car.', type: ConsignedCars })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateConsignedCar(@Body() dto: UpdateConsignedCarDto, @Request() req): Promise<ConsignedCars> {
    const user = req.user;
    var consignedCar = await this.consignedCarService.getById(dto.id);
    if (!consignedCar) {
      throw new HttpException("The consigned car is not found!", HttpStatus.NOT_FOUND);
    }
    consignedCar.date = dto.date ?? consignedCar.date;
    consignedCar.description = dto.description ?? consignedCar.description;
    consignedCar.kilometer = dto.kilometer ?? consignedCar.kilometer;
    consignedCar.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    consignedCar.recordStatus = dto.recordStatus ?? consignedCar.recordStatus;
    await this.consignedCarService.update(consignedCar);
    return await this.consignedCarService.getById(dto.id);
  }


  @Delete("delete-consigned-car/:id")
  @ApiTags('Consigned Car')
  @ApiOperation({ summary: 'remove consigned Car' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteConsignedCar(@Param('id') id: number): Promise<boolean> {
    var spec = new ConsignedCarByIdSpecification(id);
    var relations: FindOptionsRelations<ConsignedCars> = {
      carWarehouseDetail: true,
    };

    var consignedCar = await this.consignedCarService.getWithSpecification(spec, null, null, relations);
    if (!consignedCar || consignedCar.length === 0) {
      throw new HttpException("The consigned car is not found!", HttpStatus.NOT_FOUND);
    }
    var cardetail = await this.carWarehouseDetailsService.getById(consignedCar[0].carWarehouseDetail.id);
    cardetail.available = true;
    await this.carWarehouseDetailsService.update(cardetail);
    await this.consignedCarService.delete(id);
    return true;
  }
  //#endregion car  warehouse  details
  //#region Car Fuels

  @Get("get-car-fuels/:carid")
  @ApiTags('Car Fuels')
  @ApiOperation({ summary: 'Car Fuels' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return Car Fuels.', type: [CarFuels] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCarFuels(@Param('carid') carid: number): Promise<CarFuels[]> {
    var spec = new CarFuelsByCarIdSpecification(carid);
    const relations: FindOptionsRelations<CarFuels> = {
      consignedCar: {
        carWarehouseDetail: {
          carWarehouse: true,
        },

      }
    };

    var operations = await this.carFuelsService.getWithSpecification(spec, null, null, relations);
    return operations;
  }


  @Post("create-car-fuel")
  @ApiTags('Car Fuels')
  @ApiOperation({ summary: 'create new car fuels' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return created car fuels.', type: CarFuels })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createCarFuel(@Body() dto: CreateCarFuelDto, @Request() req): Promise<CarFuels> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);

    const [checkUser] = await this.userService.getWithSpecification(
      user_specification,
      null,
      { id: true }
    );

    const carFuels = new CarFuels();
    carFuels.date = dto.date;
    carFuels.fuelType = dto.fuelType;
    carFuels.amount = dto.amount;
    carFuels.description = dto.description;
    carFuels.fee = dto.fee;
    carFuels.totatPrice = dto.totatPrice;
    carFuels.consignedCar = { id: dto.consignedCarId } as ConsignedCars;

    carFuels.attachment = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    carFuels.createAt = new Date();
    carFuels.recordStatus = recordStatus.Active;
    carFuels.user = checkUser;
    var result = await this.carFuelsService.add(carFuels);
    return result;
  }

  @Put("update-car-fuel")
  @ApiTags('Car Fuels')
  @ApiOperation({ summary: 'update car fuel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return updated car fuel.', type: CarFuels })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCarFuel(@Body() dto: UpdateCarFuelDto, @Request() req): Promise<CarFuels> {
    const user = req.user;
    var carFuel = await this.carFuelsService.getById(dto.id);
    if (!carFuel) {
      throw new HttpException("The car fuel is not found!", HttpStatus.NOT_FOUND);
    }
    carFuel.date = dto.date ?? carFuel.date;
    carFuel.fuelType = dto.fuelType ?? carFuel.fuelType;
    carFuel.amount = dto.amount ?? carFuel.amount;
    carFuel.attachment = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    carFuel.description = dto.description ?? carFuel.description;

    carFuel.fee = dto.fee ?? carFuel.fee;
    carFuel.totatPrice = dto.totatPrice ?? carFuel.totatPrice;
    if (dto.consignedCarId) {
      carFuel.consignedCar = { id: dto.consignedCarId } as ConsignedCars;
    }
    await this.carFuelsService.update(carFuel);
    return await this.carFuelsService.getById(dto.id);
  }


  @Delete("delete-car-fuel/:id")
  @ApiTags('Car Fuels')
  @ApiOperation({ summary: 'remove car fuel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCarFuel(@Param('id') id: number): Promise<boolean> {
    var carFuel = await this.carFuelsService.getById(id);
    if (!carFuel) {
      throw new HttpException("The car fuel is not found!", HttpStatus.NOT_FOUND);
    }

    await this.carFuelsService.delete(id);
    return true;
  }
  //#endregion car  warehouse  details





}


