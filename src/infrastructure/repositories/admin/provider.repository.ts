import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';

@Injectable()
export class ProviderRepository extends BaseRepository<Providers> {
  constructor(@InjectRepository(Providers) repository: Repository<Providers>) {
    super(repository);
  }
  
}
