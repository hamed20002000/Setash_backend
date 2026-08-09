import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Requests } from 'src/domain/entities/Requests';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class RequestSpecification extends Specification<Requests> {
  constructor(
    private readonly requestId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Requests): boolean {
    return entity.id === this.requestId;
  }

  toWhereClause(): Partial<Record<keyof Requests, any>> {
    return { id: this.requestId };
  }
}









