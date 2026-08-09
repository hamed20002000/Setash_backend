import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { Positions } from 'src/domain/entities/Positions';

@Injectable()
export class PositionRepository extends BaseRepository<Positions> {
  constructor(@InjectRepository(Positions) repository: Repository<Positions>) {
    super(repository);
  }
  
}
