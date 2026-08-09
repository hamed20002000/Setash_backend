import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { Positions } from 'src/domain/entities/Positions';
import { Personnels } from 'src/domain/entities/Personnels';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeaveHistories } from 'src/domain/entities/LeaveHistories';
import { Requests } from 'src/domain/entities/Requests';
import { RequestStatusHistories } from 'src/domain/entities/RequestStatusHistories';
import { requestStatus } from 'src/domain/enums/requestSatus.enum';

@Injectable()
export class RequestsRepository extends BaseRepository<Requests> {
  constructor(@InjectRepository(Requests) repository: Repository<Requests>, private readonly dataSource: DataSource) {
    super(repository);

  }

  async remove(requestId: number): Promise<void> {

    const result = await this.dataSource.transaction(async (manager: EntityManager) => {
      const request = await manager.getRepository(Requests).findOne({ where: { id: requestId } });
      if (!request) {
        throw new Error('Request not found');
      }
      if (request.status !== requestStatus.PENDING) {
        throw new Error('Only pending requests can be deleted');
      }
      const requestHistory = await manager.getRepository(RequestStatusHistories).find({ where: { request: { id: requestId } } });
      for (const history of requestHistory) {
        await manager.getRepository(RequestStatusHistories).remove(history);
      }
      await manager.getRepository(Requests).remove(request);
    });
  }

}


