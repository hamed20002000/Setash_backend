import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseRepository } from 'src/infrastructure/repositories/admin/workhouse.repository';
import { Providers } from 'src/domain/entities/Providers';
import { ProviderRepository } from 'src/infrastructure/repositories/admin/provider.repository';

@Injectable()
export class ProviderService extends BaseService<Providers> {
  constructor(

    private readonly providerRepository: ProviderRepository,
  ) {
    super(providerRepository);
  } 
 
}