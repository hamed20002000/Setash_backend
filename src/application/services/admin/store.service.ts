import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseRepository } from 'src/infrastructure/repositories/admin/warehouse.repository';
import { Stores } from 'src/domain/entities/Stores';
import { StoreRepository } from 'src/infrastructure/repositories/admin/store.repository';

@Injectable()
export class StoreService extends BaseService<Stores> {
  constructor(

    private readonly storeRepository: StoreRepository,
  ) {
    super(storeRepository);
  }
  async getItemBalances(storeId: number, itemId: number) {
    return this.storeRepository.getItemBalances(storeId, itemId);
  }
  async getStoreAllItemsBalances(storeId: number) {
    return this.storeRepository.getStoreAllItemsBalances(storeId);
  }
}