import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { Roles } from 'src/domain/entities/Roles';
import { StoreDispatchHeaderStatusHistories } from 'src/domain/entities/StoreDispatchHeaderStatusHistories';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class SystemNotificationByRoleSpecification extends Specification<SystemNotifications> {
  constructor(
    private readonly role: string,
    private readonly recordStatusFilter: recordStatus = recordStatus.Active
  ) {
    super();
  }

  isSatisfiedBy(entity: SystemNotifications): boolean {
    return entity.role === this.role && entity.recordStatus === this.recordStatusFilter;
  }

  toWhereClause(): Partial<Record<keyof SystemNotifications, any>> {
    return { role: this.role, recordStatus: this.recordStatusFilter };
  }
}

export class SystemNotificationByForUpdateSpecification extends Specification<SystemNotifications> {
  constructor(
    private readonly role: string,
    private readonly recordStatusFilter: recordStatus = recordStatus.Inactive,
    private readonly typeFilter: string = '',
    private readonly idValues: string
  ) {
    super();
  }

  isSatisfiedBy(entity: SystemNotifications): boolean {
    return entity.role === this.role && entity.recordStatus === this.recordStatusFilter && entity.type === this.typeFilter && entity.idValue === this.idValues;
  }

  toWhereClause(): Partial<Record<keyof SystemNotifications, any>> {
    return { role: this.role, recordStatus: this.recordStatusFilter, type: this.typeFilter, idValue: this.idValues };
  }
}

export class SystemNotificationByForAllUpdateSpecification extends Specification<SystemNotifications> {
  constructor(
    private readonly role: string,
    private readonly recordStatusFilter: recordStatus = recordStatus.Inactive,
    private readonly typeFilter: string = '',
    
  ) {
    super();
  }

  isSatisfiedBy(entity: SystemNotifications): boolean {
    return entity.role === this.role && entity.recordStatus === this.recordStatusFilter && entity.type === this.typeFilter;
  }

  toWhereClause(): Partial<Record<keyof SystemNotifications, any>> {
    return { role: this.role, recordStatus: this.recordStatusFilter, type: this.typeFilter };
  }
}





