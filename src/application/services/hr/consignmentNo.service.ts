import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Consignments } from 'src/domain/entities/Consignments';
import { ConsignmentsRepository } from 'src/infrastructure/repositories/hr/consignments.repository';
import { ConsignmentNos } from 'src/domain/entities/ConsignmentNos';
import { ConsignmentNosRepository } from 'src/infrastructure/repositories/hr/consignmentsNo.repository';

@Injectable()
export class ConsignmentNosService extends BaseService<ConsignmentNos> {
  constructor(

    private readonly itemRepository: ConsignmentNosRepository,
  ) {
    super(itemRepository);
  }

   public async getLatestNo(userId: string): Promise<string> {
    return this.itemRepository.getLatestNo(userId);
  }

}