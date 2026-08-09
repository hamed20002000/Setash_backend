import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { Projects } from 'src/domain/entities/Projects';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ProjectPlanningSpecification extends Specification<ProjectPlanings> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanings): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanings, any>> {
    return { id: this.id };
  }
}


export class ProjectPlanningByProjectIdSpecification extends Specification<ProjectPlanings> {
  constructor(
    private readonly projectId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ProjectPlanings): boolean {
    return entity.project.id === this.projectId;
  }

  toWhereClause(): Partial<Record<keyof ProjectPlanings, any>> {
    return { project: { id: this.projectId } };
  }
}










