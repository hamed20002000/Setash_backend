import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { Items } from 'src/domain/entities/Items';
import { ItemRepository } from 'src/infrastructure/repositories/admin/item.repository';
import { Positions } from 'src/domain/entities/Positions';
import { PositionRepository } from 'src/infrastructure/repositories/hr/position.repository';

@Injectable()
export class PositionService extends BaseService<Positions> {
  constructor(

    private readonly itemRepository: PositionRepository,
  ) {
    super(itemRepository);
  }

}