import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderListDto } from 'src/presentation/dtos/initial-operations/tender-dto';
import { plainToInstance } from 'class-transformer';
import { TenderDetails } from 'src/domain/entities/TenderDetails';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';

@Injectable()
export class OrderHeaderStatusHistoriesRepository extends BaseRepository<OrderHeaderStatusHistories> {
  constructor(@InjectRepository(OrderHeaderStatusHistories) repository: Repository<OrderHeaderStatusHistories>) {
    super(repository);
  }

}
