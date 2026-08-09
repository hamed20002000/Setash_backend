import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { MenuOperations } from 'src/domain/entities/MenuOperations';
import { MenuOperationRepository } from 'src/infrastructure/repositories/admin/menu-operation.repository';


@Injectable()
export class MenuOperationService extends BaseService<MenuOperations> {
  constructor(

    private readonly menuOperationRepository: MenuOperationRepository,
  ) {
    super(menuOperationRepository);
  } 
 
}