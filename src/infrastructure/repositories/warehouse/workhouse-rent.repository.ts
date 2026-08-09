import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { WorkhouseRents } from 'src/domain/entities/WorkhouseRents';
import { WorkhouseRentStatusHistories } from 'src/domain/entities/WorkkhouseRentStatusHistories';
import { workhouseRentStatus } from 'src/domain/enums/workhouseRentStatus.enum';

@Injectable()
export class WorkhouseRentsRepository extends BaseRepository<WorkhouseRents> {
  constructor(@InjectRepository(WorkhouseRents) repository: Repository<WorkhouseRents>, private dataSource: DataSource) {
    super(repository);
  }

    async deleteWorkhouseRent(workhouseRentId: number): Promise<void> {
       await this.dataSource.transaction(async (manager: EntityManager) => {
         const workhouseRent = await manager.getRepository(WorkhouseRents).findOne({
           where: { id: workhouseRentId },
           relations: ['workhouseRentStatusHistories'],
         });

         if(workhouseRent.status !== workhouseRentStatus.Pending) throw new NotFoundException('Only pending workhouse rents can be deleted');

         if (!workhouseRent) throw new NotFoundException('Workhouse Rent not found');
         await manager.getRepository(WorkhouseRentStatusHistories).delete({
           workhouseRent: { id: workhouseRent.id },
         });
    

         await manager.getRepository(WorkhouseRents).delete(workhouseRent.id);
       });
     }
  
}
