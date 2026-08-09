import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { Roles } from 'src/domain/entities/Roles';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class RoleMenuOperationByRoleIdAndMenuOperationIdSpecification extends Specification<RoleMenuOperations> {
  constructor(
    private readonly roleId: number,
    private readonly menuOperationId?: number,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: RoleMenuOperations): boolean {
    const matchesRole = entity.role.id === this.roleId &&
      (this.menuOperationId ? entity.menuOperation.id === this.menuOperationId : true);
   
    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof RoleMenuOperations, any>> {
    const whereClause: Partial<Record<keyof RoleMenuOperations, any>> = {};
   
      whereClause.role = { id: this.roleId };
      if (this.menuOperationId) {
        whereClause.menuOperation = { id: this.menuOperationId };
      }
    return whereClause;
  }
}




