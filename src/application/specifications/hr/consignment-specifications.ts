import { Consignments } from 'src/domain/entities/Consignments';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';
import { Roles } from 'src/domain/entities/Roles';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { SelectQueryBuilder } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class ConsignedByCodeSpecification extends Specification<Consignments> {
  constructor(
    private readonly code: string,

  ) {
    super();
  }

  isSatisfiedBy(entity: Consignments): boolean {
    return entity.code === this.code;
  }

  toWhereClause(): Partial<Record<keyof Consignments, any>> {
    return { code: this.code };
  }
}



export class ConsignmentsTakenByPersonnelSpecification extends Specification<Consignments> {
  constructor(private readonly personnelId: number) {
    super();
  }

  isSatisfiedBy(entity: Consignments): boolean {
    if (!entity.personnelConsigneds) return false;

    return entity.personnelConsigneds.some(
      pc => pc.personnel?.id === this.personnelId
    );
  }

  toQuery(qb: SelectQueryBuilder<Consignments>): SelectQueryBuilder<Consignments> {
    return qb
      .innerJoin("Consignments.personnelConsigneds", "pc")
      .where(`pc."PersonnelId" = :pid`, { pid: this.personnelId });
  }

  toWhereClause(): Partial<Record<keyof Consignments, any>> {
    return {}; // Where لازم نیست، چون inner join استفاده شده
  }
}



