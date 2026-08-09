import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { ConfirmationReportCommiteMember } from 'src/domain/entities/ConfirmationReportCommiteMember';

@Injectable()
export class ConfirmationReportCommiteMemberRepository extends BaseRepository<ConfirmationReportCommiteMember> {
  constructor(@InjectRepository(ConfirmationReportCommiteMember) repository: Repository<ConfirmationReportCommiteMember>) {
    super(repository);
  } 
}