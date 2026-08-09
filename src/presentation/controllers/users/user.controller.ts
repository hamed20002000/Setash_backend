import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpException, HttpStatus, Request, Put, BadRequestException, Req, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from '../../../application/services/user/user.service';

import { Users } from 'src/domain/entities/Users';
import { CreateUserOperationsDto, CreateUserRolesDto, UserDto, UserUpdateDto } from '../../dtos/user/user.dto';
import { changePasswordDto, registerUserDto, resetPasswordDto } from '../../dtos/user/register-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GenericMapper } from '../../helpers/mapper-classes';
import { UsernameAndPasswordSpecification, UsernameSpecification, UserSpecification } from 'src/application/specifications/user/user-specifications';



import { PasswordService } from 'src/application/services/helper/password.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { CreateRoleDto,  CreateRoleMenuOperationsDto,  DeleteRoleDto, RoleListDto, UpdateRoleDto } from 'src/presentation/dtos/user/role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAndClientRolesGuard, AdminRolesGuard } from 'src/auth/guards/roles.guard';
import { RoleService } from 'src/application/services/user/role.service';
import { RoleIdsSpecification, RoleNamesSpecification, RoleSpecification } from 'src/application/specifications/user/role-specifications';
import { Roles } from 'src/domain/entities/Roles';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { FindOptionsRelations, In } from 'typeorm';
import { CreateSystemOperationDto, SystemOperationListDto, UpdateSystemOperationDto } from 'src/presentation/dtos/user/system-opearion.dto';
import { SystemOperationService } from 'src/application/services/admin/system-operation.service';
import { SystemOperationSpecification, SystemOperationsSpecification } from 'src/application/specifications/admin/system-operation-specifications';
import { SystemOperations } from 'src/domain/entities/SystemOperations';


import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadOptions } from 'src/interceptors/file-option';
import { generateSecurePassword } from 'src/application/services/helper/generate-password';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { MenuOperationService } from 'src/application/services/admin/menu-operation.service';
import { MenuOperationsSpecification } from 'src/application/specifications/admin/menu-operation-specifications';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';
import { NotificationListService } from 'src/application/services/notificatin/notification-list.service';
import { RoleNotificationListService } from 'src/application/services/notificatin/role-notification-list.service';
import { UserNotificationListService } from 'src/application/services/notificatin/user-notification-list.service';
import { NotificationListDto, RoleNotificationListDto, UserNotificationListDto, CreateNotificationListDto, UpdateNotificationListDto } from 'src/presentation/dtos/user/notification-list.dto';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';




@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly roleService: RoleService,
    private readonly systemOperationService: SystemOperationService,
    private readonly menuOperationService: MenuOperationService,
    private readonly notificationListService: NotificationListService,
    private readonly roleNotificationListService: RoleNotificationListService,
    private readonly userNotificationListService: UserNotificationListService,
    private readonly notificationsGateway: NotificationsGateway

  ) { }

  private async getCurrentUser(req): Promise<Users> {
    const currentUser = req.user;
    const userSpecification = new UsernameSpecification(currentUser.username);
    const checkUser = await this.userService.getWithSpecification(userSpecification, null, { id: true });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return checkUser[0];
  }

  private async getNotificationListsByIds(notificationListIds: number[]) {
    const uniqueIds = [...new Set(notificationListIds)];
    const notificationLists = await Promise.all(
      uniqueIds.map((id) => this.notificationListService.getById(id))
    );

    if (notificationLists.some((item) => !item)) {
      throw new HttpException("Some notification lists not found", HttpStatus.BAD_REQUEST);
    }

    return notificationLists;
  }

  //#region Notification Lists
  @Get("get-notification-lists")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Notification lists' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return notification lists.', type: [NotificationListDto] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getNotificationLists(): Promise<NotificationListDto[]> {
    const notificationLists = await this.notificationListService.getAllRecords();
    return GenericMapper.toDtoList(NotificationListDto, notificationLists, { excludeExtraneousValues: true });
  }

  @Post("create-notification-list")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Create new notification list' })
  @ApiResponse({ status: 201, description: 'Notification list created successfully.', type: NotificationListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNotificationList(@Body() dto: CreateNotificationListDto): Promise<NotificationListDto> {
    const notificationList = new NotificationLists();
    notificationList.name = dto.name;
    notificationList.nameTr = dto.nameTr;

    const createdList = await this.notificationListService.add(notificationList);
    return GenericMapper.toDto(NotificationListDto, createdList, { excludeExtraneousValues: true });
  }

  @Put("update-notification-list")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Update notification list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Notification list updated successfully.', type: NotificationListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateNotificationList(@Body() dto: UpdateNotificationListDto): Promise<NotificationListDto> {
    const notificationList = await this.notificationListService.getById(dto.id);
    if (!notificationList) {
      throw new HttpException("Notification list not found", HttpStatus.NOT_FOUND);
    }

    notificationList.name = dto.name ?? notificationList.name;
    notificationList.nameTr = dto.nameTr ?? notificationList.nameTr;

    const updatedList = await this.notificationListService.update(notificationList);
    return GenericMapper.toDto(NotificationListDto, updatedList, { excludeExtraneousValues: true });
  }

  @Delete("delete-notification-list/:id")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Delete notification list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Notification list deleted successfully.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteNotificationList(@Param('id') id: number): Promise<boolean> {
    const notificationList = await this.notificationListService.getById(id);
    if (!notificationList) {
      throw new HttpException("Notification list not found", HttpStatus.NOT_FOUND);
    }

    await this.notificationListService.delete(id);
    return true;
  }

  @Post("send-test-notification")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Send test socket notification to current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Test notification sent.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async sendTestNotification(@Body() body: { message?: string; type?: string }, @Request() req): Promise<boolean> {
    const currentUser = await this.getCurrentUser(req);
    const role = req.user?.role;
    const activeRole = Array.isArray(role) ? role[0] : role;
    const notificationType = body?.type || 'order';

    await this.notificationsGateway.notifyUsers(currentUser.id, 'new-notify', {
      id: String(Date.now()),
      type: notificationType,
      message: body?.message || 'Test notification',
      role: activeRole || '',
      createdAt: new Date(),
    });

    return true;
  }

  @Get("get-role-notification-lists/:roleId")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Get notification lists assigned to a role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return notification lists assigned to role.', type: [NotificationListDto] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRoleNotificationLists(@Param('roleId') roleId: number): Promise<NotificationListDto[]> {
    const role = await this.roleService.getById(roleId);
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }

    const roleNotificationLists = await this.roleNotificationListService.getAssigned(roleId, []);
    const notificationLists = roleNotificationLists.map((item) => item.notificationList);
    
    return GenericMapper.toDtoList(NotificationListDto, notificationLists, { excludeExtraneousValues: true });
  }

  @Post("set-role-notification-lists")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Assign notification lists to a role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned notification lists to role.' })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async setRoleNotificationLists(@Body() dto: RoleNotificationListDto, @Request() req): Promise<RoleNotificationLists[]> {
    const currentUser = await this.getCurrentUser(req);

    const role = await this.roleService.getById(dto.roleId);
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }

    const notificationListIds = dto.notificationListIds ?? [];

    // حذف تمام تخصیص های قدیمی
    await this.roleNotificationListService.unassign(dto.roleId, []);

    const notificationLists = await this.getNotificationListsByIds(notificationListIds);

    const items: RoleNotificationLists[] = [];
    for (const notificationList of notificationLists) {
      const item = new RoleNotificationLists();
      item.role = role;
      item.notificationList = notificationList;
      item.user = currentUser;
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      items.push(item);
    }

    return this.roleNotificationListService.addMany(items);
  }

  @Get("get-user-notification-lists/:userId")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Get notification lists assigned to a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return notification lists assigned to user.', type: [NotificationListDto] })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getUserNotificationLists(@Param('userId') userId: string): Promise<NotificationListDto[]> {
    const user = await this.userService.getByStringId(userId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const userNotificationLists = await this.userNotificationListService.getAssigned(userId, []);
    const notificationLists = userNotificationLists.map((item) => item.notificationList);
    
    return GenericMapper.toDtoList(NotificationListDto, notificationLists, { excludeExtraneousValues: true });
  }

  @Post("set-user-notification-lists")
  @ApiTags('Notification Lists')
  @ApiOperation({ summary: 'Assign notification lists to a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned notification lists to user.' })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async setUserNotificationLists(@Body() dto: UserNotificationListDto, @Request() req): Promise<UserNotificationLists[]> {
    const currentUser = await this.getCurrentUser(req);

    const user = await this.userService.getByStringId(dto.userId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const notificationListIds = dto.notificationListIds ?? [];

    // حذف تمام تخصیص های قدیمی
    await this.userNotificationListService.unassign(dto.userId, []);

    const notificationLists = await this.getNotificationListsByIds(notificationListIds);

    const items: UserNotificationLists[] = [];
    for (const notificationList of notificationLists) {
      const item = new UserNotificationLists();
      item.assignedUser = user;
      item.notificationList = notificationList;
      item.user = currentUser;
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      items.push(item);
    }

    return this.userNotificationListService.addMany(items);
  }
  //#endregion

  //#region Roles
  @Get("get-roles")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'Role list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return role list.', type: RoleListDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getRoles(): Promise<RoleListDto[]> {

    var roles = await this.roleService.getAllRecords();
    var result = GenericMapper.toDtoList(RoleListDto, roles, { excludeExtraneousValues: true });
    return result;
  }

  @Post("create-role")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'new role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return role .', type: RoleListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewRole(@Body() roleDto: CreateRoleDto, @Request() req): Promise<RoleListDto> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var specification = new RoleSpecification(roleDto.name);
    var checkRole = await this.roleService.getWithSpecification(specification);
    if (checkRole.length > 0) {
      throw new HttpException("The role already exist", HttpStatus.BAD_REQUEST);
    }
    var role = GenericMapper.toEntity(Roles, roleDto);
    role.createAt = new Date();
    role.recordStatus = recordStatus.Active;
    role.user = checkUser[0];

    var createRole = await this.roleService.add(role);
    var result = GenericMapper.toDto(RoleListDto, createRole, { excludeExtraneousValues: true });
    return result;
  }

  @Post("assign-role-operations")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'Assign system operations to a role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned operations to role.', type: Roles })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async assignRoleOperation(@Body() dto: CreateRoleMenuOperationsDto, @Request() req): Promise<Roles> {
    const user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    const checkUser = await this.userService.getWithSpecification(user_specification, null, { id: true });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    // بررسی وجود Role
    const role = await this.roleService.getById(dto.roleId);
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }

    // بررسی وجود MenuOperationها
    const operations = await this.menuOperationService.getWithSpecification(
      new MenuOperationsSpecification(dto.menueOperationIds)
    );
    
    if (!operations || operations.length !== dto.menueOperationIds.length) {
      throw new HttpException("Some system operations not found", HttpStatus.BAD_REQUEST);
    }

    // ساخت RoleMenuOperations برای هر operation
    const items: RoleMenuOperations[] = [];
    for (const op of operations) {
      const item = new RoleMenuOperations();
      item.role = role;
      item.menuOperation = op;
      item.user = checkUser[0];
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      items.push(item);
    }

    // ذخیره ارتباطات (فرض بر اینکه roleService متد مناسب دارد)
    //await this.roleService.assignOperationsToRole(dto.roleId,items);

    const roleWithOperations = await this.roleService.getRoleWithOperations(role.id);

    //const result = GenericMapper.toDto(RoleListDto, roleWithOperations, { excludeExtraneousValues: true });
   /*  result.systemOperations = (roleWithOperations.roleMenuOperations || [])
      .map(rso => rso.menuOperation); */
    return roleWithOperations;

  }

  @Get("get-role-with-operations/:id")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'get user by roles and operations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned operations to role.', type: Roles })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getRoleWithOperation(@Param('id') id: number): Promise<Roles> {

    // بررسی وجود Role
    const role = await this.roleService.getById(id);
    if (!role) {
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND);
    }
    const roleWithOperations = await this.roleService.getRoleWithOperations(role.id);
    return roleWithOperations;

  }
  @Put("update-role")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'update role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return role .', type: RoleListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateRole(@Body() roleDto: UpdateRoleDto): Promise<RoleListDto> {

    var specification = new RoleSpecification(roleDto.name);
    var checkRole = await this.roleService.getWithSpecification(specification);
    if (checkRole.length < 1) {
      throw new HttpException("The role is not found!", HttpStatus.NOT_FOUND);
    }
    checkRole[0].name = roleDto.newname ?? checkRole[0].name;
    checkRole[0].recordStatus = roleDto.recordStatus ?? checkRole[0].recordStatus;

    var updateRole = await this.roleService.update(checkRole[0]);
    var result = GenericMapper.toDto(RoleListDto, updateRole, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-role")
  @ApiTags('Roles')
  @ApiOperation({ summary: 'remove role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteRole(@Body() roleDto: DeleteRoleDto): Promise<boolean> {

    var specification = new RoleSpecification(roleDto.name);
    var checkRole = await this.roleService.getWithSpecification(specification);
    if (checkRole.length < 1) {
      throw new HttpException("The role is not found!", HttpStatus.NOT_FOUND);
    }

    var createRole = await this.roleService.delete(checkRole[0].id);
    return true;
  }
  //#endregion 

  //#region System Operations
  @Get("get-system-operations")
  @ApiTags('System Operations')
  @ApiOperation({ summary: 'System Operation list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return operation list.', type: SystemOperationListDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getOperations(): Promise<SystemOperationListDto[]> {

    var operations = await this.systemOperationService.getAllRecords();
    var result = GenericMapper.toDtoList(SystemOperationListDto, operations, { excludeExtraneousValues: true });
    return result;
  }

  @Post("create-system-operation")
  @ApiTags('System Operations')
  @ApiOperation({ summary: 'new system operation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return system operation .', type: SystemOperationListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewSystemOperation(@Body() systemOperationDto: CreateSystemOperationDto, @Request() req): Promise<SystemOperationListDto> {

    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var specification = new SystemOperationSpecification(systemOperationDto.name);
    var check = await this.systemOperationService.getWithSpecification(specification);
    if (check.length > 0) {
      throw new HttpException("The System Operations already exist", HttpStatus.BAD_REQUEST);
    }
    var item = GenericMapper.toEntity(SystemOperations, systemOperationDto);
    item.createAt = new Date();
    item.recordStatus = recordStatus.Active;
    item.user = checkUser[0];

    var createdItem = await this.systemOperationService.add(item);
    var result = GenericMapper.toDto(SystemOperationListDto, createdItem, { excludeExtraneousValues: true });
    return result;
  }
  @Put("update-system-operation")
  @ApiTags('System Operations')
  @ApiOperation({ summary: 'update system operation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return system operation .', type: SystemOperationListDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateSystemOperation(@Body() systemOperationDto: UpdateSystemOperationDto): Promise<SystemOperationListDto> {


    var checkOperation = await this.systemOperationService.getById(systemOperationDto.id);
    if (!checkOperation) {
      throw new HttpException("The system operation is not found!", HttpStatus.NOT_FOUND);
    }
    checkOperation.name = systemOperationDto.newname ?? checkOperation.name;
    checkOperation.recordStatus = systemOperationDto.recordStatus ?? checkOperation.recordStatus;
    var updateOperation = await this.systemOperationService.update(checkOperation);
    var result = GenericMapper.toDto(SystemOperationListDto, updateOperation, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-system-operation/:id")
  @ApiTags('System Operations')
  @ApiOperation({ summary: 'remove system operation' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteSystemOperation(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.systemOperationService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The system operation is not found!", HttpStatus.NOT_FOUND);
    }

    await this.systemOperationService.delete(checkOperation.id);
    return true;
  }
  //#endregion 


  //#region Users
  @Post("upload-user-profile-image/:userId")
  @ApiOperation({ summary: 'Upload a file (image) to a specified path' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully.',
    schema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', example: '/uploads/example.jpg' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', fileUploadOptions))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Users')
  async uploadNewProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
    @Request() req
  ): Promise<{ filePath: string }> {
    if (!file) {
      throw new BadRequestException('File is required!');
    }
    var checkUser = await this.userService.getByStringId(userId);
    if (!checkUser) {
      throw new HttpException("User is not found", HttpStatus.NOT_FOUND);
    }
    var filePath = file.filename;
    checkUser.imageSrc = file.filename;
    await this.userService.update(checkUser);
    return { filePath };
  }

  @Get("get-users")
  @ApiTags('Users')
  @ApiOperation({ summary: 'Users list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return user list.', type: UserDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getUsers(): Promise<UserDto[]> {
    var users = await this.userService.getAllUserWithRoleAndOperations();
    var result = GenericMapper.toDtoList(UserDto, users, { excludeExtraneousValues: true });
    // Optionally, map roles for each user if needed
    result.forEach((userDto, idx) => {
      userDto.roles = (users[idx].userRoles || []).map(rso => rso.role);
    });
    return result;
  }
  @Post("create-user")
  @ApiTags('Users')
  @SkipThrottle()
  @ApiOperation({ summary: 'register new client' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createUser(@Body() createUserDto: registerUserDto, @Request() req): Promise<UserDto> {
    var logged_user = req.user;
    const user_specification = new UsernameSpecification(logged_user.username);
    var checkLoggedUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    const specification = new UsernameSpecification(createUserDto.username);
    var checkUser = await this.userService.getWithSpecification(specification, null,
      { id: true, username: true });
    if (checkUser.length > 0) {
      if (checkUser[0].username == createUserDto.username) {
        throw new HttpException("The usename is already exists", HttpStatus.BAD_REQUEST);
      }
    }
    var user = GenericMapper.toEntity(Users, createUserDto);
    user.createAt = new Date();
    user.recordStatus = recordStatus.Active;
    user.password = await this.passwordService.hashPassword(createUserDto.password);
    user.userId = checkLoggedUser[0].id;

    const spec = new RoleNamesSpecification(createUserDto.roleNames);
    const roles = await this.roleService.getWithSpecification(spec, {
      select: ['id', 'name'],
    });
    if (roles.length !== createUserDto.roleNames.length) {
      throw new HttpException('Some roles not found', HttpStatus.BAD_REQUEST);
    }

    var createResult = await this.userService.createUserWithRole(user, roles);

    var response_result = GenericMapper.toDto(UserDto, createResult, { excludeExtraneousValues: true });

    return response_result;
  }

  @Post("assign-user-operations")
  @ApiTags('Users')
  @ApiOperation({ summary: 'Assign system operations to a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned operations to user.', type: Users })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async assignUserOperation(@Body() dto: CreateUserOperationsDto, @Request() req): Promise<Users> {
    const current_user = req.user;
    const user_specification = new UsernameSpecification(current_user.username);
    const checkUser = await this.userService.getWithSpecification(user_specification, null, { id: true });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }


    // بررسی وجود user
    const user = await this.userService.getByStringId(dto.UserId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

       const operations = await this.menuOperationService.getWithSpecification(
      new MenuOperationsSpecification(dto.menueOperationIds)

    );
    if (!operations || operations.length !== dto.menueOperationIds.length) {
      throw new HttpException("Some system operations not found", HttpStatus.BAD_REQUEST);
    }

    // ساخت RoleSystemOperations برای هر operation
    const items: UserMenuOperations[] = [];
    for (const op of operations) {
      const item = new UserMenuOperations();
      item.mainUser = user;
      item.menuOperation = op;
      item.user = checkUser[0];
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      items.push(item);
    }


    await this.userService.assignOperationsToUser(items,dto.UserId
      
    );

    const userWithOperations = await this.userService.getUserWithRoleAndOperations(user.id);

    //const result = GenericMapper.toDto(UserDto, userWithOperations, { excludeExtraneousValues: true });
/*     result.systemOperations = (userWithOperations.roleSystemOperations || [])
      .map(rso => rso.systemOperation); */
    return userWithOperations;

  }
  @Post("assign-user-roles")
  @ApiTags('Users')
  @ApiOperation({ summary: 'Assign roles to a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Assigned roles to user.', type: UserDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async assignUserRole(@Body() dto: CreateUserRolesDto, @Request() req): Promise<UserDto> {
    const current_user = req.user;
    const user_specification = new UsernameSpecification(current_user.username);
    const checkUser = await this.userService.getWithSpecification(user_specification, null, { id: true });
    if (!checkUser || checkUser.length === 0) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }



    const user = await this.userService.getByStringId(dto.UserId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }


    const roles = await this.roleService.getWithSpecification(
      new RoleIdsSpecification(dto.roleIds)
    );
    if (!roles || roles.length !== dto.roleIds.length) {
      throw new HttpException("Some roles not found", HttpStatus.BAD_REQUEST);
    }

    // ساخت RoleSystemOperations برای هر operation
    const items: UserRoles[] = [];
    for (const op of roles) {
      const item = new UserRoles();
      item.assigendUser = user;
      item.role = op;
      item.user = checkUser[0];
      item.createAt = new Date();
      item.recordStatus = recordStatus.Active;
      items.push(item);
    }


    await this.userService.assignRolesToUser(items);

    const userWithOperations = await this.userService.getUserWithRoleAndOperations(user.id);

    const result = GenericMapper.toDto(UserDto, userWithOperations, { excludeExtraneousValues: true });
/*     result.systemOperations = (userWithOperations.roleSystemOperations || [])
      .map(rso => rso.systemOperation); */
    return result;

  }
  @Post("change-user-password")
  @ApiTags('Users')
  @SkipThrottle()
  @ApiOperation({ summary: 'change user password' })
  @ApiResponse({ status: 201, description: 'The user\' password has been successfully changed.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async changeUserPassword(@Body() dto: changePasswordDto, @Request() req): Promise<UserDto> {

    const specification = new UsernameSpecification(dto.username);
    var checkUser = await this.userService.getWithSpecification(specification, null,
      { id: true, username: true, password: true });
    if (checkUser.length < 1) {

      throw new HttpException("The user is not found!", HttpStatus.NOT_FOUND);
    }

    var checkPass = await this.passwordService.comparePasswords(dto.currentPassword, checkUser[0].password);
    if (!checkPass) {
      throw new HttpException("The current password is incorrect!", HttpStatus.BAD_REQUEST);
    }
    var user = checkUser[0];

    user.password = await this.passwordService.hashPassword(dto.newPassword);

    var createResult = await this.userService.update(user);

    var response_result = GenericMapper.toDto(UserDto, createResult, { excludeExtraneousValues: true });

    return response_result;
  }

  @Post("reset-user-password")
  @ApiTags('Users')
  @SkipThrottle()
  @ApiOperation({ summary: 'reset user password' })
  @ApiResponse({ status: 201, description: 'The user\' password has been successfully reset.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async resetUserPassword(@Body() dto: resetPasswordDto, @Request() req): Promise<string> {

    const specification = new UsernameSpecification(dto.username);
    var checkUser = await this.userService.getWithSpecification(specification, null,
      { id: true, username: true, password: true });
    if (checkUser.length < 1) {

      throw new HttpException("The user is not found!", HttpStatus.NOT_FOUND);
    }


    var user = checkUser[0];

    // Generate a random password
    const randomPassword = generateSecurePassword();
    user.password = await this.passwordService.hashPassword(randomPassword);

    var createResult = await this.userService.update(user);

    var response_result = GenericMapper.toDto(UserDto, createResult, { excludeExtraneousValues: true });

    return randomPassword;
  }
  @Put("update-user")
  @ApiTags('Users')
  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return user .', type: UserDto })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateUser(@Body() dto: UserUpdateDto): Promise<UserDto> {


    var user = await this.userService.getByStringId(dto.id);
    if (!user) {
      throw new HttpException("The user is not found!", HttpStatus.NOT_FOUND);
    }
    user.username = dto.username;
    user.imageSrc = dto.imageSrc ?? user.imageSrc;
    user.recordStatus = dto.recordStatus ?? user.recordStatus;
    var updatedUser = await this.userService.update(user);
    var result = GenericMapper.toDto(UserDto, updatedUser, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-user/:userId")
  @ApiTags('Users')
  @ApiOperation({ summary: 'remove user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('userId') userId: string): Promise<boolean> {

    await this.userService.deleteUserWithRoles(userId);
    return true;
  }


  @Get("get-user-with-role-and-operations/:id")
  @ApiTags('Users')
  @ApiOperation({ summary: 'get user by roles and operations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'get user by roles and operations.', type: Users })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async getUserWithOperation(@Param('id') id: string): Promise<Users> {

    // بررسی وجود Role
    const user = await this.userService.getByStringId(id);
    if (!user) {
      throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
    const userWithOperations = await this.userService.getUserWithRoleAndOperations(user.id);
    //const result = GenericMapper.toDto(UserDto, userWithOperations, { excludeExtraneousValues: true });
 /*    result.systemOperations = (userWithOperations.userSystemOperations || [])
      .map(rso => rso.systemOperation);
    result.roles = (userWithOperations.userRoles || [])
      .map(rso => rso.role); */
    return userWithOperations;

  }
  //#endregion   

}


