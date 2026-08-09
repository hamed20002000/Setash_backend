import { Cons } from 'rxjs';
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ConsignedCarByCarWarehouseDetailIdSpecification extends Specification<ConsignedCars> {
  constructor(
    private readonly carWarehouseDetailId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConsignedCars): boolean {
    return entity.carWarehouseDetail.id === this.carWarehouseDetailId;
  }

  toWhereClause(): Partial<Record<keyof ConsignedCars, any>> {
    return { carWarehouseDetail: { id: this.carWarehouseDetailId } };
  }
}

export class ConsignedCarByCarWarehouseIdSpecification extends Specification<ConsignedCars> {
  constructor(
    private readonly carWarehouseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConsignedCars): boolean {
    return entity.carWarehouseDetail.carWarehouse.id === this.carWarehouseId;
  }

  toWhereClause(): Partial<Record<keyof ConsignedCars, any>> {
    return { carWarehouseDetail: { carWarehouse: { id: this.carWarehouseId } } };
  }
}

export class ConsignedCarByIdSpecification extends Specification<ConsignedCars> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: ConsignedCars): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof ConsignedCars, any>> {
    return { id: this.id };
  }
}









