import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { ConfirmationReportCommiteMemberAnswer } from 'src/domain/entities/ConfirmationReportCommiteMemberAnswer';

@Injectable()
export class ConfirmationReportCommiteMemberAnswerRepository extends BaseRepository<ConfirmationReportCommiteMemberAnswer> {
  constructor(@InjectRepository(ConfirmationReportCommiteMemberAnswer) repository: Repository<ConfirmationReportCommiteMemberAnswer>) {
    super(repository);
  }
}