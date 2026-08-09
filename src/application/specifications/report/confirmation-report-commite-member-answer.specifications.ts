import { ConfirmationReportCommiteMemberAnswer } from 'src/domain/entities/ConfirmationReportCommiteMemberAnswer';
import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { Courses } from 'src/domain/entities/Courses';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ConfirmationReportCommiteMemberAnswerByMemberIdSpecification extends Specification<ConfirmationReportCommiteMemberAnswer> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationReportCommiteMemberAnswer): boolean {
    return entity.confirmationReportCommiteMember.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationReportCommiteMemberAnswer, any>> {
    return { confirmationReportCommiteMember: { id: this.id } };
  }
}


export class ConfirmationReportCommiteMemberAnswerByIdSpecification extends Specification<ConfirmationReportCommiteMemberAnswer> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationReportCommiteMemberAnswer): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationReportCommiteMemberAnswer, any>> {
    return { id: this.id };
  }
}

export class ConfirmationReportCommiteMemberAnswerByReportIdSpecification extends Specification<ConfirmationReportCommiteMemberAnswer> {
  constructor(
    private readonly reportId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationReportCommiteMemberAnswer): boolean {
    return entity.confirmationReportCommiteMember.confirmationProjectReport.id === this.reportId;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationReportCommiteMemberAnswer, any>> {
    return { confirmationReportCommiteMember: { confirmationProjectReport: { id: this.reportId } } };
  }
}










