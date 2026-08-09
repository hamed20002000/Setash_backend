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
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { ConsignedCarRepository } from 'src/infrastructure/repositories/warehouse/consignedCar.repository';

@Injectable()
export class ConsignedCarService extends BaseService<ConsignedCars> {
  constructor(

    private readonly consignedCarRepository: ConsignedCarRepository,
  ) {
    super(consignedCarRepository);
  }

  async getCurrentCarForPersonnel(personnelId: number) {
    return await this.consignedCarRepository.getCurrentCarForPersonnel(personnelId);
  }

   async getCarsConsignedToWorkhouse(workhouseId: number) {
    return await this.consignedCarRepository.getCarsConsignedToWorkhouse(workhouseId);
  }

  async getAllConsignedCars() {
    return await this.consignedCarRepository.getAllConsignedCars();
  }

  async getAllAvailableCars() {
  return await this.consignedCarRepository.getAllAvailableCars();
  }
}