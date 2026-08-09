import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class WorkhouseSpecification extends Specification<Workhouses> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Workhouses): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Workhouses, any>> {
    return { id: this.id };
  }
}





