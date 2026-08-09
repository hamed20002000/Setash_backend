import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource,  Repository } from 'typeorm';
import { CommiteMembers } from 'src/domain/entities/CommiteMembers';

@Injectable()
export class CommiteMembersRepository extends BaseRepository<CommiteMembers> {
  constructor(@InjectRepository(CommiteMembers) repository: Repository<CommiteMembers>, private readonly dataSource: DataSource) {
    super(repository);
  } 
}