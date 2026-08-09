import { Categories } from 'src/domain/entities/Categories';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CategorySpecification extends Specification<Categories> {
  constructor(
    private readonly name: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Categories): boolean {
    const matchesRole = entity.name === this.name;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Categories, any>> {
    const whereClause: Partial<Record<keyof Categories, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }
   
    return whereClause;
  }
}

export class CategoryUpdateSpecification extends Specification<Categories> {
  constructor(
    private readonly name: string,
    private readonly id: number
  ) {
    super();
  }

  isSatisfiedBy(entity: Categories): boolean {
    const matchesName = entity.name === this.name;
    const idIsDifferent = entity.id !== this.id;
    return matchesName && idIsDifferent;
  }

  toWhereClause(): Partial<Record<keyof Categories, any>> {
    const whereClause: Partial<Record<keyof Categories, any>> = {};

    if (this.name) {
      whereClause.name = this.name;
    }

    if (this.id !== undefined && this.id !== null) {
      whereClause.id = Not(this.id);
    }

    return whereClause;
  }
}




