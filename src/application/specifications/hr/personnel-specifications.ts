import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Personnels } from 'src/domain/entities/Personnels';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class PersonnelsSpecification extends Specification<Personnels> {
  constructor(
    private readonly personnelId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: Personnels): boolean {
    return entity.id === this.personnelId;
  }

  toWhereClause(): Partial<Record<keyof Personnels, any>> {
    return { id: this.personnelId };
  }
}

export class PersonnelsForIdentitySpecification extends Specification<Personnels> {
  constructor(
    private readonly identityNumber: string,
  ) {
    super();
  }

  isSatisfiedBy(entity: Personnels): boolean {
    return entity.identityNumber === this.identityNumber;
  }

  toWhereClause(): Partial<Record<keyof Personnels, any>> {
    return { identityNumber: this.identityNumber };
  }
}










