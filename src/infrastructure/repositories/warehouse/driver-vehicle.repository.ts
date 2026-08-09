import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';

@Injectable()
export class DriverVehicleRepository extends BaseRepository<DriverVehicles> {
  constructor(@InjectRepository(DriverVehicles) repository: Repository<DriverVehicles>) {
    super(repository);
  }
  
}
