import { CarWarehouses } from 'src/domain/entities/CarWarehouses';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CarWarehouseSpecification extends Specification<CarWarehouses> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }
  
  isSatisfiedBy(entity: CarWarehouses): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof CarWarehouses, any>> {
    return { id: this.id };
  }
}

export class CarWarehouseCodeSpecification extends Specification<CarWarehouses> {
  constructor(
    private readonly code: string,
  ) {
    super();
  }

  isSatisfiedBy(entity: CarWarehouses): boolean {
    return entity.code === this.code;
  }

  toWhereClause(): Partial<Record<keyof CarWarehouses, any>> {
    return { code: this.code };
  }
}

export class CarWarehouseCodeAndNotIdSpecification extends Specification<CarWarehouses> {
  constructor(
    private readonly code: string,
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CarWarehouses): boolean {
    return entity.code === this.code && entity.id !== this.id;
  }

  toWhereClause(): Partial<Record<keyof CarWarehouses, any>> {
    return { 
      code: this.code, 
      id: Not(this.id)   // دقیقا همینجا شرط "مخالف id" اعمال میشه
    };
  }
}






