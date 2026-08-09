import { InvoiceHeaderStatusHistories } from 'src/domain/entities/InvoiceHeaderStatusHistories';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class InvoiceHeaderStatusHistoriesSpecification extends Specification<InvoiceHeaderStatusHistories> {
  constructor(
    private readonly invoiceHeaderId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: InvoiceHeaderStatusHistories): boolean {
    return entity.invoiceHeader.id === this.invoiceHeaderId && entity.recordStatus === recordStatus.Active;
  }

  toWhereClause(): Partial<Record<keyof InvoiceHeaderStatusHistories, any>> {
    return { invoiceHeader: { id: this.invoiceHeaderId }, recordStatus: recordStatus.Active };
  }
}





