import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { StoreDispatchHeaderStatusHistories } from 'src/domain/entities/StoreDispatchHeaderStatusHistories';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class StoreDispatchHeaderStatusHistoriesSpecification extends Specification<StoreDispatchHeaderStatusHistories> {
  constructor(
    private readonly storeDispatchHeaderId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: StoreDispatchHeaderStatusHistories): boolean {
    return entity.storeDispatchHeader.id === this.storeDispatchHeaderId && entity.recordStatus === recordStatus.Active;
  }

  toWhereClause(): Partial<Record<keyof StoreDispatchHeaderStatusHistories, any>> {
    return { storeDispatchHeader: { id: this.storeDispatchHeaderId }, recordStatus: recordStatus.Active };
  }
}





