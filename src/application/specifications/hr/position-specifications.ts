import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Positions } from 'src/domain/entities/Positions';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class PositionForNameSpecification extends Specification<Positions> {
  constructor(
    private readonly positionName: string,
  ) {
    super();
  }

  isSatisfiedBy(entity: Positions): boolean {
    return entity.title === this.positionName;
  }

  toWhereClause(): Partial<Record<keyof Positions, any>> {
    return { title: this.positionName };
  }
}










