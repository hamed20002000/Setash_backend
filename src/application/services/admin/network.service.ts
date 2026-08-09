import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderRepository } from 'src/infrastructure/repositories/admin/tender.repository';
import { TenderListDto, UpdateTenderDto } from 'src/presentation/dtos/initial-operations/tender-dto';
import { Networks } from 'src/domain/entities/Networks';
import { NetworkRepository } from 'src/infrastructure/repositories/admin/network.repository';
import { UpdateNetworkDto } from 'src/presentation/dtos/initial-operations/network-dto';

@Injectable()
export class NetworkService extends BaseService<Networks> {
  constructor(

    private readonly networkRepository: NetworkRepository,
  ) {
    super(networkRepository);
  }

  async getAllNetworks(): Promise<Networks[]> {
    return this.networkRepository.getAllNetworks();
  }

  async getNetworkById(id: number): Promise<Networks> {
    return this.networkRepository.getNetworkById(id);
  }
  async getNetworkByWorkId(workId: number): Promise<Networks> {
    return this.networkRepository.getNetworkByWorkId(workId);
  }
  async getTransmissionRowByNetworkId(id: number): Promise<Networks> {
    return this.networkRepository.getTransmissionRowByNetworkId(id);
  }
  async updateNetwork(networkDto: UpdateNetworkDto): Promise<void> {
    return this.networkRepository.updateNetwork(networkDto);
  }

  async deleteNetwork(id: number): Promise<void> {
    return this.networkRepository.deleteNetwork(id);
  }

}