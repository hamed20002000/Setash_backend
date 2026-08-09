import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class LeaveSpecification extends Specification<Leaves> {
  constructor(
    private readonly leaveId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Leaves): boolean {
    return entity.id === this.leaveId;
  }

  toWhereClause(): Partial<Record<keyof Leaves, any>> {
    return { id: this.leaveId };
  }
}

export class LeavePersonnelSpecification extends Specification<Leaves> {
  constructor(
    private readonly personnelId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Leaves): boolean {
    return entity.personnel.id === this.personnelId;
  }

  toWhereClause(): Partial<Record<keyof Leaves, any>> {
    return { id: this.personnelId };
  }
}








