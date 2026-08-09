import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';



@Injectable()
export class RoleMenuOperationRepository extends BaseRepository<RoleMenuOperations> {
  constructor(@InjectRepository(RoleMenuOperations) repository: Repository<RoleMenuOperations>) {
    super(repository);
  }
async deleteByRoleId(roleId: number): Promise<void> {
    await this.repository.delete({ role: { id: roleId } });
  }


}
