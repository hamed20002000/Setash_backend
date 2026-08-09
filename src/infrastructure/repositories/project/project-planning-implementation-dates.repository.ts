import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';
import { Projects } from 'src/domain/entities/Projects';
import { ProjectPlanings } from 'src/domain/entities/ProjectPlanings';
import { ProjectPlanningImplementation } from 'src/domain/entities/ProjectPlanningImplementation';
import { ProjectPlanningImplementationDates } from 'src/domain/entities/ProjectPlanningImplementaionDates';

@Injectable()
export class ProjectPlanningImplementationDatesRepository extends BaseRepository<ProjectPlanningImplementationDates> {
  constructor(@InjectRepository(ProjectPlanningImplementationDates) repository: Repository<ProjectPlanningImplementationDates>) {
    super(repository);
  }
  
}
