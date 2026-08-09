import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ItemUnitSpecification extends Specification<ItemUnits> {
  constructor(
    private readonly title: string,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: ItemUnits): boolean {
    const matchesRole = entity.title === this.title;
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof ItemUnits, any>> {
    const whereClause: Partial<Record<keyof ItemUnits, any>> = {};
    if (this.title) {
      whereClause.title = this.title;
    }
   
    return whereClause;
  }
}





