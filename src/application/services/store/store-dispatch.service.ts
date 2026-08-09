import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderRepository } from 'src/infrastructure/repositories/admin/tender.repository';
import { TenderListDto, UpdateTenderDto } from 'src/presentation/dtos/initial-operations/tender-dto';
import { OrderHeaders } from 'src/domain/entities/OrderHeaders';
import { OrderRepository } from 'src/infrastructure/repositories/admin/order.repository';
import { CreateOrderDto, UpdateOrderDto } from 'src/presentation/dtos/initial-operations/order-dto';
import { InvoiceHeaders } from 'src/domain/entities/InvoiceHeaders';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/presentation/dtos/sales/invoice.dto';
import { InvoiceRepository } from 'src/infrastructure/repositories/sale/invoice.repository';
import { ReceiptHeaders } from 'src/domain/entities/ReceiptHeaders';
import { CreateReceiptDto, UpdateReceiptDto } from 'src/presentation/dtos/warehouse/receipt-dto';
import { ReceiptRepository } from 'src/infrastructure/repositories/sale/receipt.repository';
import { WarehouseDispatchHeaders } from 'src/domain/entities/WarehouseDispatchHeaders';
import { WarehouseDispatchRepository } from 'src/infrastructure/repositories/warehouse/warehouse-dispatch.repository';
import { CreateBetweenWarehouseDispatchDto, CreateWarehouseDispatchDto, UpdateBetweenWarehouseDispatchDto, UpdateWarehouseDispatchDto } from 'src/presentation/dtos/warehouse/warhouse-dispatch-dto';
import { StoreDispatchHeaders } from 'src/domain/entities/StoreDispatchHeaders';
import { StoreDispatchRepository } from 'src/infrastructure/repositories/store/store-dispatch.repository';
import { CreateBetweenStoreDispatchDto, CreateStoreDispatchDto, CreateStoreDispatchReturnToCenterDto, CreateStoreDispatchToCenterDto, UpdateBetweenStoreDispatchDto, UpdateStoreDispatchDto, UpdateStoreDispatchReturnToCenterDto, UpdateStoreDispatchToCenterDto } from 'src/presentation/dtos/store/store-dispatch-dto';


@Injectable()
export class StoreDispatchService extends BaseService<StoreDispatchHeaders> {
  constructor(

    private readonly storeDispatchRepository: StoreDispatchRepository,
  ) {
    super(storeDispatchRepository);
  }

  async getAllStoreDispatches(storeId:number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatches(storeId);
  }

  async getAllStoreDispatchesToCenter(storeId:number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatchesToCenter(storeId);
  }
   async getAllStoreDispatchesDestructionToCenter(storeId: number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatchesDestructionToCenter(storeId);
  }

  async getAllBetweenStoreDispatches(storeId:number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllBetweenStoreDispatches(storeId);
  }

  async getAllStoreDispatchesByDestinationStoreId(storeId: number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatchesByDestinationStoreId(storeId);
  }

  async getAllStoreDispatchesByProjectId(projectId: number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatchesByProjectId(projectId);
  }

  async getAllStoreDispatchesByCenterId(centerId: number): Promise<StoreDispatchHeaders[]> {
    return this.storeDispatchRepository.getAllStoreDispatchesByCenterId(centerId);
  }


  async getStoreDispatchById(id: number): Promise<StoreDispatchHeaders> {
    return this.storeDispatchRepository.getStoreDispatchById(id);
  }

  async getStoreDispatchToCenterById(id: number): Promise<StoreDispatchHeaders> {
    return this.storeDispatchRepository.getStoreDispatchToCenterById(id);
  }

  async getBetweenStoreDispatchById(id: number): Promise<StoreDispatchHeaders> {
    return this.storeDispatchRepository.getBetweenStoreDispatchById(id);
  }
  async createStoreDispatch(storeDispatchDto: CreateStoreDispatchDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.createStoreDispatch(storeDispatchDto, userId);
  }

  async createStoreDispatchToCenter(storeDispatchDto: CreateStoreDispatchToCenterDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.createStoreDispatchToCenter(storeDispatchDto, userId);
  }

  async createStoreDispatchReturnToCenter(storeDispatchDto: CreateStoreDispatchReturnToCenterDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.createStoreDispatchReturnToCenter(storeDispatchDto, userId);
  }

  async createBetweenStoreDispatch(storeDispatchDto: CreateBetweenStoreDispatchDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.createBetweenStoreDispatch(storeDispatchDto, userId);
  }

  async updateStoreDispatch(storeDispatchDto: UpdateStoreDispatchDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.updateStoreDispatch(storeDispatchDto, userId);
  }

  async updateStoreDispatchToCenter(storeDispatchDto: UpdateStoreDispatchToCenterDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.updateStoreDispatchToCenter(storeDispatchDto, userId);
  }

  async updateStoreDispatchReturnToCenter(storeDispatchDto: UpdateStoreDispatchReturnToCenterDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.updateStoreDispatchReturnToCenter(storeDispatchDto, userId);
  }

  async updateBetweenStoreDispatch(storeDispatchDto: UpdateBetweenStoreDispatchDto, userId: string): Promise<void> {
    return this.storeDispatchRepository.updateBetweenStoreDispatch(storeDispatchDto, userId);
  }
  async deleteStoreDispatch(storeDispatchId: number): Promise<void> {
    return this.storeDispatchRepository.deleteStoreDispatch(storeDispatchId);
  }
}