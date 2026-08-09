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
import { ProjectPlanningImplementationDates } from 'src/domain/entities/ProjectPlanningImplementaionDates';
import { ProjectPlanningImplementationDatesRepository } from 'src/infrastructure/repositories/project/project-planning-implementation-dates.repository';

@Injectable()
export class ProjectPlanningImplementationDatesService extends BaseService<ProjectPlanningImplementationDates> {
    constructor(

        private readonly projectPlanningImplementationDatesRepository: ProjectPlanningImplementationDatesRepository,
    ) {
        super(projectPlanningImplementationDatesRepository);
    }

}