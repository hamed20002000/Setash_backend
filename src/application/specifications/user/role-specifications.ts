import { Roles } from 'src/domain/entities/Roles';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class RoleSpecification extends Specification<Roles> {
  constructor(
    private readonly name: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Roles): boolean {
    const matchesRole = entity.name === this.name;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Roles, any>> {
    const whereClause: Partial<Record<keyof Roles, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }
   
    return whereClause;
  }
}

export class RoleNamesSpecification extends Specification<Roles> {
  constructor(private readonly names: string[]) {
    super();
  }

  isSatisfiedBy(entity: Roles): boolean {
    return this.names?.includes(entity.name);
  }

  toWhereClause(): FindOptionsWhere<Roles> {
    return this.names && this.names.length > 0
      ? { name: In(this.names) }   // ⬅️ حتماً از In استفاده کنید
      : {};
  }
}

export class RoleIdsSpecification extends Specification<Roles> {
  constructor(private readonly ids: number[]) {
    super();
  }

  isSatisfiedBy(entity: Roles): boolean {
    return this.ids?.includes(entity.id);
  }

  toWhereClause(): FindOptionsWhere<Roles> {
    return this.ids && this.ids.length > 0
      ? { id: In(this.ids) }   // ⬅️ حتماً از In استفاده کنید
      : {};
  }
}



