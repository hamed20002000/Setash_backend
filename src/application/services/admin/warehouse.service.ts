import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseRepository } from 'src/infrastructure/repositories/admin/warehouse.repository';

@Injectable()
export class WarehouseService extends BaseService<Warehouses> {
  constructor(

    private readonly warehouseRepository: WarehouseRepository,
  ) {
    super(warehouseRepository);
  }
  async getItemBalances(warehouseId: number, itemId: number) {
    return this.warehouseRepository.getItemBalances(warehouseId, itemId);
  }
  async getWarehouseAllItemsBalances(warehouseId: number) {
    return this.warehouseRepository.getWarehouseAllItemsBalances(warehouseId);
  }
}