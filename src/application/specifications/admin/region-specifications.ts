import { Categories } from 'src/domain/entities/Categories';
import { Regions } from 'src/domain/entities/Regions';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class RegionSpecification extends Specification<Regions> {
  constructor(
    private readonly name: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Regions): boolean {
    const matchesRole = entity.name === this.name;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Regions, any>> {
    const whereClause: Partial<Record<keyof Regions, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }
   
    return whereClause;
  }
}

export class RegionUpdateSpecification extends Specification<Regions> {
  constructor(
    private readonly name: string,
    private readonly id: number
  ) {
    super();
  }

  isSatisfiedBy(entity: Regions): boolean {
    const matchesName = entity.name === this.name;
    const idIsDifferent = entity.id !== this.id;
    return matchesName && idIsDifferent;
  }

  toWhereClause(): Partial<Record<keyof Regions, any>> {
    const whereClause: Partial<Record<keyof Regions, any>> = {};

    if (this.name) {
      whereClause.name = this.name;
    }

    if (this.id !== undefined && this.id !== null) {
      whereClause.id = Not(this.id);
    }

    return whereClause;
  }
}




