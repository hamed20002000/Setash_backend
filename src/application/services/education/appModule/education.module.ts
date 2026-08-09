import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Positions } from 'src/domain/entities/Positions';
import { PositionRepository } from 'src/infrastructure/repositories/hr/position.repository';
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
import { Teachers } from 'src/domain/entities/Teachers';
import { TeacherService } from '../teacher.service';
import { TeacherRepository } from 'src/infrastructure/repositories/education/teacher.repository';
import { EducationController } from 'src/presentation/controllers/education/education.controller';
import { Courses } from 'src/domain/entities/Courses';
import { CourseRepository } from 'src/infrastructure/repositories/education/course.repository';
import { CourseService } from '../course.service';
import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { CourseDateTimeRepository } from 'src/infrastructure/repositories/education/courseDateTime.repository';
import { CourseDateTimeService } from '../courseDateTime.service';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { CourseParticipantService } from '../courseParticipant.service';
import { CourseParticipantRepository } from 'src/infrastructure/repositories/education/courseParticipant.repository';
import { PersonnelsService } from '../../hr/personnels.service';
import { PersonnelsRepository } from 'src/infrastructure/repositories/hr/personnels.repository';
import { Personnels } from 'src/domain/entities/Personnels';
import { PasswordService } from '../../helper/password.service';




@Module({
  imports: [
    TypeOrmModule.forFeature([Positions, Users, Roles, RoleMenuOperations, SystemOperations, UserMenuOperations, UserRoles, Menus,
      MenuOperations, Teachers,Courses,CourseDateTimes,CourseParticipants,Personnels
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [EducationController],
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
    TeacherService,
    TeacherRepository,
    CourseRepository,
    CourseService,
    CourseDateTimeRepository,
    CourseDateTimeService,
    CourseParticipantRepository,
    CourseParticipantService,
    PersonnelsService,
    PersonnelsRepository,
    PasswordService


  ],
  exports: [PositionRepository,
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
    TeacherService,
    TeacherRepository,
    CourseRepository,
    CourseService,
    CourseDateTimeRepository,
    CourseDateTimeService,
    CourseParticipantRepository,
    CourseParticipantService,
    PersonnelsService,
    PersonnelsRepository
  ]
})
export class EducationModule { }