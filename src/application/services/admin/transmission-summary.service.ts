import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { TransmissionSummary } from 'src/domain/entities/TransmissionSummary';
import { TransmissionSummaryRepository } from 'src/infrastructure/repositories/admin/transmission-summary.repository';
import { CreateNetworkTransmissionSummaryDto } from 'src/presentation/dtos/initial-operations/network-dto';

@Injectable()
export class TransmissionSummaryService extends BaseService<TransmissionSummary> {
    constructor(

        private readonly transmissionSummaryRepository: TransmissionSummaryRepository,
    ) {
        super(transmissionSummaryRepository);
    }
    async updateTransmissionSummaries(transmissionSummaryDto: CreateNetworkTransmissionSummaryDto, checkUser: any): Promise<void> {
        return await this.transmissionSummaryRepository.updateTransmissionSummaries(transmissionSummaryDto, checkUser);
    }

    async deleteTransmissionSummaries(networkId: number): Promise<boolean> {
        return await this.transmissionSummaryRepository.deleteTransmissionSummaries(networkId);

    }
}