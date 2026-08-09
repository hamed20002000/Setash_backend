import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { ConfirmationProjectReport } from 'src/domain/entities/ConfirmationProjectReport';
import { ConfirmationProjectReportRepository } from 'src/infrastructure/repositories/report/confirmationProjectReport.repository';

@Injectable()
export class ConfirmationProjectReportService extends BaseService<ConfirmationProjectReport> {
  constructor(

    private readonly itemRepository: ConfirmationProjectReportRepository,
  ) {
    super(itemRepository);
  }
  async getProjectsReport() {
    return this.itemRepository.getProjectsReport();
  }
   async getProjectsMemberConfirmCountReport() {
    return this.itemRepository.getProjectsMemberConfirmCountReport();
  }
}