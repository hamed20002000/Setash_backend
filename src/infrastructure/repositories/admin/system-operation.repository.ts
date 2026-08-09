import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';

@Injectable()
export class SystemOperationRepository extends BaseRepository<SystemOperations> {
  constructor(@InjectRepository(SystemOperations) repository: Repository<SystemOperations>) {
    super(repository);
  }

    async getSpecialOperationWithName(names:string[]): Promise<SystemOperations[]> {
  
          return this.repository.find({
              where:(()=>names.map(name => ({ name })))(),
          })
    }
  
}
