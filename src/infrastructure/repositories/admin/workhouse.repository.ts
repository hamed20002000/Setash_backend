import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';

@Injectable()
export class WorkhouseRepository extends BaseRepository<Workhouses> {
  constructor(@InjectRepository(Workhouses) repository: Repository<Workhouses>) {
    super(repository);
  }
  
}
