import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus, Request, Put, Delete } from '@nestjs/common';
import { UserService } from '../../../application/services/user/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericMapper } from '../../helpers/mapper-classes';
import { UsernameSpecification } from 'src/application/specifications/user/user-specifications';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAndClientRolesGuard, AdminRolesGuard } from 'src/auth/guards/roles.guard';
import { FindOptionsRelations, In } from 'typeorm';
import { PersonnelsService } from 'src/application/services/hr/personnels.service';
import { Personnels } from 'src/domain/entities/Personnels';
import { TeacherService } from 'src/application/services/education/teacher.service';
import { Teachers } from 'src/domain/entities/Teachers';
import { CreateTeacherDto, UpdateTeacherDto } from 'src/presentation/dtos/education/teacher-dto';
import { Courses } from 'src/domain/entities/Courses';
import { CourseService } from 'src/application/services/education/course.service';
import { CourseByIdSpecification } from 'src/application/specifications/education/course-specifications';
import { CreateCourseDto, UpdateCourseDto, UpdateCourseEndDateDto } from 'src/presentation/dtos/education/course-dto';
import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { CourseDateTimeService } from 'src/application/services/education/courseDateTime.service';
import { CourseDateTimeByCourseIdSpecification, CourseDateTimeByIdSpecification } from 'src/application/specifications/education/course-datetime-specifications';
import { CreateCourseDateTimeDto, UpdateCourseDateTimeDto } from 'src/presentation/dtos/education/courseDateTime-dto';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { CourseParticipantService } from 'src/application/services/education/courseParticipant.service';
import { CourseParticipantByCourseIdSpecification, CourseParticipantByIdSpecification } from 'src/application/specifications/education/course-participaint-specifications';
import { CreateCourseParticipantDto, UpdateCourseCourseParticipantDto } from 'src/presentation/dtos/education/course-participants-dto';
import { Workhouses } from 'src/domain/entities/Workhouses';




@Controller('api/education')
export class EducationController {
  constructor(private readonly userService: UserService,
    private readonly teacherService: TeacherService,
    private readonly courseService: CourseService,
    private readonly courseDateTimeService: CourseDateTimeService,
    private readonly courseParticipantService: CourseParticipantService,
    private readonly personnelService: PersonnelsService,


  ) { }



  //#region teacher
  @Get("get-all-teachers")
  @ApiTags('Teachers')
  @ApiOperation({ summary: 'Teacher' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllTeachers(): Promise<Teachers[]> {
    return this.teacherService.getAllRecords();
  }

  @Get("get-teacher-by-id/:id")
  @ApiTags('Teachers')
  @ApiOperation({ summary: 'Teacher' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return teacher.', type: Teachers })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getTeacherById(@Param('id') id: number): Promise<Teachers> {

    var operations = await this.teacherService.getById(id);
    if (!operations) {
      throw new HttpException("The Teacher is not found!", HttpStatus.NOT_FOUND);
    }
    return operations;
  }

  @Post("create-teacher")
  @ApiTags('Teachers')
  @ApiOperation({ summary: 'new teacher' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return teacher .', type: Teachers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewTeacher(@Body() dto: CreateTeacherDto, @Request() req): Promise<Teachers> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var teacher = GenericMapper.toEntity(Teachers, dto);
    teacher.createAt = new Date();
    teacher.recordStatus = recordStatus.Active;
    teacher.user = checkUser[0];

    var result = await this.teacherService.add(teacher);

    return result;
  }

  @Put("update-teacher")
  @ApiTags('Teachers')
  @ApiOperation({ summary: 'update teacher' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return teacher .', type: Teachers })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateTeacher(@Body() dto: UpdateTeacherDto): Promise<Teachers> {


    var item = await this.teacherService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Teacher is not found!", HttpStatus.NOT_FOUND);
    }
    item.name = dto.name ?? item.name;
    item.surname = dto.surname ?? item.surname;
    item.field = dto.field ?? item.field;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    var updateitem = await this.teacherService.update(item);
    var result = GenericMapper.toDto(Teachers, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-teacher/:id")
  @ApiTags('Teachers')
  @ApiOperation({ summary: 'remove teacher' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteTeacher(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.teacherService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Teacher is not found!", HttpStatus.NOT_FOUND);
    }

    await this.teacherService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

  //#region Course
  @Get("get-all-courses")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'Course' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getAllCourses(): Promise<Courses[]> {
    var relations: FindOptionsRelations<Courses> = {
      teacher: true,
      user: true,
      workhouse: true
    };
    return this.courseService.getWithSpecification(null, null, null, relations);
  }

  @Get("get-course-by-id/:id")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'Course' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course.', type: Courses })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCourseById(@Param('id') id: number): Promise<Courses> {

    var specification = new CourseByIdSpecification(id);
    var relations: FindOptionsRelations<Courses> = {
      teacher: true,
      user: true,
      workhouse: true
    };
    var operations = await this.courseService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Course is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-course")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'new course' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course .', type: Courses })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewCourse(@Body() dto: CreateCourseDto, @Request() req): Promise<Courses> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var course = GenericMapper.toEntity(Courses, dto);
    if (dto.workhouseId) {
      course.workhouse = { id: dto.workhouseId } as Workhouses;
    }
    course.teacher = { id: dto.teacherId } as Teachers;
    course.createAt = new Date();
    course.recordStatus = recordStatus.Active;
    course.user = checkUser[0];

    var result = await this.courseService.add(course);

    return result;
  }

  @Put("update-course")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'update course' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course .', type: Courses })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCourse(@Body() dto: UpdateCourseDto): Promise<Courses> {


    var item = await this.courseService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Course is not found!", HttpStatus.NOT_FOUND);
    }
    item.title = dto.title ?? item.title;
    item.ISG = dto.ISG ?? item.ISG;
    item.hours = dto.hours ?? item.hours;
    item.description = dto.description ?? item.description;
    item.startDateTime = dto.startDateTime ?? item.startDateTime;
    item.endDateTime = dto.endDateTime ?? item.endDateTime;
    if (dto.workhouseId)
      item.workhouse = { id: dto.workhouseId ?? item.workhouse.id } as Workhouses;
    if (dto.teacherId)
      item.teacher = { id: dto.teacherId ?? item.teacher.id } as Teachers;
    if (dto.attachments)
      item.attachments = dto.attachments ? dto.attachments.map(att => ({ fileUrl: att.fileUrl })) : null;
    item.recordStatus = dto.recordStatus ?? item.recordStatus;

    var updateitem = await this.courseService.update(item);
    var result = GenericMapper.toDto(Courses, updateitem, { excludeExtraneousValues: true });
    return result;
  }


  @Put("set-course-isend")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'update course' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course .', type: Courses })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCourseEndDate(@Body() dto: UpdateCourseEndDateDto): Promise<Courses> {


    var item = await this.courseService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Course is not found!", HttpStatus.NOT_FOUND);
    }

    item.endDateTime = dto.endDateTime ?? item.endDateTime;
    if (item.ISG) {

      var geetCourseParticipants = await this.courseParticipantService.getQualifiedParticipants(item.id);
      if (geetCourseParticipants && geetCourseParticipants.length > 0) {
        for (const personnel of geetCourseParticipants)
          personnel.hasISG = true;

        await this.personnelService.updateMany(geetCourseParticipants);

      }
    }


    var updateitem = await this.courseService.update(item);
    var result = GenericMapper.toDto(Courses, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-course/:id")
  @ApiTags('Courses')
  @ApiOperation({ summary: 'remove course' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCourse(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.courseService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Course is not found!", HttpStatus.NOT_FOUND);
    }

    await this.courseService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

  //#region Course DateTime
  @Get("get-course-datetimes-by-course-id/:courseId")
  @ApiTags('Course DateTimes')
  @ApiOperation({ summary: 'Course DateTimes' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCourseDateTimesByCourseId(@Param('courseId') courseId: number): Promise<CourseDateTimes[]> {
    var relations: FindOptionsRelations<CourseDateTimes> = {
      course: { workhouse: true, teacher: true },
    };
    var spec = new CourseDateTimeByCourseIdSpecification(courseId);
    return this.courseDateTimeService.getWithSpecification(spec, null, null, relations);
  }

  @Get("get-course-datetime-by-id/:id")
  @ApiTags('Course DateTimes')
  @ApiOperation({ summary: 'Course DateTime' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course datetime.', type: CourseDateTimes })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCourseDateTimeById(@Param('id') id: number): Promise<CourseDateTimes> {

    var specification = new CourseDateTimeByIdSpecification(id);
    var relations: FindOptionsRelations<CourseDateTimes> = {
      course: { workhouse: true, teacher: true },
    };
    var operations = await this.courseDateTimeService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Course DateTime is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-course-datetime")
  @ApiTags('Course DateTimes')
  @ApiOperation({ summary: 'new course datetime' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course datetime .', type: CourseDateTimes })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewCourseDateTime(@Body() dto: CreateCourseDateTimeDto, @Request() req): Promise<CourseDateTimes> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var courseDateTime = GenericMapper.toEntity(CourseDateTimes, dto);
    courseDateTime.course = { id: dto.courseId } as Courses;
    courseDateTime.createAt = new Date();
    courseDateTime.recordStatus = recordStatus.Active;
    courseDateTime.user = checkUser[0];
    var result = await this.courseDateTimeService.add(courseDateTime);
    return result;
  }

  @Put("update-course-datetime")
  @ApiTags('Course DateTimes')
  @ApiOperation({ summary: 'update course datetime' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course datetime .', type: CourseDateTimes })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCourseDateTime(@Body() dto: UpdateCourseDateTimeDto): Promise<CourseDateTimes> {

    var item = await this.courseDateTimeService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Course DateTime is not found!", HttpStatus.NOT_FOUND);
    }
    item.startDateTime = dto.startDateTime ?? item.startDateTime;
    item.endDateTime = dto.endDateTime ?? item.endDateTime;
    if (dto.courseId)
      item.course = { id: dto.courseId ?? item.course.id } as Courses;

    item.recordStatus = dto.recordStatus ?? item.recordStatus;
    var updateitem = await this.courseDateTimeService.update(item);
    var result = GenericMapper.toDto(CourseDateTimes, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-course-datetime/:id")
  @ApiTags('Course DateTimes')
  @ApiOperation({ summary: 'remove course datetime' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCourseDateTime(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.courseDateTimeService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Course DateTime is not found!", HttpStatus.NOT_FOUND);
    }

    await this.courseDateTimeService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction


  //#region Course Participant
  @Get("get-course-participants-by-course-id/:courseId")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'Course Participants' })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCourseParticipantsByCourseId(@Param('courseId') courseId: number): Promise<CourseParticipants[]> {
    var relations: FindOptionsRelations<CourseParticipants> = {
      personnel: true,
      courseDateTime: { course: true },
    };
    var specification = new CourseParticipantByCourseIdSpecification(courseId);
    return this.courseParticipantService.getWithSpecification(specification, null, null, relations);
  }

  @Get("get-course-participant-by-id/:id")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'Course Participant' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course participant.', type: CourseParticipants })
  @UseGuards(JwtAuthGuard, AdminAndClientRolesGuard)
  @ApiBearerAuth()
  async getCourseParticipantById(@Param('id') id: number): Promise<CourseParticipants> {

    var specification = new CourseParticipantByIdSpecification(id);
    var relations: FindOptionsRelations<CourseParticipants> = {
      personnel: true,
      courseDateTime: { course: true },

    };
    var operations = await this.courseParticipantService.getWithSpecification(specification, null, null, relations);
    if (!operations || operations.length == 0) {
      throw new HttpException("The Course Participant is not found!", HttpStatus.NOT_FOUND);
    }
    return operations[0];
  }

  @Post("create-course-participant")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'new course participant' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course participant .', type: CourseParticipants })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async createNewCourseParticipant(@Body() dto: CreateCourseParticipantDto, @Request() req): Promise<CourseParticipants> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });


    var courseParticipant = GenericMapper.toEntity(CourseParticipants, dto);
    courseParticipant.createAt = new Date();
    courseParticipant.recordStatus = recordStatus.Active;
    courseParticipant.personnel = { id: dto.personnelId } as Personnels;
    courseParticipant.courseDateTime = { id: dto.courseDateTimeId } as CourseDateTimes;
    courseParticipant.user = checkUser[0];
    var result = await this.courseParticipantService.add(courseParticipant);
    return result;
  }


  @Post("create-course-participants")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'new course participants' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course participant .', type: [CourseParticipants] })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  @ApiBody({ type: [CreateCourseParticipantDto] })
  async createNewCourseParticipants(@Body() dto: CreateCourseParticipantDto[], @Request() req): Promise<CourseParticipants[]> {
    var user = req.user;
    const user_specification = new UsernameSpecification(user.username);
    var checkUser = await this.userService.getWithSpecification(user_specification, null,
      {
        id: true

      });
    var arr: CourseParticipants[] = [];
    dto.forEach(async dto => {

      var courseParticipant = GenericMapper.toEntity(CourseParticipants, dto);
      courseParticipant.createAt = new Date();
      courseParticipant.recordStatus = recordStatus.Active;
      courseParticipant.personnel = { id: dto.personnelId } as Personnels;
      courseParticipant.courseDateTime = { id: dto.courseDateTimeId } as CourseDateTimes;
      courseParticipant.user = checkUser[0];
      arr.push(courseParticipant);

    });
    var result = await this.courseParticipantService.addMany(arr);
    return result;
  }


  @Put("update-course-participant")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'update course participant' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return course participant .', type: CourseParticipants })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async updateCourseParticipant(@Body() dto: UpdateCourseCourseParticipantDto): Promise<CourseParticipants> {

    var item = await this.courseParticipantService.getById(dto.id);
    if (!item) {
      throw new HttpException("The Course Participant is not found!", HttpStatus.NOT_FOUND);
    }
    item.isParticipated = dto.isParticipated ?? item.isParticipated;

    if (dto.courseDateTimeId)
      item.courseDateTime = { id: dto.courseDateTimeId ?? item.courseDateTime.id } as CourseDateTimes;
    if (dto.personnelId)
      item.personnel = { id: dto.personnelId ?? item.personnel.id } as Personnels;

    var updateitem = await this.courseParticipantService.update(item);
    var result = GenericMapper.toDto(CourseParticipants, updateitem, { excludeExtraneousValues: true });
    return result;
  }
  @Delete("delete-course-participant/:id")
  @ApiTags('Course Participants')
  @ApiOperation({ summary: 'remove course participant' })
  @ApiResponse({ status: HttpStatus.OK, description: 'return true if removed successfull.', type: Boolean })
  @UseGuards(JwtAuthGuard, AdminRolesGuard)
  @ApiBearerAuth()
  async deleteCourseParticipant(@Param('id') id: number): Promise<boolean> {


    var checkOperation = await this.courseParticipantService.getById(id);
    if (!checkOperation) {
      throw new HttpException("The Course Participant is not found!", HttpStatus.NOT_FOUND);
    }

    await this.courseParticipantService.delete(id);
    return true;
  }

  //#endregion warehouse  transaction

}


