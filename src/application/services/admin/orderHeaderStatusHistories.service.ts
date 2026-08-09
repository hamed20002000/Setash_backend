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

@Injectable()
export class OrderHeaderStatusHistoriesService extends BaseService<OrderHeaderStatusHistories> {
  constructor(

    private readonly orderHeaderStatusHistoriesRepository: OrderHeaderStatusHistoriesRepository,
  ) {
    super(orderHeaderStatusHistoriesRepository);
  }

}