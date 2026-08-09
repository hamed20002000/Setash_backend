import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { CarWarehouses } from 'src/domain/entities/CarWarehouses';

@Injectable()
export class CarWarehouseRepository extends BaseRepository<CarWarehouses> {
  constructor(@InjectRepository(CarWarehouses) repository: Repository<CarWarehouses>) {
    super(repository);
  }
  
}
