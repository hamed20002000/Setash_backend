import { Roles } from 'src/domain/entities/Roles';
import { Stores } from 'src/domain/entities/Stores';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class StoreSpecification extends Specification<Stores> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Stores): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Stores, any>> {
    return { id: this.id };
  }
}

export class StoreByWorkhouseSpecification extends Specification<Stores> {
  constructor(
    private readonly workhouseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Stores): boolean {
    return entity.workhouse.id === this.workhouseId;
  }

  toWhereClause(): Partial<Record<keyof Stores, any>> {
    return { workhouse: { id: this.workhouseId } };
  }
}

export class StoreCodeSpecification extends Specification<Stores> {
  constructor(
    private readonly code: string,
  ) {
    super();
  }

  isSatisfiedBy(entity: Stores): boolean {
    return entity.code === this.code;
  }

  toWhereClause(): Partial<Record<keyof Stores, any>> {
    return { code: this.code };
  }
}

export class StoreCodeAndNotIdSpecification extends Specification<Stores> {
  constructor(
    private readonly code: string,
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Stores): boolean {
    return entity.code === this.code && entity.id !== this.id;
  }

  toWhereClause(): Partial<Record<keyof Stores, any>> {
    return {
      code: this.code, 
      id: Not(this.id)   // دقیقا همینجا شرط "مخالف id" اعمال میشه
    };
  }
}






