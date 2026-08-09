import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningImplementationDates } from 'src/domain/entities/ProjectPlanningImplementaionDates';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { Projects } from 'src/domain/entities/Projects';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ProjectPlanningImplementationDatesSpecification extends Specification<ProjectPlanningImplementationDates> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanningImplementationDates): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanningImplementationDates, any>> {
    return { id: this.id };
  }
}


export class ProjectPlanningImplementationDateByProjectPlanningIdSpecification extends Specification<ProjectPlanningImplementationDates> {
  constructor(
    private readonly projectPlanningId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanningImplementationDates): boolean {
    return entity.projectPlanning.id === this.projectPlanningId;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanningImplementationDates, any>> {
    return { projectPlanning: { id: this.projectPlanningId } };
  }
}










