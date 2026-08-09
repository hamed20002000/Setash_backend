import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class SystemOperationSpecification extends Specification<SystemOperations> {
  constructor(
    private readonly name: string,
    // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: SystemOperations): boolean {
    const matchesRole = entity.name === this.name;

    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof SystemOperations, any>> {
    const whereClause: Partial<Record<keyof SystemOperations, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }

    return whereClause;
  }
}

export class SystemOperationsSpecification extends Specification<SystemOperations> {
  constructor(private readonly ids: number[]) {
    super();
  }

  isSatisfiedBy(entity: SystemOperations): boolean {
    return this.ids.includes(entity.id);
  }

  toWhereClause(): FindOptionsWhere<SystemOperations> {
    return this.ids && this.ids.length > 0
      ? { id: In(this.ids) }
      : { id: In([]) }; // ⬅️ شرطی که هیچ چیز باز نمی‌گرداند
  }
}




