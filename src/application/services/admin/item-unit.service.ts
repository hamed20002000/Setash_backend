import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';

@Injectable()
export class ItemUnitService extends BaseService<ItemUnits> {
  constructor(

    private readonly itemUnitRepository: ItemUnitRepository,
  ) {
    super(itemUnitRepository);
  }

}