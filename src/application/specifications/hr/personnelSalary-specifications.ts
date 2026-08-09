import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { PersonnelSalary } from 'src/domain/entities/PersonnelSalary';
import { Requests } from 'src/domain/entities/Requests';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class PersonnelSalaryWithPersonnelIdSpecification extends Specification<PersonnelSalary> {
  constructor(
    private readonly personnelId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelSalary): boolean {
    return entity.personnel.id === this.personnelId;
  }

  toWhereClause(): Partial<Record<keyof PersonnelSalary, any>> {
    return { personnel: { id: this.personnelId } } as any;
  }
}









