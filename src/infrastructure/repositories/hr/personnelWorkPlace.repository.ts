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
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';

@Injectable()
export class PersonnelWorkPlacesRepository extends BaseRepository<PersonnelWorkPlaces> {
  constructor(@InjectRepository(PersonnelWorkPlaces) repository: Repository<PersonnelWorkPlaces>) {
    super(repository);
  }

 
  
}
