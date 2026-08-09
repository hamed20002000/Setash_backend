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
import { CarFuels } from 'src/domain/entities/CarFuels';
import { CarFuelRepository } from 'src/infrastructure/repositories/warehouse/carFuels.repository';

@Injectable()
export class CarFuelService extends BaseService<CarFuels> {
  constructor(

    private readonly carFuelRepository: CarFuelRepository,
  ) {
    super(carFuelRepository);
  }

}