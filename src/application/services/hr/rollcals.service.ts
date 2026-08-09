import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { RollCallRepository } from 'src/infrastructure/repositories/hr/rollCals.repository';
import { Rollcalls } from 'src/domain/entities/Rollcalls';

@Injectable()
export class RollcallsService extends BaseService<Rollcalls> {
  constructor(

    private readonly itemRepository: RollCallRepository,
  ) {
    super(itemRepository);
  }

  async getRollcalls(
    workhouseId: number,
    fromDate: string,
    toDate: string,
  ) {
    return this.itemRepository.getRollcalls(
      workhouseId,
      fromDate,
      toDate,
    );
  }

}