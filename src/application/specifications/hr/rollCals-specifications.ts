import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { Roles } from 'src/domain/entities/Roles';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class RollCallsByPersonnelIdSpecification extends Specification<Rollcalls> {
  constructor(
    private readonly personnelId: number,

  ) {
    super();
  }

  isSatisfiedBy(entity: Rollcalls): boolean {
    return entity.personnelWorkPlace.personnel.id === this.personnelId;
  }

  toWhereClause(): Partial<Record<keyof Rollcalls, any>> {
    return { id: this.personnelId };
  }
}

export class RollCallsBIdSpecification extends Specification<Rollcalls> {
  constructor(
    private readonly id: number,
    
  ) {
    super();
  }

  isSatisfiedBy(entity: Rollcalls): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof Rollcalls, any>> {
    return { id: this.id };
  }
}







