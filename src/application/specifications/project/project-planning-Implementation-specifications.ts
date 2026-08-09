import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { Projects } from 'src/domain/entities/Projects';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ProjectPlanningImplementationSpecification extends Specification<ProjectPlanningImplementation> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanningImplementation): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanningImplementation, any>> {
    return { id: this.id };
  }
}


export class ProjectPlanningImplementationByProjectPlanningIdSpecification extends Specification<ProjectPlanningImplementation> {
  constructor(
    private readonly projectPlanningDateId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanningImplementation): boolean {
    return entity.projectPlanningImplementationDate.id === this.projectPlanningDateId;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanningImplementation, any>> {
    return { projectPlanningImplementationDate: { id: this.projectPlanningDateId } };
  }
}










