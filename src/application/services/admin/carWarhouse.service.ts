import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Providers } from 'src/domain/entities/Providers';
import { ProviderRepository } from 'src/infrastructure/repositories/admin/provider.repository';
import { CarWarehouses } from 'src/domain/entities/CarWarehouses';
import { CarWarehouseRepository } from 'src/infrastructure/repositories/admin/carWarehouse.repository';

@Injectable()
export class CarWarehouseService extends BaseService<CarWarehouses> {
  constructor(

    private readonly carWarehouseRepository: CarWarehouseRepository,
  ) {
    super(carWarehouseRepository);
  } 
 
}