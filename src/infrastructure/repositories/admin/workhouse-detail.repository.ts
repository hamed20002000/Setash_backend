import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';

@Injectable()
export class WorkhouseDetailsRepository extends BaseRepository<WorkhouseDetails> {
  constructor(@InjectRepository(WorkhouseDetails) repository: Repository<WorkhouseDetails>) {
    super(repository);
  }
  
}
