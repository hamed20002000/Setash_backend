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
import { StoreDispatchHeaderStatusHistories } from 'src/domain/entities/StoreDispatchHeaderStatusHistories';

@Injectable()
export class StoreDispatchHeaderStatusHistoriesRepository extends BaseRepository<StoreDispatchHeaderStatusHistories> {
  constructor(@InjectRepository(StoreDispatchHeaderStatusHistories) repository: Repository<StoreDispatchHeaderStatusHistories>) {
    super(repository);
  }
  
}
