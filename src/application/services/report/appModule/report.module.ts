import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/infrastructure/repositories/base.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Positions } from 'src/domain/entities/Positions';
import { PositionRepository } from 'src/infrastructure/repositories/hr/position.repository';
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
import { TeacherRepository } from 'src/infrastructure/repositories/education/teacher.repository';
import { EducationController } from 'src/presentation/controllers/education/education.controller';
import { CourseRepository } from 'src/infrastructure/repositories/education/course.repository';
import { CourseDateTimeRepository } from 'src/infrastructure/repositories/education/courseDateTime.repository';
import { CourseParticipantRepository } from 'src/infrastructure/repositories/education/courseParticipant.repository';
import { CommiteMembers } from 'src/domain/entities/CommiteMembers';
import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';
import { ConfirmationReportCommiteMember } from 'src/domain/entities/ConfirmationReportCommiteMember';
import { ConfirmationReportCommiteMemberAnswer } from 'src/domain/entities/ConfirmationReportCommiteMemberAnswer';
import { CommiteMembersService } from '../commiteMember.service';
import { ConfirmationProjectReportService } from '../confirmationProjectReport.service';
import { ConfirmationReportCommiteMemberService } from '../confirmationReportCommiteMember.service';
import { ConfirmationReportCommiteMemberAnswerService } from '../confirmationReportCommiteMemberAnswer.service';
import { CommiteMembersRepository } from 'src/infrastructure/repositories/report/commiteMember.repository';
import { ConfirmationProjectReportRepository } from 'src/infrastructure/repositories/report/confirmationProjectReport.repository';
import { ConfirmationReportCommiteMemberRepository } from 'src/infrastructure/repositories/report/confirmationReportCommiteMember.repository';
import { ConfirmationReportCommiteMemberAnswerRepository } from 'src/infrastructure/repositories/report/confirmationReportCommiteMemberAnswer.repository';
import { ReportController } from 'src/presentation/controllers/report/report.controller';
import { ReportService } from '../repots.service';
import { RollCallRepository } from 'src/infrastructure/repositories/hr/rollCals.repository';
import { RollcallsService } from '../../hr/rollcals.service';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { PasswordService } from '../../helper/password.service';





@Module({
  imports: [
    TypeOrmModule.forFeature([Positions, Users, Roles, RoleMenuOperations, SystemOperations, UserMenuOperations, UserRoles, Menus,
      MenuOperations, CommiteMembers,ConfirmationProjectReport,ConfirmationReportCommiteMember,ConfirmationReportCommiteMemberAnswer, Rollcalls
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ReportController],
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
    CommiteMembersService,
    ConfirmationProjectReportService,
    ConfirmationReportCommiteMemberService,
    ConfirmationReportCommiteMemberAnswerService,
    CommiteMembersRepository,
    ConfirmationProjectReportRepository,
    ConfirmationReportCommiteMemberRepository,
    ConfirmationReportCommiteMemberAnswerRepository,
    ReportService,
       RollCallRepository,
    RollcallsService,
    PasswordService
    
   

  ],
  exports: [
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
       CommiteMembersService,
    ConfirmationProjectReportService,
    ConfirmationReportCommiteMemberService,
    ConfirmationReportCommiteMemberAnswerService,
    CommiteMembersRepository,
    ConfirmationProjectReportRepository,
    ConfirmationReportCommiteMemberRepository,
    ConfirmationReportCommiteMemberAnswerRepository,
    RollCallRepository,
    RollcallsService
    
  ]
})
export class ReportModule { }