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
import { StoreReceiptHeaders } from 'src/domain/entities/StoreReceiptHeaders';
import { StoreReceiptRepository } from 'src/infrastructure/repositories/store/receipt.repository';
import { CreateBetweenStoreReceiptDto, CreateStoreReceiptByInvoiceDto, CreateStoreReceiptDto, UpdateBetweenStoreReceiptDto, UpdateStoreReceiptByInvoiceDto, UpdateStoreReceiptDto } from 'src/presentation/dtos/store/receipt-dto';

@Injectable()
export class StoreReceiptService extends BaseService<StoreReceiptHeaders> {
  constructor(

    private readonly receiptRepository: StoreReceiptRepository,
  ) {
    super(receiptRepository);
  }

  async getAllReceipts(): Promise<StoreReceiptHeaders[]> {
    return this.receiptRepository.getAllReceipts();
  }

  async getAllReceiptsWithStoreId(storeId: number): Promise<StoreReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsWithStoreId(storeId);
  }
  async getAllBetweenReceipts(): Promise<StoreReceiptHeaders[]> {
    return this.receiptRepository.getAllBetweenReceipts();
  }
  async getAllReceiptsByInvoice(): Promise<StoreReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsByInvoice();
  }
  async getReceiptById(id: number): Promise<StoreReceiptHeaders> {
    return this.receiptRepository.getReceiptById(id);
  }
  async getBetweenReceiptById(id: number): Promise<StoreReceiptHeaders> {
    return this.receiptRepository.getBetweenReceiptById(id);
  }
  async createReceipt(receiptDto: CreateStoreReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.createReceipt(receiptDto, userId);
  }

  async createReceiptByInvoice(receiptDto: CreateStoreReceiptByInvoiceDto, userId: string): Promise<void> {
    return this.receiptRepository.createReceiptByInvoice(receiptDto, userId);
  }
  async createBetweenReceipt(receiptDto: CreateBetweenStoreReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.createBetweenReceipt(receiptDto, userId);
  }

  async updateReceipt(receiptDto: UpdateStoreReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.updateReceipt(receiptDto, userId);
  }
  async updateReceiptByInvoice(receiptDto: UpdateStoreReceiptByInvoiceDto, userId: string): Promise<void> {
    return this.receiptRepository.updateReceiptByInvoice(receiptDto, userId);
  }

  async updateBetweenReceipt(receiptDto: UpdateBetweenStoreReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.updateBetweenReceipt(receiptDto, userId);
  }
  async deleteReceipt(receiptId: number): Promise<void> {
    return this.receiptRepository.deleteReceipt(receiptId);
  }
}