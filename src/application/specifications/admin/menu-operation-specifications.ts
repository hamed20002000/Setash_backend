import { MenuOperations } from 'src/domain/entities/MenuOperations';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';

export class MenuOperationsSpecification extends Specification<MenuOperations> {
  constructor(private readonly ids: number[]) {
    super();
  }

  isSatisfiedBy(entity: MenuOperations): boolean {
    return this.ids.includes(entity.id);
  }

  toWhereClause(): FindOptionsWhere<MenuOperations> {
    return this.ids && this.ids.length > 0
      ? { id: In(this.ids) }
      : { id: In([]) }; // ⬅️ شرطی که هیچ چیز باز نمی‌گرداند
  }
}




