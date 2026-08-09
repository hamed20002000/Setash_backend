import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Teachers } from 'src/domain/entities/Teachers';
import { Courses } from 'src/domain/entities/Courses';

@Injectable()
export class CourseRepository extends BaseRepository<Courses> {
  constructor(@InjectRepository(Courses) repository: Repository<Courses>) {
    super(repository);
  }  
}
