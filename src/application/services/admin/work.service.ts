import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderRepository } from 'src/infrastructure/repositories/admin/tender.repository';
import { TenderListDto, UpdateTenderDto } from 'src/presentation/dtos/initial-operations/tender-dto';
import { Works } from 'src/domain/entities/Works';
import { WorkRepository } from 'src/infrastructure/repositories/admin/work.repository';

@Injectable()
export class WorkService extends BaseService<Works> {
  constructor(

    private readonly workRepository: WorkRepository,
  ) {
    super(workRepository);
  }

  async getAllWorks(): Promise<Works[]> {
    return this.workRepository.getAllWorks();
  }

  async getWorkById(id: number): Promise<Works> {
    return this.workRepository.getWorkById(id);
  }
}



