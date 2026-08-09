import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { ConfirmationReportCommiteMember } from 'src/domain/entities/ConfirmationReportCommiteMember';
import { ConfirmationReportCommiteMemberRepository } from 'src/infrastructure/repositories/report/confirmationReportCommiteMember.repository';

@Injectable()
export class ConfirmationReportCommiteMemberService extends BaseService<ConfirmationReportCommiteMember> {
  constructor(

    private readonly itemRepository: ConfirmationReportCommiteMemberRepository,
  ) {
    super(itemRepository);
  }

}