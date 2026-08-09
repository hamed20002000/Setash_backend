import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Rollcalls } from 'src/domain/entities/Rollcalls';
import { PersonnelSalary } from 'src/domain/entities/PersonnelSalary';

@Injectable()
export class PersonnelSalaryRepository extends BaseRepository<PersonnelSalary> {
  constructor(@InjectRepository(PersonnelSalary) repository: Repository<PersonnelSalary>) {
    super(repository);
  }

}
