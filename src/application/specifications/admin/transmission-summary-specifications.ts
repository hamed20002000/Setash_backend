import { Categories } from 'src/domain/entities/Categories';
import { Menus } from 'src/domain/entities/Menus';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { TransmissionRows } from 'src/domain/entities/TransmissionRows';
import { TransmissionSummary } from 'src/domain/entities/TransmissionSummary';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class TransmissionSummarySpecification extends Specification<TransmissionSummary> {
  constructor(
    private readonly networkId: number,
      // Password is optional for some queries
  ) {
    super();
  }

  isSatisfiedBy(entity: TransmissionSummary): boolean {
    const matchesRole = entity.network?.id === this.networkId;

    return matchesRole;
  }

  toWhereClause(): Partial<Record<keyof TransmissionSummary, any>> {
    const whereClause: Partial<Record<keyof TransmissionSummary, any>> = {};
    if (this.networkId) {
      whereClause.network = { id: this.networkId };
    }
   
    return whereClause;
  }
}





