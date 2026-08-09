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
import { CreateBetweenReceiptDto, CreateReceiptDto, CreateReceiptForSendedFromStoreDto, UpdateBetweenReceiptDto, UpdateReceiptDto, UpdateReceiptForSendedFromStoreDto } from 'src/presentation/dtos/warehouse/receipt-dto';
import { ReceiptRepository } from 'src/infrastructure/repositories/sale/receipt.repository';

@Injectable()
export class ReceiptService extends BaseService<ReceiptHeaders> {
  constructor(

    private readonly receiptRepository: ReceiptRepository,
  ) {
    super(receiptRepository);
  }

  async getAllReceipts(): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllReceipts();
  }
  async getAllReceiptsSendedFromStore(): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsSendedFromStore();
  }
  async getAllReceiptsDestructionSendedFromStore(): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsDestructionSendedFromStore();
  }
  async getAllBetweenReceipts(): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllBetweenReceipts();
  }
  async getReceiptById(id: number): Promise<ReceiptHeaders> {
    return this.receiptRepository.getReceiptById(id);
  }
  async getAllReceiptsSendedFromStoreById(id: number): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsSendedFromStoreById(id);
  }
  async getAllReceiptsDestructionSendedFromStoreById(id: number): Promise<ReceiptHeaders[]> {
    return this.receiptRepository.getAllReceiptsDestructionSendedFromStoreById(id);
  }
  async getBetweenReceiptById(id: number): Promise<ReceiptHeaders> {
    return this.receiptRepository.getBetweenReceiptById(id);
  }
  async createReceipt(receiptDto: CreateReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.createReceipt(receiptDto, userId);
  }
  async createReceiptForSendedFromStore(receiptDto: CreateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    return this.receiptRepository.createReceiptForSendedFromStore(receiptDto, userId);
  }
  async createReceiptDestructionForSendedFromStore(receiptDto: CreateReceiptForSendedFromStoreDto, userId: string): Promise<void> {

    return this.receiptRepository.createReceiptDestructionForSendedFromStore(receiptDto, userId);
  }

  async createBetweenReceipt(receiptDto: CreateBetweenReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.createBetweenReceipt(receiptDto, userId);
  }

  async updateReceipt(receiptDto: UpdateReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.updateReceipt(receiptDto, userId);
  }
  async updateReceiptSendedFromStore(receiptDto: UpdateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    return this.receiptRepository.updateReceiptSendedFromStore(receiptDto, userId);
  }
  async updateReceiptDestructionSendedFromStore(receiptDto: UpdateReceiptForSendedFromStoreDto, userId: string): Promise<void> {

    return this.receiptRepository.updateReceiptDestructionSendedFromStore(receiptDto, userId);
  }

  async updateBetweenReceipt(receiptDto: UpdateBetweenReceiptDto, userId: string): Promise<void> {
    return this.receiptRepository.updateBetweenReceipt(receiptDto, userId);
  }
  async deleteReceipt(receiptId: number): Promise<void> {
    return this.receiptRepository.deleteReceipt(receiptId);
  }
}