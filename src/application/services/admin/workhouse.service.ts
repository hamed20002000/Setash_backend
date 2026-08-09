import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';

@Injectable()
export class WorkhouseService extends BaseService<Workhouses> {
  constructor(

    private readonly workhouseRepository: WorkhouseRepository,
  ) {
    super(workhouseRepository);
  } 
 
}