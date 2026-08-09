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
import { WarehouseDispatchHeaders } from 'src/domain/entities/WarehouseDispatchHeaders';
import { CreateBetweenWarehouseDispatchDto, CreateWarehouseDispatchDto, UpdateBetweenWarehouseDispatchDto, UpdateWarehouseDispatchDto } from 'src/presentation/dtos/warehouse/warhouse-dispatch-dto';
import { WarehouseDispatchNo } from 'src/domain/entities/WarehouseDispatchNos';
import { WarehouseDispatchDetails } from 'src/domain/entities/WarehouseDispatchDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WarehouseDispatchStatus } from 'src/domain/enums/warehouseDispatchStatus.enum';
import { StoreDispatchHeaders } from 'src/domain/entities/StoreDispatchHeaders';
import { CreateBetweenStoreDispatchDto, CreateStoreDispatchDto, CreateStoreDispatchReturnToCenterDto, CreateStoreDispatchToCenterDto, UpdateBetweenStoreDispatchDto, UpdateStoreDispatchDto, UpdateStoreDispatchReturnToCenterDto, UpdateStoreDispatchToCenterDto } from 'src/presentation/dtos/store/store-dispatch-dto';
import { StoreDispatchNo } from 'src/domain/entities/StoreDispatchNos';
import { StoreDispatchDetails } from 'src/domain/entities/StoreDispatchDetails';
import { StoreTransactions } from 'src/domain/entities/StoreTransactions';
import { Stores } from 'src/domain/entities/Stores';
import { Projects } from 'src/domain/entities/Projects';
import { StoreDispatchStatus } from 'src/domain/enums/StoreDispatchStatus';
import { isNull } from 'util';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';

@Injectable()
export class StoreDispatchRepository extends BaseRepository<StoreDispatchHeaders> {
  constructor(@InjectRepository(StoreDispatchHeaders) repository: Repository<StoreDispatchHeaders>,
   private readonly dataSource: DataSource, private readonly gateway: NotificationsGateway,) {
    super(repository);
  }
  async getAllStoreDispatches(storeId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { store: { id: storeId } },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }
  async getAllStoreDispatchesToCenter(storeId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { store: { id: storeId }, project: IsNull(), destruction: IsNull() },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'destinationWarehouse'

      ],

      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }

  async getAllStoreDispatchesDestructionToCenter(storeId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { store: { id: storeId }, project: IsNull(), destruction: true },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'destinationWarehouse'

      ],

      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }

  async getAllBetweenStoreDispatches(storeId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { store: { id: storeId }, destinationStore: Not(IsNull()), },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project',
        'destinationStore'
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }

  async getBetweenStoreDispatchById(id: number): Promise<StoreDispatchHeaders> {
    const storeDispatch = await this.repository.findOne({
      where: { id, destinationStore: Not(IsNull()), },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project',
        'destinationStore'
      ],
    });

    if (!storeDispatch) {
      throw new NotFoundException(`Store Dispatch with id ${id} not found`);
    }

    return storeDispatch;
  }

  async getAllStoreDispatchesByDestinationStoreId(destinationStoreId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { destinationStore: { id: destinationStoreId } },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project',
        'destinationStore'
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }


  async getAllStoreDispatchesByProjectId(projectId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { project: { id: projectId } },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project',
        'destinationStore'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }

  async getAllStoreDispatchesByCenterId(centerId: number): Promise<StoreDispatchHeaders[]> {
    const storeDispatches = await this.repository.find({
      where: { destinationWarehouse: { id: centerId } },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'destinationWarehouse'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return storeDispatches;
  }
  async getStoreDispatchById(id: number): Promise<StoreDispatchHeaders> {
    const storeDispatch = await this.repository.findOne({
      where: { id },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'project'
      ],
    });

    if (!storeDispatch) {
      throw new NotFoundException(`Store Dispatch with id ${id} not found`);
    }

    return storeDispatch;
  }
  async getStoreDispatchToCenterById(id: number): Promise<StoreDispatchHeaders> {
    const storeDispatch = await this.repository.findOne({
      where: { id },
      relations: [
        'storeDispatchDetails',
        'storeDispatchDetails.item',
        'storeDispatchDetails.item.unit',
        'store',
        'driver',
        'driverVehicle',
        'destinationWarehouse'
      ],
    });

    if (!storeDispatch) {
      throw new NotFoundException(`Store Dispatch with id ${id} not found`);
    }

    return storeDispatch;
  }

  async createStoreDispatch(storeDispatchDto: CreateStoreDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var storeDispatch = new StoreDispatchHeaders();
      const result = await manager.getRepository(StoreDispatchNo)
        .createQueryBuilder("StoreDispatchNo")
        .select("MAX(StoreDispatchNo.no)", "max")
        .getRawOne();

      const nextStoreDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var storeDispatchNo = new StoreDispatchNo();
      storeDispatchNo.no = nextStoreDispatchNo;
      storeDispatchNo.createAt = new Date();
      storeDispatchNo.recordStatus = recordStatus.Active;
      storeDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(StoreDispatchNo).save(storeDispatchNo);
      storeDispatch.code = nextStoreDispatchNo.toString().padStart(6, '0');
      storeDispatch.docDate = storeDispatchDto.docDate;
      storeDispatch.description = storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId } as Stores;
      storeDispatch.project = { id: storeDispatchDto.projectId } as Projects;
      storeDispatch.driver = { id: storeDispatchDto.driverId } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
      storeDispatch.status = StoreDispatchStatus.Pending;
      storeDispatch.createAt = new Date();
      storeDispatch.recordStatus = recordStatus.Active;
      storeDispatch.user = { id: userId } as Users;

      var list_storeTransaction: StoreTransactions[] = [];
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
      this.gateway.notifyRole(['admin'],'new-notify', {
        id: storeDispatch.id,
        createdAt: storeDispatch.createAt,
        type: 'store-dispatch-to-project',
        storeId: storeDispatch.store.id,
      });

    });
  }

  async createStoreDispatchReturnToCenter(storeDispatchDto: CreateStoreDispatchReturnToCenterDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var storeDispatch = new StoreDispatchHeaders();
      const result = await manager.getRepository(StoreDispatchNo)
        .createQueryBuilder("StoreDispatchNo")
        .select("MAX(StoreDispatchNo.no)", "max")
        .getRawOne();

      const nextStoreDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var storeDispatchNo = new StoreDispatchNo();
      storeDispatchNo.no = nextStoreDispatchNo;
      storeDispatchNo.createAt = new Date();
      storeDispatchNo.recordStatus = recordStatus.Active;
      storeDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(StoreDispatchNo).save(storeDispatchNo);
      storeDispatch.code = nextStoreDispatchNo.toString().padStart(6, '0');
      storeDispatch.destruction = storeDispatchDto.destruction;
      storeDispatch.description = storeDispatchDto.description;
      storeDispatch.docDate = storeDispatchDto.docDate;
      storeDispatch.store = { id: storeDispatchDto.storeId } as Stores;
      storeDispatch.destinationWarehouse = { id: storeDispatchDto.destinationWarehouseId } as Warehouses;
      storeDispatch.driver = { id: storeDispatchDto.driverId } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
      storeDispatch.status = StoreDispatchStatus.Pending;
      storeDispatch.createAt = new Date();
      storeDispatch.recordStatus = recordStatus.Active;
      storeDispatch.user = { id: userId } as Users;

      var list_storeTransaction: StoreTransactions[] = [];
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
      this.gateway.notifyRole(['admin'],'new-notify', {
        id: storeDispatch.id,
        createdAt: storeDispatch.createAt,
        type: 'store-dispatch-destruction-to-center',
         storeId: storeDispatch.store.id,
      });

    });
  }

  async createStoreDispatchToCenter(storeDispatchDto: CreateStoreDispatchToCenterDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var storeDispatch = new StoreDispatchHeaders();
      const result = await manager.getRepository(StoreDispatchNo)
        .createQueryBuilder("StoreDispatchNo")
        .select("MAX(StoreDispatchNo.no)", "max")
        .getRawOne();

      const nextStoreDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var storeDispatchNo = new StoreDispatchNo();
      storeDispatchNo.no = nextStoreDispatchNo;
      storeDispatchNo.createAt = new Date();
      storeDispatchNo.recordStatus = recordStatus.Active;
      storeDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(StoreDispatchNo).save(storeDispatchNo);
      storeDispatch.code = nextStoreDispatchNo.toString().padStart(6, '0');
      storeDispatch.docDate = storeDispatchDto.docDate;
      storeDispatch.description = storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId } as Stores;
      storeDispatch.destinationWarehouse = { id: storeDispatchDto.destinationWarehouseId } as Warehouses;
      storeDispatch.driver = { id: storeDispatchDto.driverId } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
      storeDispatch.status = StoreDispatchStatus.Pending;
      storeDispatch.createAt = new Date();
      storeDispatch.recordStatus = recordStatus.Active;
      storeDispatch.user = { id: userId } as Users;

      var list_storeTransaction: StoreTransactions[] = [];
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }
      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
      this.gateway.notifyRole(['admin'],'new-notify', {
        id: storeDispatch.id,
        createdAt: storeDispatch.createAt,
        type: 'store-dispatch-to-center',
         storeId: storeDispatch.store.id,
      });
    });
  }


  async createBetweenStoreDispatch(storeDispatchDto: CreateBetweenStoreDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var storeDispatch = new StoreDispatchHeaders();
      const result = await manager.getRepository(StoreDispatchNo)
        .createQueryBuilder("storeDispatchNo")
        .select("MAX(storeDispatchNo.no)", "max")
        .getRawOne();

      const nextStoreDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var storeDispatchNo = new StoreDispatchNo();
      storeDispatchNo.no = nextStoreDispatchNo;
      storeDispatchNo.createAt = new Date();
      storeDispatchNo.recordStatus = recordStatus.Active;
      storeDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(StoreDispatchNo).save(storeDispatchNo);
      storeDispatch.code = nextStoreDispatchNo.toString().padStart(6, '0');
      storeDispatch.docDate = storeDispatchDto.docDate;
      storeDispatch.description = storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId } as Stores;
      storeDispatch.destinationStore = { id: storeDispatchDto.destinationStoreId } as Stores;
      storeDispatch.driver = { id: storeDispatchDto.driverId } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
      storeDispatch.status = StoreDispatchStatus.Pending;
      storeDispatch.createAt = new Date();
      storeDispatch.recordStatus = recordStatus.Active;
      storeDispatch.user = { id: userId } as Users;

      var list_storeTransaction: StoreTransactions[] = [];
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;
          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;
          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);
          return details;
        }));
      }
      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
      this.gateway.notifyRole(['admin'],'new-notify', {
        id: storeDispatch.id,
        createdAt: storeDispatch.createAt,
        type: 'store-dispatch-between-store',
         storeId: storeDispatch.store.id,
      });
    });
  }


  async updateStoreDispatch(storeDispatchDto: UpdateStoreDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const storeDispatch = await manager.getRepository(StoreDispatchHeaders).findOne({
        where: { id: storeDispatchDto.id },
        relations: ['storeDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!storeDispatch) throw new NotFoundException('Store Dispatch not found');
      if (storeDispatch.status != StoreDispatchStatus.Pending) throw new NotFoundException('Only pending store dispatches can be updated');

      storeDispatch.docDate = storeDispatch.docDate ?? storeDispatch.docDate;
      storeDispatch.code = storeDispatch.code ?? storeDispatchDto.code;
      storeDispatch.description = storeDispatch.description ?? storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId ?? storeDispatch.store.id } as Stores;
      storeDispatch.project = { id: storeDispatchDto.projectId ?? storeDispatch.project.id } as Projects;
      storeDispatch.driver = { id: storeDispatchDto.driverId ?? storeDispatch.driver.id } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId ?? storeDispatch.driverVehicle.id } as DriverVehicles;

      /*   await manager.getRepository(StoreTransactions).delete({
          storeDispatchDetail: { storeDispatchHeaders: { id: storeDispatch.id } },
        }); */


      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreDispatchDetailId" IN (
        SELECT rd."Id" 
        FROM "StoreDispatchDetails" rd 
        WHERE rd."StoreDispatchHeadersId" = :headerId
    )`)
        .setParameter("headerId", storeDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreDispatchDetails).delete({
        storeDispatchHeaders: { id: storeDispatch.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }


      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }

  async updateStoreDispatchToCenter(storeDispatchDto: UpdateStoreDispatchToCenterDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const storeDispatch = await manager.getRepository(StoreDispatchHeaders).findOne({
        where: { id: storeDispatchDto.id },
        relations: ['storeDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!storeDispatch) throw new NotFoundException('Store Dispatch not found');
      if (storeDispatch.status != StoreDispatchStatus.Pending) throw new NotFoundException('Only pending store dispatches can be updated');

      storeDispatch.docDate = storeDispatch.docDate ?? storeDispatch.docDate;
      storeDispatch.code = storeDispatch.code ?? storeDispatchDto.code;
      storeDispatch.description = storeDispatch.description ?? storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId ?? storeDispatch.store.id } as Stores;
      storeDispatch.destinationWarehouse = { id: storeDispatchDto.destinationWarehouseId ?? storeDispatch.destinationWarehouse.id } as Warehouses;
      storeDispatch.driver = { id: storeDispatchDto.driverId ?? storeDispatch.driver.id } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId ?? storeDispatch.driverVehicle.id } as DriverVehicles;

      /*   await manager.getRepository(StoreTransactions).delete({
          storeDispatchDetail: { storeDispatchHeaders: { id: storeDispatch.id } },
        }); */


      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreDispatchDetailId" IN (
        SELECT rd."Id" 
        FROM "StoreDispatchDetails" rd 
        WHERE rd."StoreDispatchHeadersId" = :headerId
    )`)
        .setParameter("headerId", storeDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreDispatchDetails).delete({
        storeDispatchHeaders: { id: storeDispatch.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }


      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }

  async updateStoreDispatchReturnToCenter(storeDispatchDto: UpdateStoreDispatchReturnToCenterDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const storeDispatch = await manager.getRepository(StoreDispatchHeaders).findOne({
        where: { id: storeDispatchDto.id },
        relations: ['storeDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!storeDispatch) throw new NotFoundException('Store Dispatch not found');
      if (storeDispatch.status != StoreDispatchStatus.Pending) throw new NotFoundException('Only pending store dispatches can be updated');

      storeDispatch.docDate = storeDispatch.docDate ?? storeDispatch.docDate;
      storeDispatch.description = storeDispatch.description ?? storeDispatchDto.description;
      storeDispatch.destruction = storeDispatch.destruction ?? storeDispatchDto.destruction;
      storeDispatch.code = storeDispatch.code ?? storeDispatchDto.code;
      storeDispatch.store = { id: storeDispatchDto.storeId ?? storeDispatch.store.id } as Stores;
      storeDispatch.destinationWarehouse = { id: storeDispatchDto.destinationWarehouseId ?? storeDispatch.destinationWarehouse.id } as Warehouses;
      storeDispatch.driver = { id: storeDispatchDto.driverId ?? storeDispatch.driver.id } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId ?? storeDispatch.driverVehicle.id } as DriverVehicles;

      /*   await manager.getRepository(StoreTransactions).delete({
          storeDispatchDetail: { storeDispatchHeaders: { id: storeDispatch.id } },
        }); */


      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreDispatchDetailId" IN (
        SELECT rd."Id" 
        FROM "StoreDispatchDetails" rd 
        WHERE rd."StoreDispatchHeadersId" = :headerId
    )`)
        .setParameter("headerId", storeDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreDispatchDetails).delete({
        storeDispatchHeaders: { id: storeDispatch.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;
          storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId } as DriverVehicles;
          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }


      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }


  async updateBetweenStoreDispatch(storeDispatchDto: UpdateBetweenStoreDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const storeDispatch = await manager.getRepository(StoreDispatchHeaders).findOne({
        where: { id: storeDispatchDto.id },
        relations: ['storeDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!storeDispatch) throw new NotFoundException('Store Dispatch not found');
      if (storeDispatch.status != StoreDispatchStatus.Pending) throw new NotFoundException('Only pending store dispatches can be updated');

      storeDispatch.docDate = storeDispatch.docDate ?? storeDispatch.docDate;
      storeDispatch.code = storeDispatch.code ?? storeDispatchDto.code;
      storeDispatch.description = storeDispatch.description ?? storeDispatchDto.description;
      storeDispatch.store = { id: storeDispatchDto.storeId ?? storeDispatch.store.id } as Stores;
      storeDispatch.destinationStore = { id: storeDispatchDto.destinationStoreId ?? storeDispatch.destinationStore.id } as Stores;
      storeDispatch.driver = { id: storeDispatchDto.driverId ?? storeDispatch.driver.id } as Drivers;
      storeDispatch.driverVehicle = { id: storeDispatchDto.driverVehicleId ?? storeDispatch.driverVehicle.id } as DriverVehicles;

      /*  await manager.getRepository(StoreTransactions).delete({
         storeDispatchDetail: { storeDispatchHeaders: { id: storeDispatch.id } },
       }); */

      await manager
        .createQueryBuilder()
        .delete()
        .from(StoreTransactions)
        .where(`"StoreDispatchDetailId" IN (
        SELECT rd."Id" 
        FROM "StoreDispatchDetails" rd 
        WHERE rd."StoreDispatchHeadersId" = :headerId
    )`)
        .setParameter("headerId", storeDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(StoreDispatchDetails).delete({
        storeDispatchHeaders: { id: storeDispatch.id },
      });
      var list_storeTransaction: StoreTransactions[] = [];
      // درج جزئیات جدید
      if (storeDispatchDto.dispatchDetails && storeDispatchDto.dispatchDetails.length > 0) {
        storeDispatch.storeDispatchDetails = await Promise.all(storeDispatchDto.dispatchDetails.map(async dt => {
          const details = new StoreDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.storeDispatchHeaders = storeDispatch;


          var storeTransaction = new StoreTransactions();
          storeTransaction.quantity = details.quantity;
          storeTransaction.operation = WarehouseOperations.Out;
          storeTransaction.description = details.description;
          storeTransaction.item = { id: details.item.id } as Items;

          storeTransaction.store = { id: storeDispatch.store.id } as Stores;

          storeTransaction.storeDispatchDetail = details;
          storeTransaction.createAt = new Date();
          storeTransaction.recordStatus = recordStatus.Active;
          storeTransaction.user = { id: userId } as Users;
          list_storeTransaction.push(storeTransaction);

          return details;
        }));
      }

      await manager.getRepository(StoreDispatchHeaders).save(storeDispatch);
      await manager.getRepository(StoreTransactions).save(list_storeTransaction);
    });
  }


  async deleteStoreDispatch(storeDispatchId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const storeDispatch = await manager.getRepository(StoreDispatchHeaders).findOne({
        where: { id: storeDispatchId },
        relations: ['storeDispatchDetails'],
      });


      if (!storeDispatch) throw new NotFoundException('Store Dispatch not found');
      if (storeDispatch.status != StoreDispatchStatus.Pending) throw new NotFoundException('Only pending store dispatches can be deleted');

      if (storeDispatch.storeDispatchDetails && storeDispatch.storeDispatchDetails.length > 0) {
        await Promise.all(storeDispatch.storeDispatchDetails.map(async dt => {
          await manager.getRepository(StoreTransactions).delete({
            storeDispatchDetail: { id: dt.id },
          });
        }));
      }

      await manager.getRepository(StoreDispatchDetails).delete({
        storeDispatchHeaders: { id: storeDispatch.id },
      });

      await manager.getRepository(StoreDispatchHeaders).delete(storeDispatch.id);
    });
  }
}

