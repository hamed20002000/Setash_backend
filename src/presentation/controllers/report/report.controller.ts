import { Controller, Get, Post, Body, Param, Query, UseGuards, HttpException, HttpStatus, Request, Put, BadRequestException, Req, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { UserService } from '../../../application/services/user/user.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericMapper } from '../../helpers/mapper-classes';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAndClientRolesGuard, AdminRolesGuard } from 'src/auth/guards/roles.guard';
import { FindOptionsRelations } from 'typeorm';
import { CommiteMembersService } from 'src/application/services/report/commiteMember.service';
import { CommiteMembers } from 'src/domain/entities/CommiteMembers';
import { CreateCommiteMemberDto, UpdateCommiteMemberDto } from 'src/presentation/dtos/report/commiteMembers-dto';
import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';
import { ConfirmationProjectReportService } from 'src/application/services/report/confirmationProjectReport.service';
import { ConfirmationProjectReportByIdSpecification } from 'src/application/specifications/report/confirmationProjectReport.specifications';
import { CreateConfirmationProjectReportDto, UpdateConfirmationProjectReportDto } from 'src/presentation/dtos/report/confirmationProjectReport-dto';
import { ConfirmationReportCommiteMember } from 'src/domain/entities/ConfirmationReportCommiteMember';
import { ConfirmationReportCommiteMemberService } from 'src/application/services/report/confirmationReportCommiteMember.service';
import { ConfirmationReportCommiteMemberByIdSpecification, ConfirmationReportCommiteMemberByReportIdSpecification } from 'src/application/specifications/report/ConfirmationReportCommiteMembe.specification';
import { CreateConfirmationReportCommiteMemberDto } from 'src/presentation/dtos/report/ccnfirmationReportCommiteMember-dto';
import { ConfirmationReportCommiteMemberAnswer } from 'src/domain/entities/ConfirmationReportCommiteMemberAnswer';
import { ConfirmationReportCommiteMemberAnswerService } from 'src/application/services/report/confirmationReportCommiteMemberAnswer.service';
import { ConfirmationReportCommiteMemberAnswerByIdSpecification, ConfirmationReportCommiteMemberAnswerByMemberIdSpecification, ConfirmationReportCommiteMemberAnswerByReportIdSpecification } from 'src/application/specifications/report/confirmation-report-commite-member-answer.specifications';
import { CreateConfirmationReportCommiteMemberAnswerDto } from 'src/presentation/dtos/report/confirmationReportCommiteMemberAnswer-dto';
import { DispatchBetonFilterDto, DispatchFilterDto, GetFilteredDataResponseDto } from 'src/presentation/dtos/report/betonReport-dto';
import { ReportService } from 'src/application/services/report/repots.service';
import { CarFuelFilterDto, CarFuelListResponseDto } from 'src/presentation/dtos/report/carFuel-dto';
import { PersonnelWorkplaceFilterDto, PersonnelWorkplaceListResponseDto } from 'src/presentation/dtos/report/personnel-workplace-filter.dto';
import { CourseReportFilterDto, CourseReportResponseDto } from 'src/presentation/dtos/report/course_filter';
import { TenderFlowFilterDto, TenderFlowForProjectListResponseDto, TenderFlowListResponseDto } from 'src/presentation/dtos/report/TenderFlow-dto';
import { DashboardStatsDto } from 'src/presentation/dtos/report/dashboard-stats.dto';
import { DashboardFinancialFilterDto, DashboardFinancialStatsDto } from 'src/presentation/dtos/report/dashboard-financial-stats.dto';
import { WorkhouseBetonQuantityResponseDto } from 'src/presentation/dtos/report/workhouse-beton-quantity-response.dto';
import { WorkhouseTotalSalaryResponseDto } from 'src/presentation/dtos/report/workhouse-total-salary-response.dto';
import { WorkhouseFuelStatsResponseDto } from 'src/presentation/dtos/report/workhouse-fuel-stats-response.dto';
import { WorkhouseDispatchPriceResponseDto } from 'src/presentation/dtos/report/workhouse-dispatch-price-response.dto';
import { ProjectUsedItemReportDto } from 'src/presentation/dtos/report/project-used-item.dto';
import { RollcallsService } from 'src/application/services/hr/rollcals.service';





@Controller('api/report')
export class ReportController {
  constructor(private readonly userService: UserService,
    private readonly commiteMembersService: CommiteMembersService,
    private readonly confirmationProjectReportService: ConfirmationProjectReportService,
    private readonly confirmationReportCommiteMemberService: ConfirmationReportCommiteMemberService,
    private readonly confirmationReportCommiteMemberAnswerService: ConfirmationReportCommiteMemberAnswerService,
    private readonly reportService: ReportService,
    private readonly rollcalsService: RollcallsService

  ) { }

  private toBoolean(value: any): boolean | undefined {
    if (value === undefined || value === null) return undefined;

    const v = String(value).toLowerCase();

    if (v === "true" || v === "1") return true;
    if (v === "false" || v === "0") return false;

    return undefined;
  }

  //#region Commitee Member
  @Get("get-all-commitee-members")
  @ApiTags('Commitee Members')
  @ApiOperation({ summary: 'Commitee Members' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllCommiteMembers(): Promise<CommiteMembers[]> {
    return this.commiteMembersService.getAllRecords();
  }

  @Get("get-commitee-member-by-id/:id")
  @ApiTags('Commitee Members')
  @ApiOperation({ summary: 'Commitee Member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return commitee member.', type: CommiteMembers })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCommiteeMemberById(@Param('id') id: number): Promise<CommiteMembers> {

    var operations = await this.commiteMembersService.getById(id);
    if (!operations) {
      throw new HttpException("The Commitee Member is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }

  @Post("create-commitee-member")
  @ApiTags('Commitee Members')
  @ApiOperation({ summary: 'new commitee member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return commitee member .', type: CommiteMembers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewCommiteeMember(@Body() dto: CreateCommiteMemberDto, @Request() req): Promise<CommiteMembers> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var commiteeMember = GenericMapper.toEntity(CommiteMembers, dto);
    commiteeMember.createAt = new Date();
    commiteeMember.recordStatus = recordStatus.Active;
    commiteeMember.user = checkUser[0];

    var result = await this.commiteMembersService.add(commiteeMember);

    return result;
  }

  @Put("update-commitee-member")
  @ApiTags('Commitee Members')
  @ApiOperation({ summary: 'update commitee member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return commitee member .', type: CommiteMembers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCommiteeMember(@Body() dto: UpdateCommiteMemberDto): Promise<CommiteMembers> {


    var item = await this.commiteMembersService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Commitee Member is not found!", HttpStatus.NOT_FOUND);
    }
    item.name = dto.name ?? item.name;
    item.family = dto.family ?? item.family;
    item.position = dto.position ?? item.position;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    var updateitem = await this.commiteMembersService.update(item);
    var result = GenericMapper.toDto(CommiteMembers, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-commitee-member/:id")
  @ApiTags('Commitee Members')
  @ApiOperation({ summary: 'remove commitee member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCommiteeMember(@Param('id') id: number): Promise<boolean> {

    var checkOperation = await this.commiteMembersService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Commitee Member is not found!", HttpStatus.NOT_FOUND);
    }

    await this.commiteMembersService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

  //#region ConfirmationProjectReport

  @Get("get-latest-project-reports")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'ConfirmationProjectReport' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getLatestProjectReports(): Promise<any[]> {
    return this.confirmationProjectReportService.getProjectsReport();
  }
  @Get("get-all-confirmation-project-reports")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'ConfirmationProjectReport' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllConfirmationProjectReports(): Promise<ConfirmationProjectReport[]> {
    var relations: FindOptionsRelations<ConfirmationProjectReport> = {
      confirmationReportCommiteMembers: { confirmationReportCommiteMemberAnswers: true },

    };
    var reports = await this.confirmationProjectReportService.getWithSpecification(null, null, null, relations);
    var imzalandi = await this.confirmationProjectReportService.getProjectsMemberConfirmCountReport();
    reports.forEach(report => {
      var imzalandiRecord = imzalandi.find(i => i.Id === report.id);
      report['imzalandiCount'] = imzalandiRecord ? parseInt(imzalandiRecord.totalcount) : 0;
    });
    return reports;
  }



  @Get("get-confirmation-project-report-by-id/:id")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'ConfirmationProjectReport' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation project report.', type: ConfirmationProjectReport })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationProjectReportById(@Param('id') id: number): Promise<ConfirmationProjectReport> {

    var specification = new ConfirmationProjectReportByIdSpecification(id);
    var relations: FindOptionsRelations<ConfirmationProjectReport> = {
      confirmationReportCommiteMembers: { confirmationReportCommiteMemberAnswers: true },

    };
    var operations = await this.confirmationProjectReportService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Confirmation Project Report is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-confirmation-project-report")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'new confirmation project report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation project report .', type: ConfirmationProjectReport })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewConfirmationProjectReport(@Body() dto: CreateConfirmationProjectReportDto, @Request() req): Promise<ConfirmationProjectReport> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var confirmationProjectReport = GenericMapper.toEntity(ConfirmationProjectReport, dto);

    confirmationProjectReport.createAt = new Date();
    confirmationProjectReport.recordStatus = recordStatus.Active;
    confirmationProjectReport.user = checkUser[0];
    var result = await this.confirmationProjectReportService.add(confirmationProjectReport);

    return result;
  }

  @Put("update-confirmation-project-report")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'update confirmation project report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation project report .', type: ConfirmationProjectReport })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateConfirmationProjectReport(@Body() dto: UpdateConfirmationProjectReportDto): Promise<ConfirmationProjectReport> {


    var item = await this.confirmationProjectReportService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Confirmation Project Report is not found!", HttpStatus.NOT_FOUND);
    }
    item.year = dto.year ?? item.year;
    item.city = dto.city ?? item.city;
    item.town = dto.town ?? item.town;
    item.region = dto.region ?? item.region;
    item.tesisType = dto.tesisType ?? item.tesisType;
    item.trAdi = dto.trAdi ?? item.trAdi;
    item.projectCount = dto.projectCount ?? item.projectCount;
    item.Gecici_tutanak_teslim_alma_durumu = dto.Gecici_tutanak_teslim_alma_durumu ?? item.Gecici_tutanak_teslim_alma_durumu;
    item.Kesin_tutanak_teslim_alma_durumu = dto.Kesin_tutanak_teslim_alma_durumu ?? item.Kesin_tutanak_teslim_alma_durumu;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    var updateitem = await this.confirmationProjectReportService.update(item);
    var result = GenericMapper.toDto(ConfirmationProjectReport, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-confirmation-project-report/:id")
  @ApiTags('ConfirmationProjectReports')
  @ApiOperation({ summary: 'remove confirmation project report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteConfirmationProjectReport(@Param('id') id: number): Promise<boolean> {

    var checkOperation = await this.confirmationProjectReportService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Confirmation Project Report is not found!", HttpStatus.NOT_FOUND);
    }

    await this.confirmationProjectReportService.delete(id);
    return true;
  }

  //#endregion ConfirmationProjectReport

  //#region Confirmation Report Commite Member
  @Get("get-confirmation-report-commite-member/:reportId")
  @ApiTags('Confirmation Report Commite Member')
  @ApiOperation({ summary: 'Confirmation Report Commite Member' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationReportCommiteMember(@Param('reportId') reportId: number): Promise<ConfirmationReportCommiteMember[]> {
    var specification = new ConfirmationReportCommiteMemberByReportIdSpecification(reportId);
    var relations: FindOptionsRelations<ConfirmationReportCommiteMember> = {
      confirmationProjectReport: true,
      commiteMember: true,
    };
    return this.confirmationReportCommiteMemberService.getWithSpecification(specification, null, null, relations);
  }

  @Get("get-confirmation-report-commite-member-by-id/:id")
  @ApiTags('Confirmation Report Commite Member')
  @ApiOperation({ summary: 'Confirmation Report Commite Member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation report commite member.', type: ConfirmationReportCommiteMember })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationReportCommiteMemberById(@Param('id') id: number): Promise<ConfirmationReportCommiteMember> {

    var specification = new ConfirmationReportCommiteMemberByIdSpecification(id);
    var relations: FindOptionsRelations<ConfirmationReportCommiteMember> = {
      confirmationProjectReport: true,
      commiteMember: true,
    };
    var operations = await this.confirmationReportCommiteMemberService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Confirmation Report Commite Member is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-confirmation-report-commite-member")
  @ApiTags('Confirmation Report Commite Member')
  @ApiOperation({ summary: 'new confirmation report commite member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation report commite member .', type: ConfirmationReportCommiteMember })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewConfirmationReportCommiteMember(@Body() dto: CreateConfirmationReportCommiteMemberDto, @Request() req): Promise<ConfirmationReportCommiteMember> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var confirmationReportCommiteMember = GenericMapper.toEntity(ConfirmationReportCommiteMember, dto);
    confirmationReportCommiteMember.commiteMember = { id: dto.commiteMembersId } as CommiteMembers;
    confirmationReportCommiteMember.confirmationProjectReport = { id: dto.confirmationProjectReportId } as ConfirmationProjectReport;
    confirmationReportCommiteMember.createAt = new Date();
    confirmationReportCommiteMember.recordStatus = recordStatus.Active;
    confirmationReportCommiteMember.user = checkUser[0];
    var result = await this.confirmationReportCommiteMemberService.add(confirmationReportCommiteMember);
    return result;
  }

  @Delete("delete-confirmation-report-commite-member/:id")
  @ApiTags('Confirmation Report Commite Member')
  @ApiOperation({ summary: 'remove confirmation report commite member' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteConfirmationReportCommiteMember(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.confirmationReportCommiteMemberService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Confirmation Report Commite Member is not found!", HttpStatus.NOT_FOUND);
    }

    await this.confirmationReportCommiteMemberService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region confirmation Report Commite Member Answer
  @Get("get-confirmation_report-commite-member-answer-dto-by-member-id/:memberId")
  @ApiTags('Confirmation Report Commite Member Answer')
  @ApiOperation({ summary: 'Confirmation Report Commite Member Answer' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationReportCommiteMemberAnswersByMemberId(@Param('memberId') memberId: number): Promise<ConfirmationReportCommiteMemberAnswer[]> {
    var specification = new ConfirmationReportCommiteMemberAnswerByMemberIdSpecification(memberId);
    var relations: FindOptionsRelations<ConfirmationReportCommiteMemberAnswer> = {
      confirmationReportCommiteMember: true,


    };
    return this.confirmationReportCommiteMemberAnswerService.getWithSpecification(specification, null, null, relations);
  }

  @Get("get-confirmation-report-commite-member-answer-by-id/:id")
  @ApiTags('Confirmation Report Commite Member Answer')
  @ApiOperation({ summary: 'Confirmation Report Commite Member Answer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation report commite member answer.', type: ConfirmationReportCommiteMemberAnswer })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationReportCommiteMemberAnswerById(@Param('id') id: number): Promise<ConfirmationReportCommiteMemberAnswer> {

    var specification = new ConfirmationReportCommiteMemberAnswerByIdSpecification(id);
    var relations: FindOptionsRelations<ConfirmationReportCommiteMemberAnswer> = {
      confirmationReportCommiteMember: true,


    };
    var operations = await this.confirmationReportCommiteMemberAnswerService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Confirmation Report Commite Member Answer  is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }
  @Get("get-confirmation-report-commite-member-answer-by-report-id/:reportId")
  @ApiTags('Confirmation Report Commite Member Answer')
  @ApiOperation({ summary: 'Confirmation Report Commite Member Answer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation report commite member answer.', type: ConfirmationReportCommiteMemberAnswer })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getConfirmationReportCommiteMemberAnswerByReportId(@Param('reportId') reportId: number): Promise<ConfirmationReportCommiteMemberAnswer[]> {

    var specification = new ConfirmationReportCommiteMemberAnswerByReportIdSpecification(reportId);
    var relations: FindOptionsRelations<ConfirmationReportCommiteMemberAnswer> = {
      confirmationReportCommiteMember: { commiteMember: true },
    };
    var operations = await this.confirmationReportCommiteMemberAnswerService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Confirmation Report Commite Member Answer  is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }
  @Post("create-confirmation-report-commite-member-answer")
  @ApiTags('Confirmation Report Commite Member Answer')
  @ApiOperation({ summary: 'new confirmation report commite member answer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return confirmation report commite member answer .', type: ConfirmationReportCommiteMemberAnswer })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewConfirmationReportCommiteMemberAnswer(@Body() dto: CreateConfirmationReportCommiteMemberAnswerDto, @Request() req): Promise<ConfirmationReportCommiteMemberAnswer> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var confirmationReportCommiteMemberAnswer = GenericMapper.toEntity(ConfirmationReportCommiteMemberAnswer, dto);
    confirmationReportCommiteMemberAnswer.createAt = new Date();
    confirmationReportCommiteMemberAnswer.recordStatus = recordStatus.Active;
    confirmationReportCommiteMemberAnswer.confirmationReportCommiteMember = { id: dto.ConfirmationReportCommiteMemberId } as ConfirmationReportCommiteMember;

    confirmationReportCommiteMemberAnswer.user = checkUser[0];
    var result = await this.confirmationReportCommiteMemberAnswerService.add(confirmationReportCommiteMemberAnswer);
    return result;
  }


  @Delete("delete-confirmation-report-commite-member-answer/:id")
  @ApiTags('Confirmation Report Commite Member Answer')
  @ApiOperation({ summary: 'remove confirmation report commite member answer' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteConfirmationReportCommiteMemberAnswer(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.confirmationReportCommiteMemberAnswerService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Confirmation Report Commite Member Answer is not found!", HttpStatus.NOT_FOUND);
    }

    await this.confirmationReportCommiteMemberAnswerService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region Beton Report
  @Get('get-beton-filtered-report-data')
  @ApiOperation({ summary: 'Get concrete dispatch list with various filters' })
  @ApiOkResponse({
    description: 'Concrete dispatch list with price, quantity and other details',
    type: GetFilteredDataResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getBetonFilteredData(
    @Query() filters: DispatchBetonFilterDto,
  ): Promise<GetFilteredDataResponseDto> {

    return this.reportService.getBetonFilteredData(filters);
  }
  //#endregion Beton Report

  //#region Other items Report
  @Get('get-other-items-filtered-report-data')
  @ApiOperation({ summary: 'Get other items dispatch list with various filters' })
  @ApiOkResponse({
    description: 'Other items dispatch list with price, quantity and other details',
    type: GetFilteredDataResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getOtherItemsFilteredData(
    @Query() filters: DispatchFilterDto,
  ): Promise<GetFilteredDataResponseDto> {
    return this.reportService.getOtherItemFilteredData(filters);
  }
  //#endregion Beton Report

  //#region car fuel Report
  @Get('get-car-fuel-report-data')
  @ApiOperation({ summary: 'Get car fuel report with various filters' })
  @ApiOkResponse({
    description: 'Car fuel report with price, quantity and other details',
    type: CarFuelFilterDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCarFuelFilteredData(
    @Query() filters: CarFuelFilterDto,
  ): Promise<CarFuelListResponseDto> {
    return this.reportService.getFilteredCarFuels(filters);
  }
  //#endregion car fuel Report



  //#region workhouse personnel Report
  @Get('get-workhouse-personnel-report-data')
  @ApiOperation({ summary: 'Get workhouse personnel report with various filters' })
  @ApiOkResponse({
    description: 'Workhouse personnel report with price, quantity and other details',
    type: PersonnelWorkplaceListResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWorkhousePersonnelFilteredData(
    @Query() filters: PersonnelWorkplaceFilterDto,
  ): Promise<PersonnelWorkplaceListResponseDto> {
    return this.reportService.getPersonnelWorkplaces(filters);
  }
  //#endregion car fuel Report


  //#region course personnel Report
  @Get('get-course-personnel-report-data')
  @ApiOperation({ summary: 'Get course personnel report with various filters' })
  @ApiOkResponse({
    description: 'Course personnel report with price, quantity and other details',
    type: PersonnelWorkplaceListResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCoursePersonnelFilteredData(
    @Query() filters: CourseReportFilterDto,
  ): Promise<CourseReportResponseDto> {
    filters.center = this.toBoolean(filters.center);
    return this.reportService.getCourseReport(filters);
  }
  //#endregion car fuel Report


  //#region Tender Flow Report
  @Get('get-tender-flow-report-data')
  @ApiOperation({ summary: 'Get tender flow report with various filters' })
  @ApiOkResponse({
    description: 'Tender flow report with price, quantity and other details',
    type: TenderFlowListResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getTenderFlowFilteredData(
    @Query() filters: TenderFlowFilterDto,
  ): Promise<TenderFlowListResponseDto> {
    return this.reportService.getTenderFlow(filters);
  }

  @Get('get-tender-flow-report-for-project-data')
  @ApiOperation({ summary: 'Get tender flow report with various filters' })
  @ApiOkResponse({
    description: 'Tender flow report with price, quantity and other details',
    type: TenderFlowListResponseDto,
  })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getTenderFlowForProjectFilteredData(
    @Query() filters: TenderFlowFilterDto,
  ): Promise<TenderFlowForProjectListResponseDto> {
    return this.reportService.getTenderFlowForProject(filters);
  }
  //#endregion car fuel Report


  //#region Dashboard Stats
  @Get('get-dashboard-stats')
  @ApiOperation({ summary: 'Get aggregated dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats', type: DashboardStatsDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getStats(): Promise<DashboardStatsDto> {
    return await this.reportService.getDashboardStats();
  }

  @Get('get-dashboard-financial-stats')
  @ApiOperation({ summary: 'Get dashboard financial statistics with filters' })
  @ApiResponse({ status: 200, description: 'Dashboard financial stats', type: DashboardFinancialStatsDto })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getFinancialStats(
    @Query() filters: DashboardFinancialFilterDto,
  ): Promise<DashboardFinancialStatsDto> {
    return await this.reportService.getDashboardFinancialStats(filters);
  }

  @Get('get-dashboard-workhouse-beton-quantity')
  @ApiOperation({ summary: 'Get quantity for itemId = 1 grouped by workhouse' })
  @ApiOkResponse({ type: WorkhouseBetonQuantityResponseDto, isArray: true })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWorkhouseBetonQuantity(): Promise<WorkhouseBetonQuantityResponseDto[]> {
    return this.reportService.getWorkhouseBetonQuantity();
  }

  @Get('get-dashboard-workhouse-total-salary')
  @ApiOperation({ summary: 'Get total salary grouped by workhouse' })
  @ApiOkResponse({ type: WorkhouseTotalSalaryResponseDto, isArray: true })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWorkhouseTotalSalary() {
    return this.reportService.getWorkhouseTotalSalary();
  }

  @Get('get-dashboard-workhouse-fuel-stats')
  @ApiOperation({ summary: 'Fuel usage & cost grouped by workhouse & fuel type' })

  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getFuelStats() {
    return this.reportService.getWorkhouseFuelStats();
  }

  @Get('get-dashboard-other-fuel-stats')
  @ApiOperation({ summary: 'Fuel usage & cost grouped by workhouse & fuel type' })

  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getOtherFuelStats() {
    return this.reportService.getOtherFuelStats();
  }

  @Get('get-dashboard-workhouse-dispatch-price')
  @ApiOperation({ summary: 'Get total dispatch price grouped by workhouse' })
  @ApiOkResponse({ type: WorkhouseDispatchPriceResponseDto, isArray: true })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getWorkhouseDispatchPrice() {
    return this.reportService.getWorkhouseDispatchPrice();
  }

  //#endregion Dashboard Stats

  //#region Project Report
  @Get('get-project-used-item-report')
  @ApiOperation({ summary: 'Get report of items used in projects' })
  @ApiOkResponse({ type: ProjectUsedItemReportDto, isArray: true })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getProjectUsedItemReport(): Promise<ProjectUsedItemReportDto[]> {
    return this.reportService.getProjectUsedItemReport();
  }
  //#endregion Project Report


  //#region rollcals Report
  @Get('rollcalls')
  @ApiTags('Rollcalls Report')
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  getRollcalls(
    @Query('workhouseId') workhouseId: number,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.rollcalsService.getRollcalls(
      workhouseId,
      fromDate,
      toDate,
    );
  }
  //#endregion rollcals Report
}
