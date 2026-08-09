import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { WorkhouseDetailsRepository } from 'src/infrastructure/repositories/admin/workhouse-detail.repository';

@Injectable()
export class WorkhouseDetailService extends BaseService<WorkhouseDetails> {
  constructor(

    private readonly workhouseDetailsRepository: WorkhouseDetailsRepository,
  ) {
    super(workhouseDetailsRepository);
  } 
 
}