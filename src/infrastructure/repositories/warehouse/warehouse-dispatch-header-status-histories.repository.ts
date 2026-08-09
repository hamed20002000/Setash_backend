import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';

@Injectable()
export class WarehouseDispatchHeaderStatusHistoriesRepository extends BaseRepository<WarehouseDispatchHeaderStatusHistories> {
  constructor(@InjectRepository(WarehouseDispatchHeaderStatusHistories) repository: Repository<WarehouseDispatchHeaderStatusHistories>) {
    super(repository);
  }
  
}
