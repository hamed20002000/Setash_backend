import { Items } from 'src/domain/entities/Items';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ItemSpecification extends Specification<Items> {
  constructor(
    private readonly name: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Items): boolean {
    const matchesRole = entity.name === this.name;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Items, any>> {
    const whereClause: Partial<Record<keyof Items, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }
   
    return whereClause;
  }
}

export class ItemIdSpecification extends Specification<Items> {
  constructor(
    private readonly id: number,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Items): boolean {
    const matchesRole = entity.id === this.id;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Items, any>> {
    const whereClause: Partial<Record<keyof Items, any>> = {};
    if (this.id) {
      whereClause.id = this.id;
    }
   
    return whereClause;
  }
}

export class ItemAbbriviationSpecification extends Specification<Items> {
  constructor(
    private readonly abb: string,
    private readonly id: number
  ) {
    super();
  }

  isSatisfiedBy(entity: Items): boolean {
    const matchesName = entity.abbreviation === this.abb;
    const idIsDifferent = entity.id !== this.id;
    return matchesName && idIsDifferent;
  }

  toWhereClause(): Partial<Record<keyof Items, any>> {
    const whereClause: Partial<Record<keyof Items, any>> = {};

    if (this.abb) {
      whereClause.abbreviation = this.abb;
    }

    if (this.id !== undefined && this.id !== null) {
      whereClause.id = Not(this.id);
    }

    return whereClause;
  }
}

export class ItemCreateCheckAbbSpecification extends Specification<Items> {
  constructor(
    private readonly abb: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Items): boolean {
    const matchesRole = entity.abbreviation === this.abb;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Items, any>> {
    const whereClause: Partial<Record<keyof Items, any>> = {};
    if (this.abb) {
      whereClause.abbreviation = this.abb;
    }
   
    return whereClause;
  }
}







