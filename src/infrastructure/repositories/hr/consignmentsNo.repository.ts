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
import { LeaveDaysDto } from 'src/presentation/dtos/hr/leaves-dto';
import { leaveType } from 'src/domain/enums/leaveType.enum';
import { Consignments } from 'src/domain/entities/Consignments';
import { ConsignmentNos } from 'src/domain/entities/ConsignmentNos';
import { ReceiptNos } from 'src/domain/entities/ReceiptNos';
import { Users } from 'src/domain/entities/Users';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';

@Injectable()
export class ConsignmentNosRepository extends BaseRepository<ConsignmentNos> {
  constructor(@InjectRepository(ConsignmentNos) repository: Repository<ConsignmentNos>, private readonly dataSource: DataSource) {
    super(repository);
  }



  public async getLatestNo(userId: string): Promise<string> {
    var result="000000";
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const dbResult = await manager.getRepository(ConsignmentNos)
        .createQueryBuilder("consignmentNos")
        .select("MAX(consignmentNos.no)", "max")
        .getRawOne();

      const nextNo = dbResult?.max ? Number(dbResult.max) + 1 : 1;
      var conNo = new ConsignmentNos();
      conNo.no = nextNo;
      conNo.createAt = new Date();
      conNo.recordStatus = recordStatus.Active;
      conNo.user = { id: userId } as Users;
      await manager.getRepository(ConsignmentNos).save(conNo);
      result = nextNo.toString().padStart(6, '0');
    });
    return result;
  }


}