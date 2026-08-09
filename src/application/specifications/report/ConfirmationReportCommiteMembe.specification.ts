import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';
import { ConfirmationReportCommiteMember } from 'src/domain/entities/ConfirmationReportCommiteMember';
import { Courses } from 'src/domain/entities/Courses';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ConfirmationReportCommiteMemberByIdSpecification extends Specification<ConfirmationReportCommiteMember> {
  constructor(
    private readonly confirmationReportCommiteMemberId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationReportCommiteMember): boolean {
    return entity.id === this.confirmationReportCommiteMemberId;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationReportCommiteMember, any>> {
    return { id: this.confirmationReportCommiteMemberId };
  }
}

export class ConfirmationReportCommiteMemberByReportIdSpecification extends Specification<ConfirmationReportCommiteMember> {
  constructor(
    private readonly confirmationReportId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationReportCommiteMember): boolean {
    return entity.confirmationProjectReport.id === this.confirmationReportId;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationReportCommiteMember, any>> {
    return { confirmationProjectReport: { id: this.confirmationReportId } };
  }
}










