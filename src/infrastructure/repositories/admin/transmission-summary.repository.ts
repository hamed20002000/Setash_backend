import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { TransmissionSummary } from 'src/domain/entities/TransmissionSummary';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Items } from 'src/domain/entities/Items';
import { Networks } from 'src/domain/entities/Networks';
import { CreateNetworkTransmissionSummaryDto } from 'src/presentation/dtos/initial-operations/network-dto';
import { Users } from 'src/domain/entities/Users';

@Injectable()
export class TransmissionSummaryRepository extends BaseRepository<TransmissionSummary> {
    constructor(@InjectRepository(TransmissionSummary) repository: Repository<TransmissionSummary>) {
        super(repository);
    }

    async updateTransmissionSummaries(transmissionSummaryDto: CreateNetworkTransmissionSummaryDto, checkUser: Users): Promise<void> {
        // دریافت خلاصه‌های قبلی
        // دریافت خلاصه‌های قبلی
        const oldSummaries = await this.repository.find({
            where: { network: { id: transmissionSummaryDto.networkId } }
        });

        // اجرای عملیات به صورت تراکنش
        await this.repository.manager.transaction(async (entityManager) => {
            // حذف خلاصه‌های قبلی
            if (oldSummaries && oldSummaries.length > 0) {
                for (const summary of oldSummaries) {
                    await entityManager.delete(TransmissionSummary, summary.id);
                }
            }

            // ساخت خلاصه‌های جدید
            const transmissionSummaries = transmissionSummaryDto.transmissionSummaries.map((summaryDto) => {
                const transmissionSummary = new TransmissionSummary();
                transmissionSummary.weight = summaryDto.weight;
                transmissionSummary.length = summaryDto.length;
                transmissionSummary.item = { id: summaryDto.itemId } as Items;
                transmissionSummary.productStatus = summaryDto.productStatus;
                transmissionSummary.dMMPercent = summaryDto.dMMPercent;
                transmissionSummary.totalWeight = summaryDto.totalWeight;
                transmissionSummary.network = { id: transmissionSummaryDto.networkId } as Networks;
                transmissionSummary.createAt = new Date();
                transmissionSummary.recordStatus = recordStatus.Active;
                transmissionSummary.user = checkUser;
                return transmissionSummary;
            });

            await entityManager.save(TransmissionSummary, transmissionSummaries);
        });
    }

    async deleteTransmissionSummaries(networkId: number): Promise<boolean> {
       
        const oldSummaries = await this.repository.find({
            where: { network: { id: networkId } }
        });

        // اجرای عملیات به صورت تراکنش
        await this.repository.manager.transaction(async (entityManager) => {
            // حذف خلاصه‌های قبلی
            if (oldSummaries && oldSummaries.length > 0) {
                for (const summary of oldSummaries) {
                    await entityManager.delete(TransmissionSummary, summary.id);
                }
            }


        });

        return true;
    }

}
