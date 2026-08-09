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
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { WarehouseDispatchHeaderStatusHistoriesRepository } from 'src/infrastructure/repositories/warehouse/warehouse-dispatch-header-status-histories.repository';

@Injectable()
export class WarehouseDispatchHeaderStatusHistoriesService extends BaseService<WarehouseDispatchHeaderStatusHistories> {
  constructor(

    private readonly warehouseDispatchHeaderStatusHistoriesRepository: WarehouseDispatchHeaderStatusHistoriesRepository,
  ) {
    super(warehouseDispatchHeaderStatusHistoriesRepository);
  }

}