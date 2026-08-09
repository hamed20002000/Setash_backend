import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { Items } from 'src/domain/entities/Items';
import { ItemRepository } from 'src/infrastructure/repositories/admin/item.repository';
import { Drivers } from 'src/domain/entities/Drivers';
import { DriversRepository } from 'src/infrastructure/repositories/warehouse/driver.repository';
import { WorkhouseRents } from 'src/domain/entities/WorkhouseRents';
import { WorkhouseRentsRepository } from 'src/infrastructure/repositories/warehouse/workhouse-rent.repository';

@Injectable()
export class WorkhouseRentsService extends BaseService<WorkhouseRents> {
  constructor(

    private readonly workhouseRentsRepository: WorkhouseRentsRepository,
  ) {
    super(workhouseRentsRepository);
  }

 async deleteWorkhouseRent(workhouseRentId: number): Promise<void> {
    return await this.workhouseRentsRepository.deleteWorkhouseRent(workhouseRentId);
  }
}