import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderRepository } from 'src/infrastructure/repositories/admin/tender.repository';
import { TenderListDto, UpdateTenderDto, UpdateTenderHeaderDto } from 'src/presentation/dtos/initial-operations/tender-dto';

@Injectable()
export class TenderService extends BaseService<TenderHeaders> {
  constructor(

    private readonly tenderRepository: TenderRepository,
  ) {
    super(tenderRepository);
  }

  async getAllTenders(): Promise<TenderHeaders[]> {
    return this.tenderRepository.getAllTenders();
  }

  async getTenderById(id: number): Promise<TenderHeaders> {
    return this.tenderRepository.getTenderById(id);
  }

  async updateTenderHeader(tenderDto: UpdateTenderHeaderDto): Promise<void> {
    return this.tenderRepository.updateTenderHeader(tenderDto);
  }
  async updateTender(tenderDto: UpdateTenderDto): Promise<void> {
    return this.tenderRepository.updateTender(tenderDto);
  }

}