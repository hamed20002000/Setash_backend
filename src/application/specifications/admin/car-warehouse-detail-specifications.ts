import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CarWarehouseDetailSpecification extends Specification<CarWarehouseDetails> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CarWarehouseDetails): boolean {
    return entity.carWarehouse.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof CarWarehouseDetails, any>> {
    return { carWarehouse: { id: this.id } };
  }
}









