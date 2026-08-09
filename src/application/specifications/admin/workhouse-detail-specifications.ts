import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class WorkhouseDetailSpecification extends Specification<WorkhouseDetails> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: WorkhouseDetails): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Workhouses, any>> {
    return { id: this.id };
  }
}

export class WorkhouseDetailByWorkhouseSpecification extends Specification<WorkhouseDetails> {
  constructor(
    private readonly workhouseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: WorkhouseDetails): boolean {
    return entity.workhouse.id === this.workhouseId;
  }

  toWhereClause(): Partial<Record<keyof WorkhouseDetails, any>> {
    return { workhouse: { id: this.workhouseId } };
  }
}








