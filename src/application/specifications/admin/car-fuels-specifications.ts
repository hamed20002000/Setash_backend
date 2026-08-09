import { Cons } from 'rxjs';
import { CarFuels } from 'src/domain/entities/CarFuels';
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CarFuelsByCarIdSpecification extends Specification<CarFuels> {
  constructor(
    private readonly carId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CarFuels): boolean {
    return entity.consignedCar.id === this.carId;
  }

  toWhereClause(): Partial<Record<keyof CarFuels, any>> {
    return { consignedCar:{ id: this.carId } };
  }
}









