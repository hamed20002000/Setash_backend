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
import { CreateBetweenWarehouseDispatchDto, CreateWarehouseDispatchDestructionDto, CreateWarehouseDispatchDto, UpdateBetweenWarehouseDispatchDto, UpdateWarehouseDispatchDestructionDto, UpdateWarehouseDispatchDto } from 'src/presentation/dtos/warehouse/warhouse-dispatch-dto';

@Injectable()
export class WarehouseDispatchService extends BaseService<WarehouseDispatchHeaders> {
  constructor(

    private readonly warehouseDispatchRepository: WarehouseDispatchRepository,
  ) {
    super(warehouseDispatchRepository);
  }

  async getAllWarehouseDispatches(warehouseId:number): Promise<WarehouseDispatchHeaders[]> {
    return this.warehouseDispatchRepository.getAllWarehouseDispatches(warehouseId);
  }
 async getAllWarehouseDispatchesDestruction(warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
   return this.warehouseDispatchRepository.getAllWarehouseDispatchesDestruction(warehouseId);
 }
  async getAllBetweenWarehouseDispatches(warehouseId:number): Promise<WarehouseDispatchHeaders[]> {
    return this.warehouseDispatchRepository.getAllBetweenWarehouseDispatches(warehouseId);
  }

  async getAllWarehouseDispatchesByDestinationWarehouseId(warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    return this.warehouseDispatchRepository.getAllWarehouseDispatchesByDestinationWarehouseId(warehouseId);
  }

  async getAllWarehouseDispatchesByWorkhouseId(workhouseId: number): Promise<WarehouseDispatchHeaders[]> {
    return this.warehouseDispatchRepository.getAllWarehouseDispatchesByWorkhouseId(workhouseId);
  }

  async getWarehouseDispatchById(id: number): Promise<WarehouseDispatchHeaders> {
    return this.warehouseDispatchRepository.getWarehouseDispatchById(id);
  }

  async getBetweenWarehouseDispatchById(id: number): Promise<WarehouseDispatchHeaders> {
    return this.warehouseDispatchRepository.getBetweenWarehouseDispatchById(id);
  }
  async createWarehouseDispatch(warehouseDispatchDto: CreateWarehouseDispatchDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.createWarehouseDispatch(warehouseDispatchDto, userId);
  }

   async createWarehouseDispatchDestruction(warehouseDispatchDto: CreateWarehouseDispatchDestructionDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.createWarehouseDispatchDestruction(warehouseDispatchDto, userId);
  
   }

  async createBetweenWarehouseDispatch(warehouseDispatchDto: CreateBetweenWarehouseDispatchDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.createBetweenWarehouseDispatch(warehouseDispatchDto, userId);
  }

  async updateWarehouseDispatch(warehouseDispatchDto: UpdateWarehouseDispatchDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.updateWarehouseDispatch(warehouseDispatchDto, userId);
  }

   async updateWarehouseDispatchDestruction(warehouseDispatchDto: UpdateWarehouseDispatchDestructionDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.updateWarehouseDispatchDestruction(warehouseDispatchDto, userId);

   }

  async updateBetweenWarehouseDispatch(warehouseDispatchDto: UpdateBetweenWarehouseDispatchDto, userId: string): Promise<void> {
    return this.warehouseDispatchRepository.updateBetweenWarehouseDispatch(warehouseDispatchDto, userId);
  }
  async deleteWarehouseDispatch(warehouseDispatchId: number): Promise<void> {
    return this.warehouseDispatchRepository.deleteWarehouseDispatch(warehouseDispatchId);
  }
}