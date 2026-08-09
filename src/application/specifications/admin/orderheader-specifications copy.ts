import { OrderHeaders } from 'src/domain/entities/OrderHeaders';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class OrderHeaderByWorkhouseIdSpecification extends Specification<OrderHeaders> {
  constructor(
    private readonly workhouseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: OrderHeaders): boolean {
    return entity.workhouse.id === this.workhouseId && entity.recordStatus === recordStatus.Active;
  }

  toWhereClause(): Partial<Record<keyof OrderHeaders, any>> {
    return { workhouse: { id: this.workhouseId }, recordStatus: recordStatus.Active };
  }
}





