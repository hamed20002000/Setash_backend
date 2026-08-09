import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Teachers } from 'src/domain/entities/Teachers';
import { Courses } from 'src/domain/entities/Courses';
import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';

@Injectable()
export class CourseDateTimeRepository extends BaseRepository<CourseDateTimes> {
  constructor(@InjectRepository(CourseDateTimes) repository: Repository<CourseDateTimes>) {
    super(repository);
  }  
}
