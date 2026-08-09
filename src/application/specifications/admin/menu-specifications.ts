import { Categories } from 'src/domain/entities/Categories';
import { Menus } from 'src/domain/entities/Menus';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class MenuSpecification extends Specification<Menus> {
  constructor(
    private readonly name: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: Menus): boolean {
    const matchesRole = entity.name === this.name;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof Menus, any>> {
    const whereClause: Partial<Record<keyof Menus, any>> = {};
    if (this.name) {
      whereClause.name = this.name;
    }
   
    return whereClause;
  }
}





