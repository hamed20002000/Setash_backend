import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { Items } from 'src/domain/entities/Items';
import { ItemRepository } from 'src/infrastructure/repositories/admin/item.repository';
import { Positions } from 'src/domain/entities/Positions';
import { PositionRepository } from 'src/infrastructure/repositories/hr/position.repository';
import { Personnels } from 'src/domain/entities/Personnels';
import { PersonnelsRepository } from 'src/infrastructure/repositories/hr/personnels.repository';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeavesRepository } from 'src/infrastructure/repositories/hr/leaves.repository';
import { LeaveDaysDto } from 'src/presentation/dtos/hr/leaves-dto';
import { Consignments } from 'src/domain/entities/Consignments';
import { ConsignmentsRepository } from 'src/infrastructure/repositories/hr/consignments.repository';
import { PersonnelConsigneds } from 'src/domain/entities/PersonnelConsigneds';
import { PersonnelConsignedsRepository } from 'src/infrastructure/repositories/hr/personnelConsigneds.repository';

@Injectable()
export class PersonnelConsignedsService extends BaseService<PersonnelConsigneds> {
  constructor(

    private readonly itemRepository: PersonnelConsignedsRepository,
  ) {
    super(itemRepository);
  }


}