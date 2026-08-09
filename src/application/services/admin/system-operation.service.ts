import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';

@Injectable()
export class SystemOperationService extends BaseService<SystemOperations> {
  constructor(

    private readonly systemOperationRepository: SystemOperationRepository,
  ) {
    super(systemOperationRepository);
  } 
 
}