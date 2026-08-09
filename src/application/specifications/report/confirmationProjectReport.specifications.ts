import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';
import { Courses } from 'src/domain/entities/Courses';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ConfirmationProjectReportByIdSpecification extends Specification<ConfirmationProjectReport> {
  constructor(
    private readonly confirmationProjectReportId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConfirmationProjectReport): boolean {
    return entity.id === this.confirmationProjectReportId;
  }

  toWhereClause(): Partial<Record<keyof ConfirmationProjectReport, any>> {
    return { id: this.confirmationProjectReportId };
  }
}









