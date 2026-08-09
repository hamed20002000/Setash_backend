import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Teachers } from 'src/domain/entities/Teachers';

@Injectable()
export class TeacherRepository extends BaseRepository<Teachers> {
  constructor(@InjectRepository(Teachers) repository: Repository<Teachers>) {
    super(repository);
  }  
}
