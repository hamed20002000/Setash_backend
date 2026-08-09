import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { WorkhouseRents } from 'src/domain/entities/WorkhouseRents';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class WorkhouseRentSpecification extends Specification<WorkhouseRents> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: WorkhouseRents): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof WorkhouseRents, any>> {
    return { id: this.id };
  }
}

export class WorkhouseRentByWorkhouseSpecification extends Specification<WorkhouseRents> {
  constructor(
    private readonly workhouseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: WorkhouseRents): boolean {
    return entity.workhouse.id === this.workhouseId;
  }

  toWhereClause(): Partial<Record<keyof WorkhouseRents, any>> {
    return { workhouse: { id: this.workhouseId } };
  }
}








