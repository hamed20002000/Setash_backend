import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, In, IsNull, Not, Repository } from 'typeorm';
import { Items } from 'src/domain/entities/Items';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Users } from 'src/domain/entities/Users';
import { Drivers } from 'src/domain/entities/Drivers';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { WarehouseTransactions } from 'src/domain/entities/WarehouseTransactions';
import { WarehouseOperations } from 'src/domain/enums/warehouse-op.enum';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseDispatchHeaders } from 'src/domain/entities/WarehouseDispatchHeaders';
import { CreateBetweenWarehouseDispatchDto, CreateWarehouseDispatchDestructionDto, CreateWarehouseDispatchDto, UpdateBetweenWarehouseDispatchDto, UpdateWarehouseDispatchDestructionDto, UpdateWarehouseDispatchDto } from 'src/presentation/dtos/warehouse/warhouse-dispatch-dto';
import { WarehouseDispatchNo } from 'src/domain/entities/WarehouseDispatchNos';
import { WarehouseDispatchDetails } from 'src/domain/entities/WarehouseDispatchDetails';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WarehouseDispatchStatus } from 'src/domain/enums/warehouseDispatchStatus.enum';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';
import { WarehouseDispatchHeaderStatusHistories } from 'src/domain/entities/WarehouseDispatchHeaderStatusHistories';


@Injectable()
export class WarehouseDispatchRepository extends BaseRepository<WarehouseDispatchHeaders> {
  constructor(@InjectRepository(WarehouseDispatchHeaders) repository: Repository<WarehouseDispatchHeaders>, private readonly dataSource: DataSource, private readonly gateway: NotificationsGateway,) {
    super(repository);
  }
  async getAllWarehouseDispatches(warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    const warehouseDispatches = await this.repository.find({
      where: { warehouse: { id: warehouseId } },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return warehouseDispatches;
  }

  async getAllWarehouseDispatchesDestruction(warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    const warehouseDispatches = await this.repository.find({
      where: { warehouse: { id: warehouseId }, destructionStatus: true },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse'

      ],
      order: {
        createAt: 'DESC',
      },
    });

    return warehouseDispatches;
  }

  async getAllBetweenWarehouseDispatches(warehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    const warehouseDispatches = await this.repository.find({
      where: { warehouse: { id: warehouseId }, destinationWarehouse: Not(IsNull()), },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse',
        'destinationWarehouse'
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return warehouseDispatches;
  }

  async getBetweenWarehouseDispatchById(id: number): Promise<WarehouseDispatchHeaders> {
    const warehouseDispatch = await this.repository.findOne({
      where: { id, destinationWarehouse: Not(IsNull()), },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse',
        'destinationWarehouse'
      ],
    });

    if (!warehouseDispatch) {
      throw new NotFoundException(`Warehouse Dispatch with id ${id} not found`);
    }

    return warehouseDispatch;
  }

  async getAllWarehouseDispatchesByDestinationWarehouseId(destinationWarehouseId: number): Promise<WarehouseDispatchHeaders[]> {
    const warehouseDispatches = await this.repository.find({
      where: { destinationWarehouse: { id: destinationWarehouseId } },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse',
        'destinationWarehouse'
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return warehouseDispatches;
  }


  async getAllWarehouseDispatchesByWorkhouseId(workhouseId: number): Promise<WarehouseDispatchHeaders[]> {
    const warehouseDispatches = await this.repository.find({
      where: { workhouse: { id: workhouseId } },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse'
      ],
      order: {
        createAt: 'DESC',
      },
    });
    return warehouseDispatches;
  }




  async getWarehouseDispatchById(id: number): Promise<WarehouseDispatchHeaders> {
    const warehouseDispatch = await this.repository.findOne({
      where: { id },
      relations: [
        'warehouseDispatchDetails',
        'warehouseDispatchDetails.item',
        'warehouseDispatchDetails.item.unit',
        'warehouse',
        'driver',
        'driverVehicle',
        'workhouse'
      ],
    });

    if (!warehouseDispatch) {
      throw new NotFoundException(`Warehouse Dispatch with id ${id} not found`);
    }

    return warehouseDispatch;
  }

  async createWarehouseDispatch(warehouseDispatchDto: CreateWarehouseDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var warehouseDispatch = new WarehouseDispatchHeaders();
      const result = await manager.getRepository(WarehouseDispatchNo)
        .createQueryBuilder("warehouseDispatchNo")
        .select("MAX(warehouseDispatchNo.no)", "max")
        .getRawOne();

      const nextWarehouseDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var warehouseDispatchNo = new WarehouseDispatchNo();
      warehouseDispatchNo.no = nextWarehouseDispatchNo;
      warehouseDispatchNo.createAt = new Date();
      warehouseDispatchNo.recordStatus = recordStatus.Active;
      warehouseDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(WarehouseDispatchNo).save(warehouseDispatchNo);
      warehouseDispatch.code = nextWarehouseDispatchNo.toString().padStart(6, '0');
      warehouseDispatch.docDate = warehouseDispatchDto.docDate;
      warehouseDispatch.description = warehouseDispatchDto.description;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId } as Warehouses;
      warehouseDispatch.workhouse = { id: warehouseDispatchDto.workhouseId } as Workhouses;
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId } as DriverVehicles;
      warehouseDispatch.status = WarehouseDispatchStatus.Pending;
      warehouseDispatch.createAt = new Date();
      warehouseDispatch.recordStatus = recordStatus.Active;
      warehouseDispatch.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;

          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }

     /*  var warehouseDispatchheaderSatusHistory = new WarehouseDispatchHeaderStatusHistories();
      warehouseDispatchheaderSatusHistory.warehouseDispatchHeader = warehouseDispatch;
      warehouseDispatchheaderSatusHistory.status = WarehouseDispatchStatus.Pending;
      warehouseDispatchheaderSatusHistory.createAt = new Date();
      warehouseDispatchheaderSatusHistory.recordStatus = recordStatus.Active;
      warehouseDispatchheaderSatusHistory.user = { id: userId } as Users;
      await manager.getRepository(WarehouseDispatchHeaderStatusHistories).save(warehouseDispatchheaderSatusHistory); */
      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: warehouseDispatch.id,
        createdAt: warehouseDispatch.createAt,
        type: 'warehouse-dispatch',
        warehouseId: warehouseDispatch.warehouse.id,
      });
    });
  }

  async createWarehouseDispatchDestruction(warehouseDispatchDto: CreateWarehouseDispatchDestructionDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var warehouseDispatch = new WarehouseDispatchHeaders();
      const result = await manager.getRepository(WarehouseDispatchNo)
        .createQueryBuilder("warehouseDispatchNo")
        .select("MAX(warehouseDispatchNo.no)", "max")
        .getRawOne();

      const nextWarehouseDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var warehouseDispatchNo = new WarehouseDispatchNo();
      warehouseDispatchNo.no = nextWarehouseDispatchNo;
      warehouseDispatchNo.createAt = new Date();
      warehouseDispatchNo.recordStatus = recordStatus.Active;
      warehouseDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(WarehouseDispatchNo).save(warehouseDispatchNo);
      warehouseDispatch.code = nextWarehouseDispatchNo.toString().padStart(6, '0');
      warehouseDispatch.destructionStatus = warehouseDispatchDto.destructionStatus;
      warehouseDispatch.description = warehouseDispatchDto.description;
      warehouseDispatch.docDate = warehouseDispatchDto.docDate;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId } as Warehouses;
     /*  warehouseDispatch.workhouse = { id: warehouseDispatchDto.workhouseId } as Workhouses; */
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId } as DriverVehicles;
      warehouseDispatch.status = WarehouseDispatchStatus.Pending;
      warehouseDispatch.createAt = new Date();
      warehouseDispatch.recordStatus = recordStatus.Active;
      warehouseDispatch.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;

          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }
      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: warehouseDispatch.id,
        createdAt: warehouseDispatch.createAt,
        type: 'warehouse-dispatch-destruction',
        warehouseId: warehouseDispatch.warehouse.id,
      });
    });
  }

  async createBetweenWarehouseDispatch(warehouseDispatchDto: CreateBetweenWarehouseDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var warehouseDispatch = new WarehouseDispatchHeaders();
      const result = await manager.getRepository(WarehouseDispatchNo)
        .createQueryBuilder("warehouseDispatchNo")
        .select("MAX(warehouseDispatchNo.no)", "max")
        .getRawOne();

      const nextWarehouseDispatchNo = result?.max ? Number(result.max) + 1 : 1;
      var warehouseDispatchNo = new WarehouseDispatchNo();
      warehouseDispatchNo.no = nextWarehouseDispatchNo;
      warehouseDispatchNo.createAt = new Date();
      warehouseDispatchNo.recordStatus = recordStatus.Active;
      warehouseDispatchNo.user = { id: userId } as Users;
      await manager.getRepository(WarehouseDispatchNo).save(warehouseDispatchNo);
      warehouseDispatch.code = nextWarehouseDispatchNo.toString().padStart(6, '0');
      warehouseDispatch.docDate = warehouseDispatchDto.docDate;
      warehouseDispatch.description = warehouseDispatchDto.description;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId } as Warehouses;
      warehouseDispatch.destinationWarehouse = { id: warehouseDispatchDto.destinationWarehouseId } as Warehouses;
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId } as DriverVehicles;
      warehouseDispatch.status = WarehouseDispatchStatus.Pending;
      warehouseDispatch.createAt = new Date();
      warehouseDispatch.recordStatus = recordStatus.Active;
      warehouseDispatch.user = { id: userId } as Users;

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;
          details.quantity = dt.quantity;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;
          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;
          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);
          return details;
        }));
      }
      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: warehouseDispatch.id,
        createdAt: warehouseDispatch.createAt,
        type: 'warehouse-dispatch-between-warehouse',
        warehouseId: warehouseDispatch.warehouse.id,
      });
    });
  }


  async updateWarehouseDispatch(warehouseDispatchDto: UpdateWarehouseDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const warehouseDispatch = await manager.getRepository(WarehouseDispatchHeaders).findOne({
        where: { id: warehouseDispatchDto.id },
        relations: ['warehouseDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!warehouseDispatch) throw new NotFoundException('Warehouse Dispatch not found');
      if (warehouseDispatch.status != WarehouseDispatchStatus.Pending) {
        throw new NotFoundException('Only pending dispatches can be updated');
      }

      warehouseDispatch.docDate = warehouseDispatch.docDate ?? warehouseDispatch.docDate;
      warehouseDispatch.code = warehouseDispatch.code ?? warehouseDispatchDto.code;
      warehouseDispatch.description = warehouseDispatch.description ?? warehouseDispatchDto.description;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId ?? warehouseDispatch.warehouse.id } as Warehouses;
      warehouseDispatch.workhouse = { id: warehouseDispatchDto.workhouseId ?? warehouseDispatch.workhouse.id } as Workhouses;
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId ?? warehouseDispatch.driver.id } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId ?? warehouseDispatch.driverVehicle.id } as DriverVehicles;
      /*  await manager.getRepository(WarehouseTransactions).delete({
         warehouseDispatchDetail: { warehouseDispatchHeaders: { id: warehouseDispatch.id } },
       }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"WarehouseDispatchDetailId" IN (
      SELECT rd."Id" 
      FROM "WarehouseDispatchDetails" rd 
      WHERE rd."WarehouseDispatchHeadersId" = :headerId
  )`)
        .setParameter("headerId", warehouseDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(WarehouseDispatchDetails).delete({
        warehouseDispatchHeaders: { id: warehouseDispatch.id },
      });

      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;

          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId } as DriverVehicles;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }

  async updateWarehouseDispatchDestruction(warehouseDispatchDto: UpdateWarehouseDispatchDestructionDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const warehouseDispatch = await manager.getRepository(WarehouseDispatchHeaders).findOne({
        where: { id: warehouseDispatchDto.id },
        relations: ['warehouseDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!warehouseDispatch) throw new NotFoundException('Warehouse Dispatch not found');
      if (warehouseDispatch.status != WarehouseDispatchStatus.Pending) {
        throw new NotFoundException('Only pending dispatches can be updated');
      }
      warehouseDispatch.docDate = warehouseDispatch.docDate ?? warehouseDispatch.docDate;
      warehouseDispatch.code = warehouseDispatch.code ?? warehouseDispatchDto.code;
      warehouseDispatch.description = warehouseDispatch.description ?? warehouseDispatchDto.description;
      warehouseDispatch.destructionStatus = warehouseDispatch.destructionStatus ?? warehouseDispatchDto.destructionStatus;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId ?? warehouseDispatch.warehouse.id } as Warehouses;
    /*   warehouseDispatch.workhouse = { id: warehouseDispatchDto.workhouseId ?? warehouseDispatch.workhouse.id } as Workhouses; */
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId ?? warehouseDispatch.driver.id } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId ?? warehouseDispatch.driverVehicle.id } as DriverVehicles;
      /*  await manager.getRepository(WarehouseTransactions).delete({
         warehouseDispatchDetail: { warehouseDispatchHeaders: { id: warehouseDispatch.id } },
       }); */
      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"WarehouseDispatchDetailId" IN (
      SELECT rd."Id" 
      FROM "WarehouseDispatchDetails" rd 
      WHERE rd."WarehouseDispatchHeadersId" = :headerId
  )`)
        .setParameter("headerId", warehouseDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(WarehouseDispatchDetails).delete({
        warehouseDispatchHeaders: { id: warehouseDispatch.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;

          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId } as DriverVehicles;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }
  async updateBetweenWarehouseDispatch(warehouseDispatchDto: UpdateBetweenWarehouseDispatchDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const warehouseDispatch = await manager.getRepository(WarehouseDispatchHeaders).findOne({
        where: { id: warehouseDispatchDto.id },
        relations: ['warehouseDispatchDetails'], // تا جزئیات رو هم بیاره
      });

      if (!warehouseDispatch) throw new NotFoundException('Warehouse Dispatch not found');

      if (warehouseDispatch.status != WarehouseDispatchStatus.Pending) {
        throw new NotFoundException('Only pending dispatches can be updated');
      }

      warehouseDispatch.docDate = warehouseDispatch.docDate ?? warehouseDispatch.docDate;
      warehouseDispatch.code = warehouseDispatch.code ?? warehouseDispatchDto.code;
      warehouseDispatch.description = warehouseDispatch.description ?? warehouseDispatchDto.description;
      warehouseDispatch.warehouse = { id: warehouseDispatchDto.warehouseId ?? warehouseDispatch.warehouse.id } as Warehouses;
      warehouseDispatch.destinationWarehouse = { id: warehouseDispatchDto.destinationWarehouseId ?? warehouseDispatch.destinationWarehouse.id } as Warehouses;
      warehouseDispatch.driver = { id: warehouseDispatchDto.driverId ?? warehouseDispatch.driver.id } as Drivers;
      warehouseDispatch.driverVehicle = { id: warehouseDispatchDto.driverVehicleId ?? warehouseDispatch.driverVehicle.id } as DriverVehicles;

      /*  await manager.getRepository(WarehouseTransactions).delete({
         warehouseDispatchDetail: { warehouseDispatchHeaders: { id: warehouseDispatch.id } },
       }); */


      await manager
        .createQueryBuilder()
        .delete()
        .from(WarehouseTransactions)
        .where(`"WarehouseDispatchDetailId" IN (
        SELECT rd."Id" 
        FROM "WarehouseDispatchDetails" rd 
        WHERE rd."WarehouseDispatchHeadersId" = :headerId
    )`)
        .setParameter("headerId", warehouseDispatch.id)
        .execute();
      // حذف جزئیات قبلی
      await manager.getRepository(WarehouseDispatchDetails).delete({
        warehouseDispatchHeaders: { id: warehouseDispatch.id },
      });
      var list_warehouseTransaction: WarehouseTransactions[] = [];
      // درج جزئیات جدید
      if (warehouseDispatchDto.dispatchDetails && warehouseDispatchDto.dispatchDetails.length > 0) {
        warehouseDispatch.warehouseDispatchDetails = await Promise.all(warehouseDispatchDto.dispatchDetails.map(async dt => {
          const details = new WarehouseDispatchDetails();
          details.item = { id: dt.itemId } as Items;


          details.quantity = dt.quantity;

          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.warehouseDispatchHeaders = warehouseDispatch;


          var warehouseTransaction = new WarehouseTransactions();
          warehouseTransaction.quantity = details.quantity;
          warehouseTransaction.operation = WarehouseOperations.Out;
          warehouseTransaction.description = details.description;
          warehouseTransaction.item = { id: details.item.id } as Items;

          warehouseTransaction.warehouse = { id: warehouseDispatch.warehouse.id } as Warehouses;
          warehouseTransaction.warehouseDispatchDetail = details;
          warehouseTransaction.createAt = new Date();
          warehouseTransaction.recordStatus = recordStatus.Active;
          warehouseTransaction.user = { id: userId } as Users;
          list_warehouseTransaction.push(warehouseTransaction);

          return details;
        }));
      }


      await manager.getRepository(WarehouseDispatchHeaders).save(warehouseDispatch);
      await manager.getRepository(WarehouseTransactions).save(list_warehouseTransaction);
    });
  }


  async deleteWarehouseDispatch(warehouseDispatchId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const warehouseDispatch = await manager.getRepository(WarehouseDispatchHeaders).findOne({
        where: { id: warehouseDispatchId },
        relations: ['warehouseDispatchDetails'],
      });


      if (!warehouseDispatch) throw new NotFoundException('Warehouse Dispatch not found');

      if (warehouseDispatch.status != WarehouseDispatchStatus.Pending) {
        throw new NotFoundException('Only pending dispatches can be deleted');
      }

      if (warehouseDispatch.warehouseDispatchDetails && warehouseDispatch.warehouseDispatchDetails.length > 0) {
        await Promise.all(warehouseDispatch.warehouseDispatchDetails.map(async dt => {
          await manager.getRepository(WarehouseTransactions).delete({
            warehouseDispatchDetail: { id: dt.id },
          });
        }));
      }

      await manager.getRepository(WarehouseDispatchDetails).delete({
        warehouseDispatchHeaders: { id: warehouseDispatch.id },
      });
       await manager.getRepository(WarehouseDispatchHeaderStatusHistories).delete({
        warehouseDispatchHeader: { id: warehouseDispatch.id },
      });

      await manager.getRepository(WarehouseDispatchHeaders).delete(warehouseDispatch.id);
    });
  }
}

