import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class WarehouseSpecification extends Specification<Warehouses> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Warehouses): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Warehouses, any>> {
    return { id: this.id };
  }
}

export class WarehouseCodeSpecification extends Specification<Warehouses> {
  constructor(
    private readonly code: string,
  ) {
    super();
  }

  isSatisfiedBy(entity: Warehouses): boolean {
    return entity.code === this.code;
  }

  toWhereClause(): Partial<Record<keyof Warehouses, any>> {
    return { code: this.code };
  }
}

export class WarehouseCodeAndNotIdSpecification extends Specification<Warehouses> {
  constructor(
    private readonly code: string,
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Warehouses): boolean {
    return entity.code === this.code && entity.id !== this.id;
  }

  toWhereClause(): Partial<Record<keyof Warehouses, any>> {
    return { 
      code: this.code, 
      id: Not(this.id)   // دقیقا همینجا شرط "مخالف id" اعمال میشه
    };
  }
}






