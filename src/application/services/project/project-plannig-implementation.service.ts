import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { Items } from 'src/domain/entities/Items';
import { ItemRepository } from 'src/infrastructure/repositories/admin/item.repository';
import { Drivers } from 'src/domain/entities/Drivers';
import { DriversRepository } from 'src/infrastructure/repositories/warehouse/driver.repository';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';

import { Projects } from 'src/domain/entities/Projects';
import { ProjectsRepository } from 'src/infrastructure/repositories/project/project.repository';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningRepository } from 'src/infrastructure/repositories/project/project-plannign.repository';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { ProjectPlanningImplementationRepository } from 'src/infrastructure/repositories/project/project-planning-implementation.repository';
import { ProjectImplementationReportDto } from 'src/presentation/dtos/project/project-implementation-report.dto';
import { ChantierManagerKpiReportDto } from 'src/presentation/dtos/project/project-manager-kpi-report.dto';

@Injectable()
export class ProjectPlanningImplementationService extends BaseService<ProjectPlanningImplementation> {
  constructor(

    private readonly projectPlanningImplementationRepository: ProjectPlanningImplementationRepository,
  ) {
    super(projectPlanningImplementationRepository);
  }
   async getProjectPlanningImplementatoinReport(projectId: number): Promise<ProjectImplementationReportDto[]> {
    return this.projectPlanningImplementationRepository.getProjectPlanningImplementatoinReport(projectId);
   }

  async getProjectPlanningKpiTotal(projectId: number): Promise<number> {
    return this.projectPlanningImplementationRepository.getProjectPlanningKpiTotal(projectId);
  }

  async getChantierManagerKpiTotal(personnelId: number): Promise<number> {
    return this.projectPlanningImplementationRepository.getChantierManagerKpiTotal(personnelId);
  }

  async getChantierManagerKpiReport(personnelId: number): Promise<ChantierManagerKpiReportDto | null> {
    return this.projectPlanningImplementationRepository.getChantierManagerKpiReport(personnelId);
  }

}
