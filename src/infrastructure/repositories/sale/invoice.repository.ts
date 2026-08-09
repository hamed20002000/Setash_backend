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
import { CreateInvoiceDto, CreateInvoiceForWorkhouseDto, UpdateInvoiceDto, UpdateInvoiceWorkhouseDto } from 'src/presentation/dtos/sales/invoice.dto';
import { invoiceStatus } from 'src/domain/enums/invoiceStatus.enum';
import { Drivers } from 'src/domain/entities/Drivers';
import { Providers } from 'src/domain/entities/Providers';
import { InvoiceHeaderStatusHistories } from 'src/domain/entities/InvoiceHeaderStatusHistories';
import { InvoiceDetails } from 'src/domain/entities/InvoiceDetails';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { InvoiceNos } from 'src/domain/entities/InvoiceNos';
import { Stores } from 'src/domain/entities/Stores';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';

@Injectable()
export class InvoiceRepository extends BaseRepository<InvoiceHeaders> {
  constructor(@InjectRepository(InvoiceHeaders) repository: Repository<InvoiceHeaders>, private readonly dataSource: DataSource,
    private readonly gateway: NotificationsGateway,) {
    super(repository);
  }
  async getAllInvoices(): Promise<InvoiceHeaders[]> {
    const invoices = await this.repository.find({
      relations: [
        'invoiceDetails',

        'invoiceDetails.item',
        'invoiceDetails.item.unit',
        'invoiceDetails.orderDetail',
        'invoiceHeaderStatusHistories',
        'invoiceHeaderStatusHistories.user',
        'invoiceDetails.provider',
        'workhouse',
        'driver',
        'warehouse'
      ],
      where: { workhouse: null },
      order: {
        createAt: 'DESC',
      },
    });

    return invoices;
  }

  async getAllInvoicesByWarehouseId(warehouseId: number): Promise<InvoiceHeaders[]> {
    const invoices = await this.repository.find({
      where: { warehouse: { id: warehouseId } },
      relations: [
        'invoiceDetails',

        'invoiceDetails.item',
        'invoiceDetails.item.unit',
        'invoiceDetails.orderDetail',
        'invoiceHeaderStatusHistories',
        'invoiceHeaderStatusHistories.user',
        'invoiceDetails.provider',

        'driver',
        'warehouse',
        'workhouse'
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return invoices;
  }

  async getAllInvoicesByWorkhouseId(workhouseId: number): Promise<InvoiceHeaders[]> {
    const invoices = await this.repository.find({
      where: { workhouse: { id: workhouseId } },
      relations: [
        'invoiceDetails',
        'invoiceDetails.item',
        'invoiceDetails.item.unit',
        'invoiceDetails.orderDetail',
        'invoiceHeaderStatusHistories',
        'invoiceDetails.provider',
        'driver',
        'workhouse'
      ],

      order: {
        createAt: 'DESC',
      },
    });

    return invoices;
  }
  async getInvoiceById(id: number): Promise<InvoiceHeaders> {
    const invoice = await this.repository.findOne({
      where: { id },
      relations: [
        'invoiceDetails',
        'invoiceDetails.item',
        'invoiceDetails.item.unit',
        'invoiceDetails.orderDetail',
        'invoiceHeaderStatusHistories',
        'invoiceDetails.provider',
        'driver',
        'warehouse'
      ],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }

    return invoice;
  }

  async createInvoice(invoiceDto: CreateInvoiceDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {

      const result = await manager.getRepository(InvoiceNos)
        .createQueryBuilder("invoiceNo")
        .select("MAX(invoiceNo.no)", "max")
        .getRawOne();

      const nextInvoiceNo = result?.max ? Number(result.max) + 1 : 1;
      var invoiceNo = new InvoiceNos();
      invoiceNo.no = nextInvoiceNo;
      invoiceNo.createAt = new Date();
      invoiceNo.recordStatus = recordStatus.Active;
      invoiceNo.user = { id: userId } as Users;
      await manager.getRepository(InvoiceNos).save(invoiceNo);

      var invoice = new InvoiceHeaders();
      invoice.invoiceNo = nextInvoiceNo.toString().padStart(6, '0');
      invoice.docDate = invoiceDto.docDate;
      invoice.description = invoiceDto.description;
      invoice.status = invoiceStatus.Pending;
      invoice.createAt = new Date();
      invoice.recordStatus = recordStatus.Active;
      invoice.warehouse = { id: invoiceDto.warehouseId } as Warehouses;
      invoice.driver = { id: invoiceDto.driverId } as Drivers;
      invoice.driverVehicle = { id: invoiceDto.driverVehicleId } as DriverVehicles;

      invoice.user = { id: userId } as Users;



      var invoiceStatusHistory = new InvoiceHeaderStatusHistories();
      invoiceStatusHistory.invoiceHeader = invoice;
      invoiceStatusHistory.status = invoice.status;
      invoiceStatusHistory.createAt = new Date();
      invoiceStatusHistory.recordStatus = recordStatus.Active;
      invoiceStatusHistory.user = { id: userId } as Users;


      if (invoiceDto.invoiceDetails && invoiceDto.invoiceDetails.length > 0) {
        invoice.invoiceDetails = invoiceDto.invoiceDetails.map(dt => {
          const details = new InvoiceDetails();
          details.item = { id: dt.itemId } as Items;
          if (dt.orderDetailId) {
            details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          }
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.totalPrice = dt.quantity * dt.price;
          details.discountPercent = dt.discountPercent ?? 0;
          details.discountAmount = dt.discountAmount ?? 0;
          details.totalDiscount = Number(((details.totalPrice * details.discountPercent) / 100));
          details.totalNetPrice = details.totalPrice - details.totalDiscount;
          details.description = dt.description;
          details.firm = dt.firm;
          details.provider = { id: dt.providerId } as Providers;
          details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.invoiceHeader = invoice; // Set the invoiceHeader reference
          return details;
        });
      }

      invoice.totalDiscount = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalDiscount, 0);
      invoice.totalPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalPrice, 0);
      invoice.totalNetPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalNetPrice, 0);

      await manager.getRepository(InvoiceHeaders).save(invoice);
      await manager.getRepository(InvoiceHeaderStatusHistories).save(invoiceStatusHistory);
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: invoice.id,
        createdAt: invoice.createAt,
        type: 'invoice-to-warehouse',
      });
    });
  }
  async createInvoiceForStore(invoiceDto: CreateInvoiceForWorkhouseDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {

      const result = await manager.getRepository(InvoiceNos)
        .createQueryBuilder("invoiceNo")
        .select("MAX(invoiceNo.no)", "max")
        .getRawOne();

      const nextInvoiceNo = result?.max ? Number(result.max) + 1 : 1;
      var invoiceNo = new InvoiceNos();
      invoiceNo.no = nextInvoiceNo;
      invoiceNo.createAt = new Date();
      invoiceNo.recordStatus = recordStatus.Active;
      invoiceNo.user = { id: userId } as Users;
      await manager.getRepository(InvoiceNos).save(invoiceNo);

      var invoice = new InvoiceHeaders();
      invoice.invoiceNo = nextInvoiceNo.toString().padStart(6, '0');
      invoice.docDate = invoiceDto.docDate;
      invoice.description = invoiceDto.description;
      invoice.status = invoiceStatus.Pending;
      invoice.createAt = new Date();
      invoice.recordStatus = recordStatus.Active;
      invoice.workhouse = { id: invoiceDto.workhouseId } as Workhouses;
      invoice.driver = { id: invoiceDto.driverId } as Drivers;
      invoice.driverVehicle = { id: invoiceDto.driverVehicleId } as DriverVehicles;

      invoice.user = { id: userId } as Users;



      var invoiceStatusHistory = new InvoiceHeaderStatusHistories();
      invoiceStatusHistory.invoiceHeader = invoice;
      invoiceStatusHistory.status = invoice.status;
      invoiceStatusHistory.createAt = new Date();
      invoiceStatusHistory.recordStatus = recordStatus.Active;
      invoiceStatusHistory.user = { id: userId } as Users;


      if (invoiceDto.invoiceDetails && invoiceDto.invoiceDetails.length > 0) {
        invoice.invoiceDetails = invoiceDto.invoiceDetails.map(dt => {
          const details = new InvoiceDetails();
          details.item = { id: dt.itemId } as Items;
          if (dt.orderDetailId) {
            details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          }
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.totalPrice = dt.quantity * dt.price;
          details.discountPercent = dt.discountPercent ?? 0;
          details.discountAmount = dt.discountAmount ?? 0;
          details.totalDiscount = Number(((details.totalPrice * details.discountPercent) / 100));
          details.totalNetPrice = details.totalPrice - details.totalDiscount;
          details.description = dt.description;
          details.firm = dt.firm;
          details.provider = { id: dt.providerId } as Providers;
          details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.invoiceHeader = invoice; // Set the invoiceHeader reference
          return details;
        });
      }

      invoice.totalDiscount = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalDiscount, 0);
      invoice.totalPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalPrice, 0);
      invoice.totalNetPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalNetPrice, 0);

      await manager.getRepository(InvoiceHeaders).save(invoice);
      await manager.getRepository(InvoiceHeaderStatusHistories).save(invoiceStatusHistory);
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: invoice.id,
        createdAt: invoice.createAt,
        type: 'invoice-to-store',
      });
    });
  }
  async updateInvoice(invoiceDto: UpdateInvoiceDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const invoice = await manager.getRepository(InvoiceHeaders).findOne({
        where: { id: invoiceDto.id },
        relations: ['invoiceDetails', 'invoiceHeaderStatusHistories'], // تا جزئیات رو هم بیاره
      });

      if (!invoice) throw new NotFoundException('Invoice not found');
      if (invoice.status != invoiceStatus.Pending) throw new NotFoundException('Only pending invoices can be updated');


      invoice.docDate = invoiceDto.docDate ?? invoice.docDate;
      invoice.description = invoiceDto.description ?? invoice.description;
      invoice.warehouse = { id: invoiceDto.warehouseId ?? invoice.warehouse.id } as Warehouses;
      invoice.driver = { id: invoiceDto.driverId ?? invoice.driver.id } as Drivers;
      invoice.driverVehicle = { id: invoiceDto.driverVehicleId ?? invoice.driverVehicle.id } as DriverVehicles;


      // حذف جزئیات قبلی
      await manager.getRepository(InvoiceDetails).delete({
        invoiceHeader: { id: invoice.id },
      });

      // درج جزئیات جدید
      if (invoiceDto.invoiceDetails && invoiceDto.invoiceDetails.length > 0) {
        invoice.invoiceDetails = invoiceDto.invoiceDetails.map(dt => {
          const details = new InvoiceDetails();
          details.item = { id: dt.itemId } as Items;
          if (dt.orderDetailId) {
            details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          }
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.totalPrice = dt.quantity * dt.price;
          details.discountPercent = dt.discountPercent ?? 0;
          details.discountAmount = dt.discountAmount ?? 0;
          details.totalDiscount = ((details.totalPrice * details.discountPercent) / 100);
          details.totalNetPrice = details.totalPrice - details.totalDiscount;
          details.description = dt.description;
          details.firm = dt.firm;
          details.provider = { id: dt.providerId } as Providers;
          details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.invoiceHeader = invoice; // Set the invoiceHeader reference
          return details;
        });
      }

      invoice.totalDiscount = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalDiscount, 0);
      invoice.totalPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalPrice, 0);
      invoice.totalNetPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalNetPrice, 0);
      await manager.getRepository(InvoiceHeaders).save(invoice);
    });
  }
  async updateInvoiceForStore(invoiceDto: UpdateInvoiceWorkhouseDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const invoice = await manager.getRepository(InvoiceHeaders).findOne({
        where: { id: invoiceDto.id },
        relations: ['invoiceDetails', 'invoiceHeaderStatusHistories'], // تا جزئیات رو هم بیاره
      });

      if (!invoice) throw new NotFoundException('Invoice not found');
      if (invoice.status != invoiceStatus.Pending) throw new NotFoundException('Only pending invoices can be updated');

      invoice.docDate = invoiceDto.docDate ?? invoice.docDate;
      invoice.description = invoiceDto.description ?? invoice.description;
      invoice.workhouse = { id: invoiceDto.workhouseId ?? invoice.workhouse.id } as Workhouses;
      invoice.driver = { id: invoiceDto.driverId ?? invoice.driver.id } as Drivers;
      invoice.driverVehicle = { id: invoiceDto.driverVehicleId ?? invoice.driverVehicle.id } as DriverVehicles;


      // حذف جزئیات قبلی
      await manager.getRepository(InvoiceDetails).delete({
        invoiceHeader: { id: invoice.id },
      });

      // درج جزئیات جدید
      if (invoiceDto.invoiceDetails && invoiceDto.invoiceDetails.length > 0) {
        invoice.invoiceDetails = invoiceDto.invoiceDetails.map(dt => {
          const details = new InvoiceDetails();
          details.item = { id: dt.itemId } as Items;
          if (dt.orderDetailId) {
            details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          }
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.totalPrice = dt.quantity * dt.price;
          details.discountPercent = dt.discountPercent ?? 0;
          details.discountAmount = dt.discountAmount ?? 0;
          details.totalDiscount = ((details.totalPrice * details.discountPercent) / 100);
          details.totalNetPrice = details.totalPrice - details.totalDiscount;
          details.description = dt.description;
          details.firm = dt.firm;
          details.provider = { id: dt.providerId } as Providers;
          details.orderDetail = { id: dt.orderDetailId } as OrderDetails;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.invoiceHeader = invoice; // Set the invoiceHeader reference
          return details;
        });
      }
      invoice.totalDiscount = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalDiscount, 0);
      invoice.totalPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalPrice, 0);
      invoice.totalNetPrice = invoice.invoiceDetails.reduce((acc, detail) => acc + detail.totalNetPrice, 0);

      await manager.getRepository(InvoiceHeaders).save(invoice);
    });
  }

  async deleteInvoice(invoiceId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const invoice = await manager.getRepository(InvoiceHeaders).findOne({
        where: { id: invoiceId },
        relations: ['invoiceDetails', 'invoiceHeaderStatusHistories'],
      });

      if (!invoice) throw new NotFoundException('Invoice not found');
      if (invoice.status != invoiceStatus.Pending) throw new NotFoundException('Only pending invoices can be deleted');
      
      await manager.getRepository(InvoiceHeaderStatusHistories).delete({
        invoiceHeader: { id: invoice.id },
      });
      await manager.getRepository(InvoiceDetails).delete({
        invoiceHeader: { id: invoice.id },
      });

      await manager.getRepository(InvoiceHeaders).delete(invoice.id);
    });
  }


}

