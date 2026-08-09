import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class OrderHeaderStatusHistoriesSpecification extends Specification<OrderHeaderStatusHistories> {
  constructor(
    private readonly orderHeaderId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: OrderHeaderStatusHistories): boolean {
    return entity.orderHeader.id === this.orderHeaderId && entity.recordStatus === recordStatus.Active;
  }

  toWhereClause(): Partial<Record<keyof OrderHeaderStatusHistories, any>> {
    return { orderHeader: { id: this.orderHeaderId }, recordStatus: recordStatus.Active };
  }
}





