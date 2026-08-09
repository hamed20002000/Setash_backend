import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { PersonnelConsigneds } from 'src/domain/entities/PersonnelConsigneds';
import { Requests } from 'src/domain/entities/Requests';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class PersonnelConsignedSpecification extends Specification<PersonnelConsigneds> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelConsigneds): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof PersonnelConsigneds, any>> {
    return { id: this.id };
  }
}

export class PersonnelConsignedDonReturnSpecification extends Specification<PersonnelConsigneds> {
  constructor(
    private readonly personnelId: number
    
  ) {
    super();
  }

  isSatisfiedBy(entity: PersonnelConsigneds): boolean {
    return entity.personnel.id === this.personnelId && entity.returnDate === null;
  }

  toWhereClause(): Partial<Record<keyof PersonnelConsigneds, any>> {
    return { personnel: { id: this.personnelId }, returnDate: null };
  }
}










