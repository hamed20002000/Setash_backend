import { ConsignedCars } from "src/domain/entities/ConsignedCars";
import { Specification } from "src/domain/specifications/base.specification";


export class ConsignedNotReturnedSpecification extends Specification<ConsignedCars> {
  constructor() {
    super();
  }

  isSatisfiedBy(entity: ConsignedCars): boolean {
    return entity.consigned === true;
  }

  toWhereClause(): Partial<Record<keyof ConsignedCars, any>> {
    return {
      consigned: true,
     
    };
  }
}

export class ConsignedReturnedSpecification extends Specification<ConsignedCars> {
  constructor() {
    super();
  }

  isSatisfiedBy(entity: ConsignedCars): boolean {
    return entity.consigned === true;
  }

  toWhereClause(): Partial<Record<keyof ConsignedCars, any>> {
    return {
      consigned: false,
     
    };
  }
}

