import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpException, HttpStatus, Request, Put, BadRequestException, Req, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from '../../../application/services/user/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericMapper } from '../../helpers/mapper-classes';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAndClientRolesGuard, AdminRolesGuard } from 'src/auth/guards/roles.guard';
import { RoleService } from 'src/application/services/user/role.service';
import { RoleSpecification } from 'src/application/specifications/user/role-specifications';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { FindOptionsRelations } from 'typeorm';
import { StoreService } from 'src/application/services/admin/store.service';
import { StoreByWorkhouseSpecification } from 'src/application/specifications/admin/store-specifications';
import { PositionService } from 'src/application/services/hr/position.service';
import { Positions } from 'src/domain/entities/Positions';
import { CreatePositionDto, UpdatePositionDto } from 'src/presentation/dtos/hr/position-dto';
import { PersonnelsService } from 'src/application/services/hr/personnels.service';
import { Personnels } from 'src/domain/entities/Personnels';
import { CreatePersonnelDto, PersonnelSalaryDto, UpdatePersonnelDto } from 'src/presentation/dtos/hr/personnels-dto';
import { LeavesService } from 'src/application/services/hr/leaves.service';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeavePersonnelSpecification, LeaveSpecification } from 'src/application/specifications/hr/leave-specifications';
import { CreateLeaveDto, LeaveDaysDto, UpdateLeaveStatusDto } from 'src/presentation/dtos/hr/leaves-dto';
import { LeaveHistoriesService } from 'src/application/services/hr/leaveHistories.service';
import { LeaveHistories } from 'src/domain/entities/LeaveHistories';
import { PersonnelsForIdentitySpecification, PersonnelsSpecification } from 'src/application/specifications/hr/personnel-specifications';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';
import { PositionForNameSpecification } from 'src/application/specifications/hr/position-specifications';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { PersonnelWorkPlacesService } from 'src/application/services/hr/personnelWorkPlaces.service';
import { PersonnelWorkPlacesByIdSpecification, PersonnelWorkPlacesBytypeAndUserRoleIdSpecification, PersonnelWorkPlacesSpecification } from 'src/application/specifications/hr/personnelWorkPlaces-specifications';
import { CreatePersonnelWorkPlacesDto, UpdatePersonnelWorkPlacesDto } from 'src/presentation/dtos/hr/personnelWorkPlaces-dto';
import { Requests } from 'src/domain/entities/Requests';
import { RequestsService } from 'src/application/services/hr/requests.service';
import { RequestSpecification } from 'src/application/specifications/hr/request-specifications';
import { CreateRequestDto, UpdateRequestDto, UpdateRequestStatusDto } from 'src/presentation/dtos/hr/request-dto';
import { RequestStatusHistories } from 'src/domain/entities/RequestStatusHistories';
import { requestStatus } from 'src/domain/enums/requestSatus.enum';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { RollcallsService } from 'src/application/services/hr/rollcals.service';
import { RollCallsBIdSpecification, RollCallsByPersonnelIdSpecification } from 'src/application/specifications/hr/rollCals-specifications';
import { CreateRollCallDto, UpdateRollCallDto } from 'src/presentation/dtos/hr/rollcalls-dto';
import { Consignments } from 'src/domain/entities/Consignments';
import { ConsignmentsService } from 'src/application/services/hr/consignments.service';
import { CreateConsignmentsDto, UpdateConsignmentsDto } from 'src/presentation/dtos/hr/consignments-dto';
import { PersonnelConsigneds } from 'src/domain/entities/PersonnelConsigneds';
import { PersonnelConsignedsService } from 'src/application/services/hr/personnelConsigneds.service';
import { CreatePersonnelConsignedsDto, UpdatePersonelConsignmentsDto } from 'src/presentation/dtos/hr/personnel-consigneds-dto';
import { ConsignmentNosService } from 'src/application/services/hr/consignmentNo.service';
import { PersonnelConsignedDonReturnSpecification, PersonnelConsignedSpecification } from 'src/application/specifications/hr/personnel-consgined-specifications';
import { RoleMenuOperationService } from 'src/application/services/user/roleMenuOperation.service';
import { RoleMenuOperationByRoleIdAndMenuOperationIdSpecification } from 'src/application/specifications/user/roleMenuOperation-specifications';
import { ConsignedByCodeSpecification, ConsignmentsTakenByPersonnelSpecification } from 'src/application/specifications/hr/consignment-specifications';
import { WorkPlaceType } from 'src/domain/enums/workPlaceType.enum';
import { PersonnelSalaryService } from 'src/application/services/hr/personnelSalary.service';
import { PersonnelSalary } from 'src/domain/entities/PersonnelSalary';
import { PersonnelSalaryWithPersonnelIdSpecification } from 'src/application/specifications/hr/personnelSalary-specifications';
import { UserRoleSpecification } from 'src/application/specifications/user/user-role-specifications';
import { UserRoleService } from 'src/application/services/user/userRole.service';
import { Workhouses } from 'src/domain/entities/Workhouses';




@Controller('api/hr')
export class HrController {
  constructor(private readonly userService: UserService,
    private readonly postionService: PositionService,
    private readonly personnelService: PersonnelsService,
    private readonly leaveService: LeavesService,
    private readonly leaveHistoriesService: LeaveHistoriesService,
    private readonly gateway: NotificationsGateway,
    private readonly personnelWorkPlacesService: PersonnelWorkPlacesService,
    private readonly requestsService: RequestsService,
    private readonly rollcallsService: RollcallsService,
    private readonly consignmentsService: ConsignmentsService,
    private readonly personnelConsignedsService: PersonnelConsignedsService,
    private readonly consignmentNosService: ConsignmentNosService,
    private readonly roleService: RoleService,
    private readonly roleMenuOperationService: RoleMenuOperationService,
    private readonly storeService: StoreService,
    private readonly personnelSalaryService: PersonnelSalaryService,
    private readonly userRoleService: UserRoleService,


  ) { }

  private getLastRecord(records: PersonnelConsigneds[]): PersonnelConsigneds {
    // همه parent.id ها
    const parentIds = records.map(r => r.parent?.id ?? null);

    // آخرین رکورد یعنی رکوردی که id آن در parentIds وجود ندارد
    return records.find(r => !parentIds.includes(r.id));
  }


  //#region Position
  @Get("get-all-positions")
  @ApiTags('Position')
  @ApiOperation({ summary: 'Position' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllPositions(): Promise<any[]> {
    return this.postionService.getAllRecords();
  }

  @Get("get-position-by-id/:id")
  @ApiTags('Position')
  @ApiOperation({ summary: 'Positon' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return positionsh.', type: Positions })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPositionById(@Param('id') id: number): Promise<Positions> {

    var operations = await this.postionService.getById(id);
    if (!operations) {
      throw new HttpException("The Position is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }

  @Post("create-position")
  @ApiTags('Position')
  @ApiOperation({ summary: 'new postion' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return position .', type: Positions })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewPosition(@Body() dto: CreatePositionDto, @Request() req): Promise<Positions> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });

    var existingSpec = new PositionForNameSpecification(dto.title);
    var existingPositions = await this.postionService.getWithSpecification(existingSpec, null, null);
    if (existingPositions.length > 0) {
      throw new HttpException("The Position already exists!", HttpStatus.BAD_REQUEST);
    }

    var positon = GenericMapper.toEntity(Positions, dto);
    positon.createAt = new Date();
    positon.recordStatus = recordStatus.Active;
    positon.user = checkUser[0];

    var createRole = await this.postionService.add(positon);

    return createRole;
  }

  @Put("update-position")
  @ApiTags('Position')
  @ApiOperation({ summary: 'update position' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return position .', type: Positions })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatePosition(@Body() dto: UpdatePositionDto): Promise<Positions> {


    var item = await this.postionService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Position is not found!", HttpStatus.NOT_FOUND);
    }
    item.title = dto.title ?? item.title;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    var updateitem = await this.postionService.update(item);
    var result = GenericMapper.toDto(Positions, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-position/:id")
  @ApiTags('Position')
  @ApiOperation({ summary: 'remove positionn' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deletePositionn(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.postionService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Position is not found!", HttpStatus.NOT_FOUND);
    }

    await this.postionService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

  //#region Personnel
  @Get("get-all-personnels")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'Get all personnels' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllPersonnels(): Promise<any[]> {
    const relations: FindOptionsRelations<Personnels> = {
      position: true,

    };
    return this.personnelService.getWithSpecification(null, null, null, relations);
  }

  @Get("get-all-personnels-without-active-workplace")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'Get all personnels without active workplace' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllPersonnelsWithoutActiveWorkplace(): Promise<any[]> {
    return this.personnelService.getPersonnelsWithoutActiveWorkplace();
  }


  @Get("get-personnel-by-id/:id")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'Get personnel by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel.', type: Personnels })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelById(@Param('id') id: number): Promise<Personnels> {
    const relations: FindOptionsRelations<Personnels> = {
      position: true,

    };
    var spec = new PersonnelsSpecification(id);
    var operations = await this.personnelService.getWithSpecification(spec, null, null, relations);
    if (!operations) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Get("get-personnel-course-by-id/:id")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'Get personnel by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel.', type: Personnels })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelCourseById(@Param('id') id: number): Promise<any[]> {

    var operations = await this.personnelService.getPersonnelCourses(id);
    if (!operations) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }

  @Post("create-personnel")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'new personnel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel .', type: Personnels })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewPersonnel(@Body() dto: CreatePersonnelDto, @Request() req): Promise<Personnels> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var spec = new PersonnelsForIdentitySpecification(dto.identityNumber);
    var existingPersonnels = await this.personnelService.getWithSpecification(spec, null, null, null);
    if (existingPersonnels.length > 0) {
      if (existingPersonnels[0].workEndDate === null) {
        throw new HttpException("The Personnel already exists!", HttpStatus.BAD_REQUEST);
      }
    }

    var personnel = GenericMapper.toEntity(Personnels, dto);
   

    personnel.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    personnel.createAt = new Date();
    personnel.recordStatus = recordStatus.Active;
    personnel.user = checkUser[0];
    personnel.position = { id: dto.positionId } as Positions;

    var createRole = await this.personnelService.add(personnel);
     var personnelSalary = new PersonnelSalary();
    personnelSalary.salary = dto.salary ?? 0;
    personnelSalary.createAt = new Date();
    personnelSalary.recordStatus = recordStatus.Active;
    personnelSalary.user = checkUser[0];
    personnelSalary.personnel = { id: createRole.id } as Personnels;
    await this.personnelSalaryService.add(personnelSalary);
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: personnel.id,
      createdAt: personnel.createAt,
      type: 'personnel-created',
    });
    return createRole;
  }

  @Put("update-personnel")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'update personnel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel .', type: Personnels })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatePersonnel(@Body() dto: UpdatePersonnelDto): Promise<Personnels> {

    var item = await this.personnelService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }
    item.name = dto.name ?? item.name;
    item.imageSrc = dto.imageSrc ?? item.imageSrc;
    item.family = dto.family ?? item.family;
    item.identityNumber = dto.identityNumber ?? item.identityNumber;
    item.workStartDate = dto.workStartDate ?? item.workStartDate;
    item.workEndDate = dto.workEndDate ?? item.workEndDate;
    item.insuranceNumber = dto.insuranceNumber ?? item.insuranceNumber;
    item.sex = dto.sex ?? item.sex;
    item.salaryType = dto.salaryType ?? item.salaryType;
    item.salaryAccrualMethod = dto.salaryAccrualMethod ?? item.salaryAccrualMethod;
    item.group = dto.group ?? item.group;
    item.birthPlace = dto.birthPlace ?? item.birthPlace;
    item.birthDate = dto.birthDate ?? item.birthDate;
    item.maritalStatus = dto.maritalStatus ?? item.maritalStatus;
    item.fatherName = dto.fatherName ?? item.fatherName;
    item.bloodType = dto.bloodType ?? item.bloodType;
    item.address = dto.address ?? item.address;
    item.educationStatus = dto.educationStatus ?? item.educationStatus;
    item.iban = dto.iban ?? item.iban;
    item.telephone = dto.telephone ?? item.telephone;
    item.mobile = dto.mobile ?? item.mobile;
    if (dto.positionId) {
      item.position = { id: dto.positionId } as Positions;
    }
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    item.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    item.hasISG = dto.hasISG ?? item.hasISG;

    var updateitem = await this.personnelService.update(item);
    var result = GenericMapper.toDto(Personnels, updateitem, { excludeExtraneousValues: true });
    return result;
  }

  @Put("update-personnel-salary")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'update personnel salary' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel salary.', type: PersonnelSalary })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatePersonnelSalary(@Body() dto: PersonnelSalaryDto, @Request() req): Promise<PersonnelSalary> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var personnel = await this.personnelService.getById(dto.personnelId);
    if (!personnel) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }
    personnel.salary = dto.salary ?? personnel.salary;
    await this.personnelService.update(personnel);

    var spec = new PersonnelSalaryWithPersonnelIdSpecification(dto.personnelId);
    var relations: FindOptionsRelations<PersonnelSalary> = {
      personnel: true,
    };

    var item = await this.personnelSalaryService.getWithSpecification(spec, null, null, relations);
    if (!item) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }

    var personnelSalary = new PersonnelSalary();
    personnelSalary.salary = dto.salary ?? 0;
    personnelSalary.createAt = new Date();
    personnelSalary.recordStatus = recordStatus.Active;
    personnelSalary.user = checkUser[0];
    personnelSalary.personnel = personnel;
    await this.personnelSalaryService.add(personnelSalary);

    var specWorkPlace=new PersonnelWorkPlacesSpecification(personnel.id);
    var personnelWorkPlace=await this.personnelWorkPlacesService.getWithSpecification(specWorkPlace,null,null,null);

    var currentWorkPlace=personnelWorkPlace.find(p=>p.endDate===null);
    if(currentWorkPlace){
      currentWorkPlace.salary=dto.salary??currentWorkPlace.salary;
      await this.personnelWorkPlacesService.update(currentWorkPlace);
    }


    return personnelSalary;
  }


  @Delete("delete-personnel/:id")
  @ApiTags('Personnel')
  @ApiOperation({ summary: 'remove personnel' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deletePersonnel(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.personnelService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Personnel is not found!", HttpStatus.NOT_FOUND);
    }

    await this.personnelService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

  //#region Leave
  @Get("get-all-leaves")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'Get all leaves' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllLeaves(): Promise<any[]> {
    const relations: FindOptionsRelations<Leaves> = {
      leaveHistories: true,
      personnel: true

    };
    return this.leaveService.getWithSpecification(null, null, null, relations);
  }
  @Get("get-leave-by-personnelId/:id")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'Get leave by personnel id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return leave.', type: Leaves })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getLeaveByPersonnelId(@Param('id') id: number): Promise<Leaves> {
    const relations: FindOptionsRelations<Leaves> = {
      leaveHistories: true,
      personnel: true

    };

    var specification = new LeavePersonnelSpecification(id);
    var operations = this.leaveService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Leave is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Get("get-remaining-leave-by-personnelId/:id")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'Get remaining leave by personnel id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return remaining leave.', type: LeaveDaysDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRemainingLeaveByPersonnelId(@Param('id') id: number): Promise<LeaveDaysDto> {
    return this.leaveService.calculateLeaveDays(id);
  }

  @Get("get-leave-by-id/:id")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'Get leave by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return leave.', type: Leaves })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getLeaveById(@Param('id') id: number): Promise<Leaves> {
    const relations: FindOptionsRelations<Leaves> = {
      leaveHistories: true,
      personnel: true

    };

    var specification = new LeaveSpecification(id);
    var operations = this.leaveService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Leave is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-leave")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'Create a new leave' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created leave.', type: Leaves })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewLeave(@Body() dto: CreateLeaveDto, @Request() req): Promise<Leaves> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });



    var leave = GenericMapper.toEntity(Leaves, dto);
    leave.createAt = new Date();
    leave.recordStatus = recordStatus.Active;
    leave.user = checkUser[0];
    leave.personnel = { id: dto.personnelId } as Personnels;
    leave.status = 0;
    var item = new LeaveHistories();
    item.description = null;
    item.leave = leave;
    item.user = checkUser[0];
    item.status = 0;
    item.createAt = new Date();
    item.recordStatus = recordStatus.Active;
    var createLeave = await this.leaveService.add(leave);
    await this.leaveHistoriesService.add(item);
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: leave.id,
      createdAt: leave.createAt,
      type: 'leave-created',
    });
    return createLeave;
  }

  @Put("update-leave-status")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'update leave status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return leave .', type: Leaves })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateLeaveStatus(@Body() dto: UpdateLeaveStatusDto, @Request() req): Promise<Leaves> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var item = await this.leaveService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Leave is not found!", HttpStatus.NOT_FOUND);
    }
    item.status = dto.status ?? item.status
    var hs = new LeaveHistories();
    hs.description = null;
    hs.leave = item;
    hs.user = checkUser[0];
    hs.status = 0;
    hs.createAt = new Date();
    hs.recordStatus = recordStatus.Active;
    await this.leaveHistoriesService.add(hs);
    var updateitem = await this.leaveService.update(item);
    var result = GenericMapper.toDto(Leaves, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-leave/:id")
  @ApiTags('Leaves')
  @ApiOperation({ summary: 'remove leave' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteLeave(@Param('id') id: number): Promise<boolean> {
    var specification = new LeaveSpecification(id);
    var relations: FindOptionsRelations<Leaves> = {
      leaveHistories: true,

    };
    var checkOperation = await this.leaveService.getWithSpecification(specification, null, null, relations);
    if (!checkOperation) {
      throw new HttpException("The Leave is not found!", HttpStatus.NOT_FOUND);
    }
    const leave = checkOperation[0];
    if (leave && leave.leaveHistories && leave.leaveHistories.length > 0) {
      for (const history of leave.leaveHistories) {
        if (history && history.id) {
          await this.leaveHistoriesService.delete(history.id);
        }
      }
    }

    await this.leaveService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction
  //#region Requests
  @Get("get-all-requests")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'Get all requests' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllRequests(@Req() req: any,@Query('rolename') rolename?: string): Promise<any[]> {


    const relations: FindOptionsRelations<Requests> = {
      user: true,
      requestStatusHistories: { user: true },
      workhouse: true

    };

     if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Workhouse), null, { placeId: true }, null);
      var operations = await this.requestsService.getWithSpecification(null, null, null, relations);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.workhouse?.id) > -1);
      return operations;
    } else {
    return this.requestsService.getWithSpecification(null, null, null, relations);
    }
  }

  @Get("get-request-by-id/:id")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'Get request by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return request.', type: Requests })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRequestById(@Param('id') id: number): Promise<Requests> {
    const relations: FindOptionsRelations<Requests> = {
      user: true,
      requestStatusHistories: { user: true },
      workhouse: true
    };

    var specification = new RequestSpecification(id);
    var operations = this.requestsService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Request is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-Request")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'Create a new request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created request.', type: Requests })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewRequest(@Body() dto: CreateRequestDto, @Request() req): Promise<Requests> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });



    var request = GenericMapper.toEntity(Requests, dto);
    request.createAt = new Date();
    request.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    request.recordStatus = recordStatus.Active;
    request.status = requestStatus.PENDING;
    request.user = checkUser[0];
    request.workhouse = dto.workhouseId ? { id: dto.workhouseId } as Workhouses : null;
    var histories = new RequestStatusHistories();
    histories.createAt = new Date();
    histories.recordStatus = recordStatus.Active;

    histories.status = requestStatus.PENDING;
    histories.user = checkUser[0];
    request.requestStatusHistories = [histories];
    var createRequest = await this.requestsService.add(request);
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: createRequest.id,
      createdAt: createRequest.createAt,
      type: 'request',
    });
    return createRequest;
  }

  @Put("update-request")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'update request status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return request .', type: Requests })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateRequest(@Body() dto: UpdateRequestDto, @Request() req): Promise<Requests> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var item = await this.requestsService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Request is not found!", HttpStatus.NOT_FOUND);
    }

    item.description = dto.description ?? null;
    item.subject = dto.subject ?? null;
    item.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    item.user = checkUser[0];
    item.workhouse = dto.workhouseId ? { id: dto.workhouseId } as Workhouses : null;
    var updateitem = await this.requestsService.update(item);
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: item.id,
      createdAt: item.createAt,
      type: 'request',
    });
    return updateitem;
  }

  @Put("update-request-status")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'update request status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return request .', type: Requests })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateRequestStatus(@Body() dto: UpdateRequestStatusDto, @Request() req): Promise<Requests> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    const relations: FindOptionsRelations<Requests> = {
      user: true,
      requestStatusHistories: { user: true }
    };

    var specification = new RequestSpecification(dto.id);
    var op = await this.requestsService.getWithSpecification(specification, null, null, relations);

    if (!op) {
      throw new HttpException("The Request is not found!", HttpStatus.NOT_FOUND);
    }

    var item = op[0]
    item.status = dto.status;
    item.statusDescription = dto.statusDescription ?? null;


    item.user = checkUser[0];

    var histories = new RequestStatusHistories();
    histories.createAt = new Date();
    histories.recordStatus = recordStatus.Active;

    histories.status = dto.status;
    histories.statusDescription = dto.statusDescription ?? null;
    histories.user = checkUser[0];
    item.requestStatusHistories.forEach(h => h.recordStatus = recordStatus.Inactive);

    item.requestStatusHistories.push(histories);

    var updateitem = await this.requestsService.update(item);
    this.gateway.notifyRole(['admin'], 'new-notify', {
      id: item.id,
      createdAt: item.createAt,
      type: 'request',
    });
    return updateitem;
  }
  @Delete("delete-request/:id")
  @ApiTags('Requests')
  @ApiOperation({ summary: 'remove request' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteRequest(@Param('id') id: number): Promise<boolean> {
    await this.requestsService.remove(id);
    return true;
  }

  //#endregion warehouse  transaction



  //#region Personnel Work Places
  @Get("get-all-personnels-work-places")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Get all personnel work places' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllPersonnelsWorkPlaces(): Promise<PersonnelWorkPlaces[]> {
    const relations: FindOptionsRelations<PersonnelWorkPlaces> = {
      personnel: true,
      position: true,
      userRole: { role: true }

    };

    return this.personnelWorkPlacesService.getWithSpecification(null, null, null, relations);
  }

  @Get("get-all-personnels-work-places-by-workhouse/:id")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Get all personnel work places' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllPersonnelsWorkPlacesByWorkhouse(@Param('id') id: number): Promise<PersonnelWorkPlaces[]> {
    const relations: FindOptionsRelations<PersonnelWorkPlaces> = {
      personnel: true,
      position: true,
      userRole: { role: true }

    };
    var result = await this.personnelWorkPlacesService.getWithSpecification(null, null, null, relations);
    var storeSpec = new StoreByWorkhouseSpecification(id);
    var stores = await this.storeService.getWithSpecification(storeSpec, null, { id: true }, null);

    result = (result).filter(p => p.type == WorkPlaceType.Workhouse || p.type == WorkPlaceType.Store);
    result = result.filter(p => {
      if (p.type == WorkPlaceType.Store && stores.findIndex(s => s.id == p.placeId) > -1) {
        return true;
      }
      if (p.type == WorkPlaceType.Workhouse && p.placeId == id) {
        return true;
      }
      return false;
    });

    return result;
  }
  @Get("get-personnel-work-place-by-personnelId/:id")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Get personnel work place by personnel id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel work place.', type: PersonnelWorkPlaces })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelWorkPlaceByPersonnelId(@Param('id') id: number): Promise<PersonnelWorkPlaces> {
    const relations: FindOptionsRelations<PersonnelWorkPlaces> = {
      personnel: true,
      position: true,
      userRole: { role: true }
    };

    var specification = new PersonnelWorkPlacesSpecification(id);
    var operations = this.personnelWorkPlacesService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Personnel Work Place is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }
  @Get("get-personnel-work-place-by-id/:id")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Get personnel work place by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel work place.', type: PersonnelWorkPlaces })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelWorkPlaceById(@Param('id') id: number): Promise<PersonnelWorkPlaces> {
    const relations: FindOptionsRelations<PersonnelWorkPlaces> = {
      personnel: true,
      position: true,
      userRole: { role: true }
    };

    var specification = new PersonnelWorkPlacesByIdSpecification(id);
    var operations = this.personnelWorkPlacesService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Personnel Work Place is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-personnel-work-place")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Create a new personnel work place' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created personnel work place.', type: PersonnelWorkPlaces })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewPersonnelWorkPlace(@Body() dto: CreatePersonnelWorkPlacesDto, @Request() req): Promise<PersonnelWorkPlaces> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });



    var personnelWorkPlace = GenericMapper.toEntity(PersonnelWorkPlaces, dto);
    personnelWorkPlace.createAt = new Date();
    personnelWorkPlace.recordStatus = recordStatus.Active;
    personnelWorkPlace.user = checkUser[0];
    personnelWorkPlace.personnel = { id: dto.personnelId } as Personnels;
    personnelWorkPlace.position = { id: dto.positionId } as Positions;
    personnelWorkPlace.userRole = { id: dto.userRoleId } as unknown as UserRoles;
    var created = await this.personnelWorkPlacesService.add(personnelWorkPlace);
    return created;
  }


  @Post("create-personnel-work-place-as-bulk")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'Create a new personnel work place' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created personnel work place.', type: PersonnelWorkPlaces })
  @ApiBody({ type: CreatePersonnelWorkPlacesDto, isArray: true })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewPersonnelWorkPlaceAsBulk(@Body() dtos: CreatePersonnelWorkPlacesDto[], @Request() req): Promise<PersonnelWorkPlaces[]> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var items: PersonnelWorkPlaces[] = [];
    dtos.forEach(dto => {

      var personnelWorkPlace = GenericMapper.toEntity(PersonnelWorkPlaces, dto);
      personnelWorkPlace.createAt = new Date();
      personnelWorkPlace.recordStatus = recordStatus.Active;
      personnelWorkPlace.user = checkUser[0];
      personnelWorkPlace.personnel = { id: dto.personnelId } as Personnels;
      personnelWorkPlace.position = { id: dto.positionId } as Positions;
      personnelWorkPlace.userRole = { id: dto.userRoleId } as unknown as UserRoles;
      items.push(personnelWorkPlace);
    });
    var created = await this.personnelWorkPlacesService.addMany(items);
    return created;
  }


  @Put("update-personnel-work-place")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'update personnel work place' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel work place.', type: PersonnelWorkPlaces })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatePersonnelWorkPlace(@Body() dto: UpdatePersonnelWorkPlacesDto, @Request() req): Promise<PersonnelWorkPlaces> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var item = await this.personnelWorkPlacesService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Personnel Work Place is not found!", HttpStatus.NOT_FOUND);
    }

    item.recordStatus = dto.recordStatus ?? item.recordStatus;
    if (dto.positionId) {
      item.position = { id: dto.positionId } as Positions;
    }
    if (dto.userRoleId) {
      item.userRole = { id: dto.userRoleId } as unknown as UserRoles;
    }
    if (dto.personnelId) {
      item.personnel = { id: dto.personnelId } as Personnels;
    }
    item.description = dto.description ?? item.description;
    item.endDate = dto.endDate ?? item.endDate;
    item.startDate = dto.startDate ?? item.startDate;
    item.placeId = dto.placeId ?? item.placeId;
    item.type = dto.type ?? item.type;
   



    var updateitem = await this.personnelWorkPlacesService.update(item);
    var result = GenericMapper.toDto(PersonnelWorkPlaces, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-personnel-work-place/:id")
  @ApiTags('Personnel Work Places')
  @ApiOperation({ summary: 'remove personnel work place' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deletePersonnelWorkPlace(@Param('id') id: number): Promise<boolean> {
    var checkOperation = await this.personnelWorkPlacesService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Personnel Work Place is not found!", HttpStatus.NOT_FOUND);
    }
    await this.personnelWorkPlacesService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region RollCalls
  @Get("get-all-RollCalls")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'Get all roll calls' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllRollCalls(@Req() req: any, @Query('rolename') rolename?: string): Promise<Rollcalls[]> {
    const relations: FindOptionsRelations<Rollcalls> = {
      personnelWorkPlace: {
        personnel: true, position: true,
        userRole: { role: true }
      },

    };
     if (rolename) {
      var spec = new UserRoleSpecification(rolename, req.user.userid);
      var userRoleId = await this.userRoleService.getWithSpecification(spec, null, { id: true }, null);
      var workPlaces = await this.personnelWorkPlacesService.getWithSpecification(new PersonnelWorkPlacesBytypeAndUserRoleIdSpecification(userRoleId[0].id, WorkPlaceType.Workhouse), null, { placeId: true }, null);
       var operations = await this.rollcallsService.getWithSpecification(null, null, null, relations);
      operations = operations.filter(w => workPlaces.findIndex(wp => wp.placeId === w.personnelWorkPlace.placeId) > -1);
      return operations;
    } else {
    return await this.rollcallsService.getWithSpecification(null, null, null, relations);
    }
  }
  @Get("get-roll-call-by-personnelId/:id")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'Get roll call by personnel id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return roll call.', type: [Rollcalls] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRollCallByPersonnelId(@Param('id') id: number): Promise<Rollcalls[]> {
    const relations: FindOptionsRelations<Rollcalls> = {
      personnelWorkPlace: {
        personnel: true, position: true,
        userRole: { role: true }
      },
    };

    var specification = new RollCallsByPersonnelIdSpecification(id);
    var operations = await this.rollcallsService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Roll Call is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }
  @Get("get-roll-call-by-id/:id")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'Get roll call by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return roll call.', type: Rollcalls })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRollCallById(@Param('id') id: number): Promise<Rollcalls> {
    const relations: FindOptionsRelations<Rollcalls> = {
      personnelWorkPlace: {
        personnel: true, position: true,
        userRole: { role: true }
      },
    };

    var specification = new RollCallsBIdSpecification(id);
    var operations = this.rollcallsService.getWithSpecification(specification, null, null, relations);
    if (!operations) {
      throw new HttpException("The Roll Call is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-roll-call")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'Create a new roll call' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created roll call.', type: Rollcalls })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewRollCall(@Body() dto: CreateRollCallDto, @Request() req): Promise<Rollcalls> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });

    var rollCall = GenericMapper.toEntity(Rollcalls, dto);
    rollCall.createAt = new Date();
    rollCall.recordStatus = recordStatus.Active;
    rollCall.user = checkUser[0];
    rollCall.personnelWorkPlace = { id: dto.personnelWorkPlaceId } as PersonnelWorkPlaces;
    var created = await this.rollcallsService.add(rollCall);
    return created;
  }



  @Put("update-roll-call")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'update roll call' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return roll call.', type: Rollcalls })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateRollCall(@Body() dto: UpdateRollCallDto, @Request() req): Promise<Rollcalls> {

    var item = await this.rollcallsService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Roll Call is not found!", HttpStatus.NOT_FOUND);
    }

    if (dto.personnelWorkPlaceId) {
      item.personnelWorkPlace = { id: dto.personnelWorkPlaceId } as PersonnelWorkPlaces;
    }


    item.date = dto.date ?? item.date;
    item.startTime = dto.startTime ?? item.startTime;
    item.endTime = dto.endTime ?? item.endTime;
    item.absence = dto.absence ?? item.absence;
    var updateitem = await this.rollcallsService.update(item);
    var result = GenericMapper.toDto(Rollcalls, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-roll-call/:id")
  @ApiTags('RollCalls')
  @ApiOperation({ summary: 'remove roll call' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteRollCall(@Param('id') id: number): Promise<boolean> {
    var checkOperation = await this.rollcallsService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Roll Call is not found!", HttpStatus.NOT_FOUND);
    }
    await this.rollcallsService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region Consignments
  @Get("get-all-consignments")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get all consignments' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllConsignments(): Promise<Consignments[]> {
    return await this.consignmentsService.getWithSpecification(null, null, null, null);
  }
  @Get("get-consignments-status")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get consignments status' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignmentsStatus(): Promise<any[]> {
    return await this.consignmentsService.getConsignmentsStatus();
  }


  @Get("get-available-consignments")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get all consignments for personnel select' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAvailableConsignments(): Promise<Consignments[]> {
    return await this.consignmentsService.finAvailableConsignments();
  }

  
  @Get("get-in-used-consignments")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get all consignments for personnel select' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getInUsedConsignments(): Promise<Consignments[]> {
    return await this.consignmentsService.findConsignmentsInUse();
  }

  @Get("get-consignments-for-personnel-return/:personnelId")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get consignments that personnel can return' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignmentsForPersonnelReturn(
    @Param('personnelId') personnelId: number
  ): Promise<Consignments[]> {

    return await this.consignmentsService.findPersonelConsigneds(personnelId);
  }



  @Get("get-consignments-by-id/:id")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get consignment by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return consignment.', type: Consignments })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignmentById(@Param('id') id: number): Promise<Consignments> {


    var operations = await this.consignmentsService.getById(id);
    if (!operations) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }




  @Get("get-consignments-by-qrcode/:code/:role")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get consignment by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return consignment.', type: Consignments })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConsignmentByQrcode(@Param('code') code: string, @Param('role') role: string): Promise<Consignments> {
    var spec = new RoleSpecification(role);
    var userRole = await this.roleService.getWithSpecification(spec, null, { id: true });
    var roleId = userRole.length > 0 ? userRole[0].id : 0;
    var roleMenuSpec = new RoleMenuOperationByRoleIdAndMenuOperationIdSpecification(roleId, 212);
    var roleMenuOperation = await this.roleMenuOperationService.getWithSpecification(roleMenuSpec);

    if (!roleMenuOperation || roleMenuOperation.length === 0) {
      throw new HttpException("You do not have access to view consignment details!", HttpStatus.FORBIDDEN);
    }
    var consignSpec = new ConsignedByCodeSpecification(code);
    var operations = await this.consignmentsService.getWithSpecification(consignSpec, null, {});
    if (!operations || operations.length === 0) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-consignment")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Create a new consignment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created consignment.', type: Consignments })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewConsignment(@Body() dto: CreateConsignmentsDto, @Request() req): Promise<Consignments> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });

    var consignedNo = await this.consignmentNosService.getLatestNo(checkUser[0].id);
    var consignment = GenericMapper.toEntity(Consignments, dto);
    consignment.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    consignment.code = consignedNo;
    consignment.createAt = new Date();
    consignment.recordStatus = recordStatus.Active;
    consignment.user = checkUser[0];
    var created = await this.consignmentsService.add(consignment);
    return created;
  }


  @Put("update-consignment")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'update consignment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return consignment.', type: Consignments })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateConsignment(@Body() dto: UpdateConsignmentsDto, @Request() req): Promise<Consignments> {
    var item = await this.consignmentsService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    item.name = dto.name ?? item.name;
    item.description = dto.description ?? item.description;
    item.placeId = dto.placeId ?? item.placeId;
    item.placeType = dto.placeType ?? item.placeType;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;
    item.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    var updateitem = await this.consignmentsService.update(item);
    var result = GenericMapper.toDto(Consignments, updateitem, { excludeExtraneousValues: true });
    return result;
  }

  @Delete("delete-consignment/:id")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'remove consignment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteConsignment(@Param('id') id: number): Promise<boolean> {
    var checkOperation = await this.consignmentsService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }

    await this.consignmentsService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region Personnel Consigneds 
  @Get("get-all-personnel-consigneds")
  @ApiTags('PersonnelConsigneds')
  @ApiOperation({ summary: 'Get all personnel consigneds' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllpersonnelConsigneds(): Promise<PersonnelConsigneds[]> {
    var relations: FindOptionsRelations<PersonnelConsigneds> = {
      consignment: true,
      personnel: true
    };
    return await this.personnelConsignedsService.getWithSpecification(null, null, null, relations);
  }

  @Get("get-personnel-consigned-by-id/:id")
  @ApiTags('PersonnelConsigneds')
  @ApiOperation({ summary: 'Get personnel consigned by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel consigned.', type: PersonnelConsigneds })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelConsignedById(@Param('id') id: number): Promise<PersonnelConsigneds> {
    var specification = new PersonnelConsignedSpecification(id);
    var relations: FindOptionsRelations<PersonnelConsigneds> = {
      consignment: true,
      personnel: true
    };
    var operations = await this.personnelConsignedsService.getWithSpecification(specification, null, null, relations);

    if (!operations) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Get("ckeck-personnel-consignments/:personnelId")
  @ApiTags('Consignments')
  @ApiOperation({ summary: 'Get consignment by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return consignment.', type: [PersonnelConsigneds] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getPersonnelDontReturnConsignments(@Param('personnelId') personnelId: number): Promise<PersonnelConsigneds[]> {

    var specification = new PersonnelConsignedDonReturnSpecification(personnelId);
    var relations: FindOptionsRelations<PersonnelConsigneds> = {
      consignment: true
    };
    var operations = await this.personnelConsignedsService.getWithSpecification(specification, null, null, relations);

    if (!operations) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }


  @Post("create-personnel-consigned")
  @ApiTags('PersonnelConsigneds')
  @ApiOperation({ summary: 'Create a new personnel consigned' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the created personnel consigned.', type: PersonnelConsigneds })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewPersonnelConsigned(@Body() dto: CreatePersonnelConsignedsDto, @Request() req): Promise<PersonnelConsigneds> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var consignment = GenericMapper.toEntity(PersonnelConsigneds, dto);
    consignment.consignment = { id: dto.consignmentId } as unknown as Consignments;
    consignment.personnel = { id: dto.personnelId } as Personnels;
    consignment.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    consignment.createAt = new Date();
    consignment.recordStatus = recordStatus.Active;
    consignment.user = checkUser[0];
    var created = await this.personnelConsignedsService.add(consignment);
    return created;
  }


  @Put("update-personnel-consigned")
  @ApiTags('PersonnelConsigneds')
  @ApiOperation({ summary: 'update personnel consigned' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return personnel consigned.', type: PersonnelConsigneds })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updatePersonnelConsigned(@Body() dto: UpdatePersonelConsignmentsDto, @Request() req): Promise<PersonnelConsigneds> {
    var item = await this.personnelConsignedsService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Consignment is not found!", HttpStatus.NOT_FOUND);
    }
    item.assignmentDate = dto.assignmentDate ?? item.assignmentDate;
    item.description = dto.description ?? item.description;
    item.attachments = dto.attachments ?? item.attachments;
    if (dto.consignmentId)
      item.consignment = { id: dto.consignmentId } as unknown as Consignments;
    if (dto.personnelId)
      item.personnel = { id: dto.personnelId } as Personnels;
    item.returnDate = dto.returnDate ?? item.returnDate;
    item.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    var updateitem = await this.personnelConsignedsService.update(item);
    var result = GenericMapper.toDto(PersonnelConsigneds, updateitem, { excludeExtraneousValues: true });
    return result;
  }

  @Delete("delete-personnel-consigned/:id")
  @ApiTags('PersonnelConsigneds')
  @ApiOperation({ summary: 'remove consignment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deletePersonnelConsignment(@Param('id') id: number): Promise<boolean> {
    var checkOperation = await this.personnelConsignedsService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Personnel Consigned is not found!", HttpStatus.NOT_FOUND);
    }

    await this.personnelConsignedsService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

}


