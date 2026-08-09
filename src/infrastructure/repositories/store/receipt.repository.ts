import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, In, IsNull, Not, Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { TenderHeaders } from 'src/domain/entities/TenderHeaders';
import { TenderListDto, UpdateTenderDto } from 'src/presentation/dtos/initial-operations/tender-dto';
import { plainToInstance } from 'class-transformer';
import { TenderDetails } from 'src/domain/entities/TenderDetails';
import { Items } from 'src/domain/entities/Items';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { TenderCategories } from 'src/domain/entities/TenderCategories';
import { OrderHeaders } from 'src/domain/entities/OrderHeaders';
import { CreateOrderDto, UpdateOrderDto } from 'src/presentation/dtos/initial-operations/order-dto';
import { Networks } from 'src/domain/entities/Networks';
import { OrderDetails } from 'src/domain/entities/OrderDetails';
import { Users } from 'src/domain/entities/Users';
import { orderStatus } from 'src/domain/enums/orderStatus.enum';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { InvoiceHeaders } from 'src/domain/entities/InvoiceHeaders';
import { CreateInvoiceDto, UpdateInvoiceDto } from 'src/presentation/dtos/sales/invoice.dto';
import { invoiceStatus } from 'src/domain/enums/invoiceStatus.enum';
import { Drivers } from 'src/domain/entities/Drivers';
import { Providers } from 'src/domain/entities/Providers';
import { InvoiceHeaderStatusHistories } from 'src/domain/entities/InvoiceHeaderStatusHistories';
import { InvoiceDetails } from 'src/domain/entities/InvoiceDetails';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { ReceiptHeaders } from 'src/domain/entities/ReceiptHeaders';
import { CreateReceiptDto, UpdateReceiptDto } from 'src/presentation/dtos/warehouse/receipt-dto';
import { ReceiptDetails } from 'src/domain/entities/ReceiptDetails';
import { WarehouseTransactions } from 'src/domain/entities/WarehouseTransactions';
import { WarehouseOperations } from 'src/domain/enums/warehouse-op.enum';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { ReceiptNos } from 'src/domain/entities/ReceiptNos';
import { StoreReceiptHeaders } from 'src/domain/entities/StoreReceiptHeaders';
import { CreateBetweenStoreReceiptDto, CreateStoreReceiptByInvoiceDto, CreateStoreReceiptDto, UpdateBetweenStoreReceiptDto, UpdateStoreReceiptByInvoiceDto, UpdateStoreReceiptDto } from 'src/presentation/dtos/store/receipt-dto';
import { StoreReceiptNos } from 'src/domain/entities/StoreReceiptNos';
import { Stores } from 'src/domain/entities/Stores';
import { StoreTransactions } from 'src/domain/entities/StoreTransactions';
import { StoreReceiptDetails } from 'src/domain/entities/StoreReceiptDetails';
import { StoreDispatchDetails } from 'src/domain/entities/StoreDispatchDetails';
import { WarehouseDispatchDetails } from 'src/domain/entities/WarehouseDispatchDetails';

@Injectable()
export class StoreReceiptRepository extends BaseRepository<StoreReceiptHeaders> {
  constructor(@InjectRepository(StoreReceiptHeaders) repository: Repository<StoreReceiptHeaders>, private readonly dataSource: DataSource) {
    super(repository);
  }

  async getAllReceipts(): Promise<StoreReceiptHeaders[]> {
    const receipts = await this.repository.find({

      relations: [
        'storeReceiptDetails',
        'storeReceiptDetails.item',
        'storeReceiptDetails.item.unit',
        'storeReceiptDetails.warehouseDispatchDetail',
        'storeReceiptDetails.warehouseDispatchDetail.warehouseDispatchHeaders',
        'store','store.workhouse'

      ],
       where: {
        storeReceiptDetails: {
          originStoreDispatchDetail: { id: IsNull() }
        }
      },
      order: {
        createAt: 'DESC',
      },
    });

    return receipts;
  }


  async getAllReceiptsWithStoreId(storeId: number): Promise<StoreReceiptHeaders[]> {
    const receipts = await this.repository.find({
      where: { store: { id: storeId } },
      relations: [
        'storeReceiptDetails',
        'storeReceiptDetails.item',
        'storeReceiptDetails.item.unit',
        'storeReceiptDetails.warehouseDispatchDetail',
        'storeReceiptDetails.warehouseDispatchDetail.warehouseDispatchHeaders',
        'store','store.workhouse'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return receipts;
  }

 async getAllReceiptsByInvoice(): Promise<StoreReceiptHeaders[]> {
  const receipts = await this.repository.find({
    where: {
      storeReceiptDetails: {
        invoiceDetail: {
          id: Not(IsNull())
        }
      }
    },
    relations: [
      'storeReceiptDetails',
      'storeReceiptDetails.item',
      'storeReceiptDetails.item.unit',
      'storeReceiptDetails.invoiceDetail',
      'storeReceiptDetails.invoiceDetail.invoiceHeader',
      'store','store.workhouse'
    ],
    order: {
      createAt: 'DESC',
    },
  });

  return receipts;
}


  async getAllBetweenReceipts(): Promise<StoreReceiptHeaders[]> {
    const receipts = await this.repository.find({
      relations: [
        'storeReceiptDetails',
        'storeReceiptDetails.item',
        'storeReceiptDetails.item.unit',
        'storeReceiptDetails.originStoreDispatchDetail',
        'storeReceiptDetails.originStoreDispatchDetail.storeDispatchHeaders',
        'store','store.workhouse'
      ],
      where: {
        storeReceiptDetails: {
          originStoreDispatchDetail: { id: Not(IsNull()) }
        }
      },
      order: {
        createAt: 'DESC',
      },
    });

    return receipts;
  }


  async getReceiptById(id: number): Promise<StoreReceiptHeaders> {
    const receipt = await this.repository.findOne({
      where: { id },
      relations: [
        'storeReceiptDetails',
        'storeReceiptDetails.item',
        'storeReceiptDetails.item.unit',
        'storeReceiptDetails.warehouseDispatchDetail',
        'storeReceiptDetails.warehouseDispatchDetail.warehouseDispatchHeaders',
        'store','store.workhouse'

      ],
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }

    return receipt;
  }

  async getBetweenReceiptById(id: number): Promise<StoreReceiptHeaders> {
    const receipt = await this.repository.findOne({
      where: { id },
      relations: [
        'storeReceiptDetails',
        'storeReceiptDetails.item',
        'storeReceiptDetails.item.unit',
        'storeReceiptDetails.originStoreDispatchDetail',
        'storeReceiptDetails.originStoreDispatchDetail.storeDispatchHeaders',
        'store','store.workhouse'
      ],
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }

    return receipt;
  }

  async createReceipt(receiptDto: CreateStoreReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new StoreReceiptHeaders();
      const result = await manager.getRepository(StoreReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new StoreReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(StoreReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.store = { id: receiptDto.storeId } as Stores;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;


      var list_storeTransaction: StoreTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.warehouseDispatchDetail = { id: dt.warehouseDispatchDetailId } as WarehouseDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);

    });
  }

    async createReceiptByInvoice(receiptDto: CreateStoreReceiptByInvoiceDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new StoreReceiptHeaders();
      const result = await manager.getRepository(StoreReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new StoreReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(StoreReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.description = receiptDto.description;
      receipt.store = { id: receiptDto.storeId } as Stores;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;


      var list_storeTransaction: StoreTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.invoiceDetail = { id: dt.invoiceDetailId } as InvoiceDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);

    });
  }

  async createBetweenReceipt(receiptDto: CreateBetweenStoreReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new StoreReceiptHeaders();
      const result = await manager.getRepository(StoreReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new StoreReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(StoreReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.description = receiptDto.description;
      receipt.store = { id: receiptDto.storeId } as Stores;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;

      var list_storeTransaction: StoreTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.originStoreDispatchDetail = { id: dt.originStoreDispatchDeatailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);

    });
  }


  async updateReceipt(receiptDto: UpdateStoreReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(StoreReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['storeReceiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.store = { id: receiptDto.storeId ?? receipt.store.id } as Stores;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "StoreReceiptDetails" rd 
      WHERE rd."StoreReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreReceiptDetails).delete({
        storeReceiptHeader: { id: receipt.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.warehouseDispatchDetail = { id: dt.warehouseDispatchDetailId } as WarehouseDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);
          return details;
        }));
      }
      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }

  async updateReceiptByInvoice(receiptDto: UpdateStoreReceiptByInvoiceDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(StoreReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['storeReceiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.store = { id: receiptDto.storeId ?? receipt.store.id } as Stores;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "StoreReceiptDetails" rd 
      WHERE rd."StoreReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreReceiptDetails).delete({
        storeReceiptHeader: { id: receipt.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.invoiceDetail = { id: dt.invoiceDetailId } as InvoiceDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);
          return details;
        }));
      }
      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }
  async updateBetweenReceipt(receiptDto: UpdateBetweenStoreReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(StoreReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['storeReceiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.store = { id: receiptDto.storeId ?? receipt.store.id } as Stores;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreReceiptDetailId" IN (
        SELECT rd."Id" 
        FROM "StoreReceiptDetails" rd 
        WHERE rd."StoreReceiptHeaderId" = :headerId
    )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreReceiptDetails).delete({
        storeReceiptHeader: { id: receipt.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.storeReceiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new StoreReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.originStoreDispatchDetail = { id: dt.originStoreDispatchDeatailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeReceiptHeader = receipt; // Set the receiptHeader reference


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.In;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: receipt.store.id } as Stores;
          storeTransaction.storeReceiptDetail = details;
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.createAt = new Date();
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }


      await manager.getRepository(StoreReceiptHeaders).save(receipt);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }

  async deleteReceipt(receiptId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(StoreReceiptHeaders).findOne({
        where: { id: receiptId },
        relations: ['storeReceiptDetails'],
      });


      if (!receipt) throw new NotFoundException('Receipt not found');
      if (receipt.storeReceiptDetails && receipt.storeReceiptDetails.length > 0) {
        await Promise.all(receipt.storeReceiptDetails.map(async dt => {
          await manager.getRepository(StoreTransactions).delete({
            storeReceiptDetail: { id: dt.id },
          });
        }));
      }

      await manager.getRepository(StoreReceiptDetails).delete({
        storeReceiptHeader: { id: receipt.id },
      });

      await manager.getRepository(StoreReceiptHeaders).delete(receipt.id);
    });
  }
}

