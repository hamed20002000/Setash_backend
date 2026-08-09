import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
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
import { CreateBetweenReceiptDto, CreateReceiptDto, CreateReceiptForSendedFromStoreDto, UpdateBetweenReceiptDto, UpdateReceiptDto, UpdateReceiptForSendedFromStoreDto } from 'src/presentation/dtos/warehouse/receipt-dto';
import { ReceiptDetails } from 'src/domain/entities/ReceiptDetails';
import { WarehouseTransactions } from 'src/domain/entities/WarehouseTransactions';
import { WarehouseOperations } from 'src/domain/enums/warehouse-op.enum';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { ReceiptNos } from 'src/domain/entities/ReceiptNos';
import { WarehouseDispatchDetails } from 'src/domain/entities/WarehouseDispatchDetails';
import { StoreDispatchDetails } from 'src/domain/entities/StoreDispatchDetails';

@Injectable()
export class ReceiptRepository extends BaseRepository<ReceiptHeaders> {
  constructor(@InjectRepository(ReceiptHeaders) repository: Repository<ReceiptHeaders>, private readonly dataSource: DataSource) {
    super(repository);
  }
  async getAllReceipts(): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.invoiceDetail", "invoiceDetail")
      .leftJoinAndSelect("invoiceDetail.invoiceHeader", "invoiceHeader")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `NOT EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."OriginWarehouseDispatchDeatailId" IS NOT NULL
       )`
      )
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }

  async getAllReceiptsSendedFromStore(): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.storeDispatchDetail", "sotreDispatchDetail")
      .leftJoinAndSelect("sotreDispatchDetail.storeDispatchHeaders", "storeDispatchHeader")
      .leftJoinAndSelect("storeDispatchHeader.store", "store")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."StoreDispatchDetailId" IS NOT NULL
       )`
      ).andWhere("storeDispatchHeader.destruction is null")
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }

  async getAllReceiptsDestructionSendedFromStore(): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.storeDispatchDetail", "sotreDispatchDetail")
      .leftJoinAndSelect("sotreDispatchDetail.storeDispatchHeaders", "storeDispatchHeader")
      .leftJoinAndSelect("storeDispatchHeader.store", "store")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."StoreDispatchDetailId" IS NOT NULL
       )`
      ).andWhere("storeDispatchHeader.destruction = true")
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }

  async getAllReceiptsSendedFromStoreById(id: number): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.storeDispatchDetail", "sotreDispatchDetail")
      .leftJoinAndSelect("sotreDispatchDetail.storeDispatchHeaders", "storeDispatchHeader")
      .leftJoinAndSelect("storeDispatchHeader.store", "store")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."StoreDispatchDetailId" IS NOT NULL
       )`
      ).andWhere("receiptHeader.id = :id", { id }).andWhere("storeDispatchHeader.destruction != true")
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }
  async getAllReceiptsDestructionSendedFromStoreById(id: number): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.storeDispatchDetail", "sotreDispatchDetail")
      .leftJoinAndSelect("sotreDispatchDetail.storeDispatchHeaders", "storeDispatchHeader")
       .leftJoinAndSelect("storeDispatchHeader.store", "store")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."StoreDispatchDetailId" IS NOT NULL
       )`
      ).andWhere("storeDispatchHeader.destruction = true").andWhere("receiptHeader.id = :id", { id })
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }
  async getAllBetweenReceipts(): Promise<ReceiptHeaders[]> {
    const receipts = await this.repository
      .createQueryBuilder("receiptHeader")
      .leftJoinAndSelect("receiptHeader.receiptDetails", "receiptDetails")
      .leftJoinAndSelect("receiptDetails.provider", "provider")
      .leftJoinAndSelect("receiptDetails.item", "item")
      .leftJoinAndSelect("item.unit", "unit")
      .leftJoinAndSelect("receiptDetails.originWarehouseDispatchDeatail", "originWarehouseDispatchDeatail")
      .leftJoinAndSelect("originWarehouseDispatchDeatail.warehouseDispatchHeaders", "warehouseDispatchHeaders")
      .leftJoinAndSelect("receiptHeader.warehouse", "warehouse")
      .where(
        `NOT EXISTS (
         SELECT 1
         FROM "ReceiptDetails" rd
         WHERE rd."ReceiptHeaderId" = "receiptHeader"."Id"
           AND rd."OriginWarehouseDispatchDeatailId" IS NULL
       )`
      )
      .orderBy("receiptHeader.createAt", "DESC")
      .getMany();

    return receipts;
  }




  async getReceiptById(id: number): Promise<ReceiptHeaders> {
    const receipt = await this.repository.findOne({
      where: { id },
      relations: [
        'receiptDetails',
        'receiptDetails.provider',
        'receiptDetails.item',
        'receiptDetails.item.unit',
        'receiptDetails.invoiceDetail',
        'receiptDetails.invoiceDetail.invoiceHeader',
        'warehouse'
      ],
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }

    return receipt;
  }

  async getBetweenReceiptById(id: number): Promise<ReceiptHeaders> {
    const receipt = await this.repository.findOne({
      where: { id },
      relations: [
        'receiptDetails',
        'receiptDetails.provider',
        'receiptDetails.item',
        'receiptDetails.item.unit',
        'receiptDetails.originWarehouseDispatchDeatail',
        'receiptDetails.originWarehouseDispatchDeatail.warehouseDispatchHeaders',
        'warehouse'
      ],
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }

    return receipt;
  }

  async createReceipt(receiptDto: CreateReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new ReceiptHeaders();
      const result = await manager.getRepository(ReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new ReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(ReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.warehouse = { id: receiptDto.warehouseId } as Warehouses;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.invoiceDetail = { id: dt.invoiceDetailId } as InvoiceDetails;
          details.quantity = dt.quantity;
          details.provider = { id: dt.providerId } as Providers;
          details.firm = dt.firm;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }
      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);

    });
  }



  async createReceiptForSendedFromStore(receiptDto: CreateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new ReceiptHeaders();
      const result = await manager.getRepository(ReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new ReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(ReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.warehouse = { id: receiptDto.warehouseId } as Warehouses;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.storeDispatchDetail = { id: dt.StoreDispatchDetailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
         /*  warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm; */
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }
      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);

    });
  }

    async createReceiptDestructionForSendedFromStore(receiptDto: CreateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new ReceiptHeaders();
      const result = await manager.getRepository(ReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new ReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(ReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.warehouse = { id: receiptDto.warehouseId } as Warehouses;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.storeDispatchDetail = { id: dt.StoreDispatchDetailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.destructtion;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
         /*  warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm; */
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }
      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);

    });
  }

  async createBetweenReceipt(receiptDto: CreateBetweenReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var receipt = new ReceiptHeaders();
      const result = await manager.getRepository(ReceiptNos)
        .createQueryBuilder("receiptNo")
        .select("MAX(receiptNo.no)", "max")
        .getRawOne();

      const nextReceiptNo = result?.max ? Number(result.max) + 1 : 1;
      var receiptNo = new ReceiptNos();
      receiptNo.no = nextReceiptNo;
      receiptNo.createAt = new Date();
      receiptNo.recordStatus = recordStatus.Active;
      receiptNo.user = { id: userId } as Users;
      await manager.getRepository(ReceiptNos).save(receiptNo);
      receipt.code = nextReceiptNo.toString().padStart(6, '0');
      receipt.docDate = receiptDto.docDate;
      receipt.description = receiptDto.description;
      receipt.warehouse = { id: receiptDto.warehouseId } as Warehouses;
      receipt.createAt = new Date();
      receipt.recordStatus = recordStatus.Active;
      receipt.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.originWarehouseDispatchDeatail = { id: dt.originWarehouseDispatchDeatailId } as WarehouseDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }
      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);

    });
  }


  async updateReceipt(receiptDto: UpdateReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(ReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['receiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.warehouse = { id: receiptDto.warehouseId ?? receipt.warehouse.id } as Warehouses;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"ReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "ReceiptDetails" rd 
      WHERE rd."ReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(ReceiptDetails).delete({
        receiptHeader: { id: receipt.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.invoiceDetail = { id: dt.invoiceDetailId } as InvoiceDetails;
          details.quantity = dt.quantity;
          details.provider = { id: dt.providerId } as Providers;
          details.firm = dt.firm;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }

  async updateReceiptSendedFromStore(receiptDto: UpdateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(ReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['receiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.warehouse = { id: receiptDto.warehouseId ?? receipt.warehouse.id } as Warehouses;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"ReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "ReceiptDetails" rd 
      WHERE rd."ReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(ReceiptDetails).delete({
        receiptHeader: { id: receipt.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.storeDispatchDetail = { id: dt.StoreDispatchDetailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }

    async updateReceiptDestructionSendedFromStore(receiptDto: UpdateReceiptForSendedFromStoreDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(ReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['receiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;
      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.warehouse = { id: receiptDto.warehouseId ?? receipt.warehouse.id } as Warehouses;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"ReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "ReceiptDetails" rd 
      WHERE rd."ReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(ReceiptDetails).delete({
        receiptHeader: { id: receipt.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.storeDispatchDetail = { id: dt.StoreDispatchDetailId } as StoreDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.destructtion;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.provider = { id: details.provider.id } as Providers;
          warehouseTransaction.firm = details.firm;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }

  async updateBetweenReceipt(receiptDto: UpdateBetweenReceiptDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(ReceiptHeaders).findOne({
        where: { id: receiptDto.id },
        relations: ['receiptDetails'], // تا جزئیات رو هم بیاره
      });

      if (!receipt) throw new NotFoundException('Receipt not found');

      receipt.docDate = receipt.docDate ?? receipt.docDate;

      receipt.description = receipt.description ?? receiptDto.description;
      receipt.code = receipt.code ?? receiptDto.code;
      receipt.warehouse = { id: receiptDto.warehouseId ?? receipt.warehouse.id } as Warehouses;

      /*   await manager.getRepository(WarehouseTransactions).delete({
          receiptDetail: { receiptHeader: { id: receipt.id } },
        }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"ReceiptDetailId" IN (
      SELECT rd."Id" 
      FROM "ReceiptDetails" rd 
      WHERE rd."ReceiptHeaderId" = :headerId
  )`)
        .setParameter("headerId", receipt.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(ReceiptDetails).delete({
        receiptHeader: { id: receipt.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (receiptDto.receiptDetails && receiptDto.receiptDetails.length > 0) {
        receipt.receiptDetails = await Promise.all(receiptDto.receiptDetails.map(async dt => {
          const details = new ReceiptDetails();
          details.item = { id: dt.itemId } as Items;

          details.originWarehouseDispatchDeatail = { id: dt.originWarehouseDispatchDeatailId } as WarehouseDispatchDetails;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.receiptHeader = receipt; // Set the receiptHeader reference


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.In;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.warehouse = { id: receipt.warehouse.id } as Warehouses;
          warehouseTransaction.receiptDetail = details;
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(ReceiptHeaders).save(receipt);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }


  async deleteReceipt(receiptId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const receipt = await manager.getRepository(ReceiptHeaders).findOne({
        where: { id: receiptId },
        relations: ['receiptDetails'],
      });


      if (!receipt) throw new NotFoundException('Receipt not found');
      if (receipt.receiptDetails && receipt.receiptDetails.length > 0) {
        await Promise.all(receipt.receiptDetails.map(async dt => {
          await manager.getRepository(WarehouseTransactions).delete({
            receiptDetail: { id: dt.id },
          });
        }));
      }

      await manager.getRepository(ReceiptDetails).delete({
        receiptHeader: { id: receipt.id },
      });

      await manager.getRepository(ReceiptHeaders).delete(receipt.id);
    });
  }
}

