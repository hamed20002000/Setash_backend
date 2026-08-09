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
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { CarWarehousedetailRepository } from 'src/infrastructure/repositories/admin/carWarehouseDetail.repository';

@Injectable()
export class CarWarehouseDetailService extends BaseService<CarWarehouseDetails> {
  constructor(

    private readonly carWarehouseDetailRepository: CarWarehousedetailRepository,
  ) {
    super(carWarehouseDetailRepository);
  } 
 
}