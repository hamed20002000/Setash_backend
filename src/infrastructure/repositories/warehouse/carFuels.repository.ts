import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { CarWarehouses } from 'src/domain/entities/CarWarehouses';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { CarFuels } from 'src/domain/entities/CarFuels';

@Injectable()
export class CarFuelRepository extends BaseRepository<CarFuels> {
  constructor(@InjectRepository(CarFuels) repository: Repository<CarFuels>) {
    super(repository);
  }
  
}
