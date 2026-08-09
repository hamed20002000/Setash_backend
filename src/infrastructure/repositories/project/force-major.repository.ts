import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Drivers } from 'src/domain/entities/Drivers';
import { ProjectFirms } from 'src/domain/entities/ProjectFirms';
import { ForceMajors } from 'src/domain/entities/ForceMajors';

@Injectable()
export class ForceMajorsRepository extends BaseRepository<ForceMajors> {
  constructor(@InjectRepository(ForceMajors) repository: Repository<ForceMajors>) {
    super(repository);
  }
  
}
