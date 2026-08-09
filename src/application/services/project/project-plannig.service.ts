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

@Injectable()
export class ProjectPlanningService extends BaseService<ProjectPlanings> {
  constructor(

    private readonly projectPlanningRepository: ProjectPlanningRepository,
  ) {
    super(projectPlanningRepository);
  }

}