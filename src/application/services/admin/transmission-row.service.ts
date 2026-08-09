import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ProductTypes } from 'src/domain/entities/ProductTypes';
import { ProductTypeRepository } from 'src/infrastructure/repositories/admin/product-type.repository';
import { TransmissionRows } from 'src/domain/entities/TransmissionRows';
import { TransmissionRowRepository } from 'src/infrastructure/repositories/admin/transmission-row.repository';
import { CreateTransmissionRowDto } from 'src/presentation/dtos/initial-operations/network-dto';

@Injectable()
export class TransmissionRowService extends BaseService<TransmissionRows> {
    constructor(

        private readonly transmissionRowRepository: TransmissionRowRepository,
    ) {
        super(transmissionRowRepository);
    }
    async createTransmissionRow(dto: CreateTransmissionRowDto[], networkId: number, userId: string): Promise<TransmissionRows[]> {
        return await this.transmissionRowRepository.createTransmissionRow(dto, networkId, userId);
    }

    async updateTransmissionRow(dto: CreateTransmissionRowDto[], networkId: number, userId: string): Promise<TransmissionRows[]> {
        return await this.transmissionRowRepository.updateTransmissionRow(dto, networkId, userId);
    }

    async removeTransmissionRow(networkId: number): Promise<boolean> {
        return await this.transmissionRowRepository.removeTransmissionRow(networkId);
    }
}