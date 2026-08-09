import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class DriverVehicleSpecification extends Specification<DriverVehicles> {
  constructor(
    private readonly driverId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: DriverVehicles): boolean {
    return entity.driver.id === this.driverId;
  }

  toWhereClause(): Partial<Record<keyof DriverVehicles, any>> {
    return { driver: { id: this.driverId } };
  }
}

export class DriverVehicleByIdSpecification extends Specification<DriverVehicles> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: DriverVehicles): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof DriverVehicles, any>> {
    return { id: this.id };
  }
}






