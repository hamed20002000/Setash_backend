import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { ConfirmationReportCommiteMemberAnswer } from 'src/domain/entities/ConfirmationReportCommiteMemberAnswer';
import { ConfirmationReportCommiteMemberAnswerRepository } from 'src/infrastructure/repositories/report/confirmationReportCommiteMemberAnswer.repository';

@Injectable()
export class ConfirmationReportCommiteMemberAnswerService extends BaseService<ConfirmationReportCommiteMemberAnswer> {
  constructor(

    private readonly itemRepository: ConfirmationReportCommiteMemberAnswerRepository,
  ) {
    super(itemRepository);
  }

}