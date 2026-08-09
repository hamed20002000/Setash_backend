import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ProductTypes } from 'src/domain/entities/ProductTypes';
import { TransmissionRows } from 'src/domain/entities/TransmissionRows';
import { CreateTransmissionRowDto, CreateTransmissionRowItmesDto } from 'src/presentation/dtos/initial-operations/network-dto';
import { TransmissionRowItmes } from 'src/domain/entities/TransmissionRowItmes';
import { Users } from 'src/domain/entities/Users';
import { ChannelRows } from 'src/domain/entities/ChannelRows';
import { Items } from 'src/domain/entities/Items';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { transmissionProductStatus } from 'src/domain/enums/channelrow-product-status.enum';
import { InjectRepository as InjectTypeOrmRepository } from '@nestjs/typeorm';
import { Networks } from 'src/domain/entities/Networks';
import { NetworkRepository } from './network.repository';



@Injectable()
export class TransmissionRowRepository extends BaseRepository<TransmissionRows> {
    constructor(
        @InjectRepository(TransmissionRows) repository: Repository<TransmissionRows>,
        @InjectTypeOrmRepository(TransmissionRowItmes) private readonly transmissionRowItmesRepository: Repository<TransmissionRowItmes>,

    ) {
        super(repository);
    }
    async createTransmissionRow(dto: CreateTransmissionRowDto[], networkId: number, userId: string): Promise<TransmissionRows[]> {
        const transmissionRows: TransmissionRows[] = [];
        for (const item of dto) {
            const transmissionRow = new TransmissionRows();
            transmissionRow.distance = item.distance;
            transmissionRow.productStatus = item.productStatus
            transmissionRow.formulaTitle = item.formulaTitle;
            transmissionRow.network = { id: networkId } as Networks;
            transmissionRow.fromProductType = { id: item.fromProductTypeId } as ChannelRows;
            transmissionRow.toProductType = { id: item.toProductTypeId } as ChannelRows;
            transmissionRow.createAt = new Date();
            transmissionRow.user = { id: userId } as Users;
            transmissionRow.recordStatus = recordStatus.Active;
            // Set transmissionRowItmes if provided
            if (item.transmissionRowItmes && Array.isArray(item.transmissionRowItmes)) {
                transmissionRow.transmissionRowItmes = [];
                for (const itmeDto of item.transmissionRowItmes) {
                    const itme = new TransmissionRowItmes();
                    itme.value = itmeDto.value;
                    itme.item = { id: itmeDto.itemId } as Items;
                    itme.createAt = new Date();
                    itme.user = { id: userId } as Users;
                    itme.recordStatus = recordStatus.Active;
                    await this.transmissionRowItmesRepository.save(itme);
                    transmissionRow.transmissionRowItmes.push(itme);
                }
            }

            transmissionRows.push(transmissionRow);
        }
        return await this.repository.save(transmissionRows);
    }

    async updateTransmissionRow(dto: CreateTransmissionRowDto[], networkId: number, userId: string): Promise<TransmissionRows[]> {

        // Remove existing TransmissionRows and their TransmissionRowItmes for the given network
        const existingRows = await this.repository.find({
            where: { network: { id: networkId } },
            relations: ['transmissionRowItmes'],
        });
        for (const row of existingRows) {
            if (row.transmissionRowItmes && row.transmissionRowItmes.length > 0) {
                for (const item of row.transmissionRowItmes) {
                    await this.transmissionRowItmesRepository.remove(item);
                }
            }
            await this.repository.remove(row);
        }
         const transmissionRows: TransmissionRows[] = [];
        for (const item of dto) {
            const transmissionRow = new TransmissionRows();
            transmissionRow.distance = item.distance;
            transmissionRow.productStatus = item.productStatus
            transmissionRow.formulaTitle = item.formulaTitle;
            transmissionRow.network = { id: networkId } as Networks;
            transmissionRow.fromProductType = { id: item.fromProductTypeId } as ChannelRows;
            transmissionRow.toProductType = { id: item.toProductTypeId } as ChannelRows;
            transmissionRow.createAt = new Date();
            transmissionRow.user = { id: userId } as Users;
            transmissionRow.recordStatus = recordStatus.Active;
            // Set transmissionRowItmes if provided
            if (item.transmissionRowItmes && Array.isArray(item.transmissionRowItmes)) {
                transmissionRow.transmissionRowItmes = [];
                for (const itmeDto of item.transmissionRowItmes) {
                    const itme = new TransmissionRowItmes();
                    itme.value = itmeDto.value;
                    itme.item = { id: itmeDto.itemId } as Items;
                    itme.createAt = new Date();
                    itme.user = { id: userId } as Users;
                    itme.recordStatus = recordStatus.Active;
                    await this.transmissionRowItmesRepository.save(itme);
                    transmissionRow.transmissionRowItmes.push(itme);
                }
            }

            transmissionRows.push(transmissionRow);
        }
        return await this.repository.save(transmissionRows);
    }

    async removeTransmissionRow(networkId: number): Promise<boolean> {

        // Remove existing TransmissionRows and their TransmissionRowItmes for the given network
        const existingRows = await this.repository.find({
            where: { network: { id: networkId } },
            relations: ['transmissionRowItmes'],
        });
        for (const row of existingRows) {
            if (row.transmissionRowItmes && row.transmissionRowItmes.length > 0) {
                for (const item of row.transmissionRowItmes) {
                    await this.transmissionRowItmesRepository.remove(item);
                }
            }
            await this.repository.remove(row);
        }

        return true;
    }

}
