import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class WarehouseDispatchHeaderStatusHistoriesSpecification extends Specification<WarehouseDispatchHeaderStatusHistories> {
  constructor(
    private readonly warehouseDispatchHeaderId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: WarehouseDispatchHeaderStatusHistories): boolean {
    return entity.warehouseDispatchHeader.id === this.warehouseDispatchHeaderId && entity.recordStatus === recordStatus.Active;
  }

  toWhereClause(): Partial<Record<keyof WarehouseDispatchHeaderStatusHistories, any>> {
    return { warehouseDispatchHeader: { id: this.warehouseDispatchHeaderId }, recordStatus: recordStatus.Active };
  }
}





