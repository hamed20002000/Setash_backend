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
import { CreateInvoiceDto, CreateInvoiceForWorkhouseDto, UpdateInvoiceDto, UpdateInvoiceWorkhouseDto } from 'src/presentation/dtos/sales/invoice.dto';
import { InvoiceRepository } from 'src/infrastructure/repositories/sale/invoice.repository';

@Injectable()
export class InvoiceService extends BaseService<InvoiceHeaders> {
  constructor(

    private readonly invoiceRepository: InvoiceRepository,
  ) {
    super(invoiceRepository);
  }

  async getAllInvoices(): Promise<InvoiceHeaders[]> {
    return this.invoiceRepository.getAllInvoices();
  }
  async getAllInvoicesByWarehouseId(warehouseId: number): Promise<InvoiceHeaders[]> {
    return this.invoiceRepository.getAllInvoicesByWarehouseId(warehouseId);
  }

  async getAllInvoicesByWorkhouseId(storeId: number): Promise<InvoiceHeaders[]> {
    return this.invoiceRepository.getAllInvoicesByWorkhouseId(storeId);
  }
  async getInvoiceById(id: number): Promise<InvoiceHeaders> {
    return this.invoiceRepository.getInvoiceById(id);
  }
  async createInvoice(invoiceDto: CreateInvoiceDto, userId: string): Promise<void> {
    return this.invoiceRepository.createInvoice(invoiceDto, userId);
  }
 async createInvoiceForStore(invoiceDto: CreateInvoiceForWorkhouseDto, userId: string): Promise<void> {
    return this.invoiceRepository.createInvoiceForStore(invoiceDto, userId);
 }
  async updateInvoice(invoiceDto: UpdateInvoiceDto, userId: string): Promise<void> {
    return this.invoiceRepository.updateInvoice(invoiceDto, userId);
  }

   async updateInvoiceForStore(invoiceDto: UpdateInvoiceWorkhouseDto, userId: string): Promise<void> {
    return this.invoiceRepository.updateInvoiceForStore(invoiceDto, userId);
   }
  async deleteInvoice(invoiceId: number): Promise<void> {
    return this.invoiceRepository.deleteInvoice(invoiceId);
  }
}