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
import { LeaveHistories } from 'src/domain/entities/LeaveHistories';
import { LeaveHistoriesRepository } from 'src/infrastructure/repositories/hr/leaveHistory.repository';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { SystemNotificationsRepository } from 'src/infrastructure/repositories/notification/system-notifications.repository';

@Injectable()
export class SystemNotificationsService extends BaseService<SystemNotifications> {
  constructor(

    private readonly itemRepository: SystemNotificationsRepository,
  ) {
    super(itemRepository);
  }

}