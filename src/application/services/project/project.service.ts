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
import { ProjectOverallProgressDto, ProjectProgressDto } from 'src/presentation/dtos/project/project-dto';

@Injectable()
export class ProjectsService extends BaseService<Projects> {
  constructor(
    
    private readonly projectRepository: ProjectsRepository,
  ) {
    super(projectRepository);
  }

  async getProjectProgress(projectId: number): Promise<ProjectProgressDto[]> {
    return this.projectRepository.getProjectProgress(projectId);
  }

  async getProjectsOverallProgress(): Promise<ProjectOverallProgressDto[]> {
    return this.projectRepository.getProjectsOverallProgress();
  }

}
