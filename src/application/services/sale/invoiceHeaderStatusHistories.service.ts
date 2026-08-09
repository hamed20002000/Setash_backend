import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseRepository } from 'src/infrastructure/repositories/admin/warehouse.repository';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { OrderHeaderStatusHistoriesRepository } from 'src/infrastructure/repositories/admin/orderHeaderStatusHistories.repository';
import { InvoiceHeaderStatusHistories } from 'src/domain/entities/InvoiceHeaderStatusHistories';
import { InvoiceHeaderStatusHistoriesRepository } from 'src/infrastructure/repositories/sale/invoiceHeaderStatusHistories.repository';

@Injectable()
export class InvoiceHeaderStatusHistoriesService extends BaseService<InvoiceHeaderStatusHistories> {
  constructor(
    private readonly invoiceHeaderStatusHistoriesRepository: InvoiceHeaderStatusHistoriesRepository,
  ) {
    super(invoiceHeaderStatusHistoriesRepository);
  }

}