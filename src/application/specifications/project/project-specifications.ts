import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Projects } from 'src/domain/entities/Projects';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { IsNull, Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ProjectSpecification extends Specification<Projects> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Projects): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Projects, any>> {
    return { id: this.id };
  }
}

export class ProjectIsEndSpecification extends Specification<Projects> {
  constructor(
    
  ) {
    super();
  }

  isSatisfiedBy(entity: Projects): boolean {
    return entity.endDate != null;
  }

  toWhereClause(): Partial<Record<keyof Projects, any>> {
    // where endDate IS NOT NULL
    return { endDate: Not(IsNull()) as any };
  }
}







