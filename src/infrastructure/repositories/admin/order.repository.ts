import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { Items } from 'src/domain/entities/Items';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { OrderHeaders } from 'src/domain/entities/OrderHeaders';
import { CreateOrderDto, UpdateOrderDto } from 'src/presentation/dtos/initial-operations/order-dto';
import { Networks } from 'src/domain/entities/Networks';
import { OrderDetails } from 'src/domain/entities/OrderDetails';
import { Users } from 'src/domain/entities/Users';
import { orderStatus } from 'src/domain/enums/orderStatus.enum';
import { OrderHeaderStatusHistories } from 'src/domain/entities/OrderHeaderStatusHistories';
import { NotificationsGateway } from 'src/application/services/notificatin/notifications.gateway';
import { Requests } from 'src/domain/entities/Requests';
import { Workhouses } from 'src/domain/entities/Workhouses';


@Injectable()
export class OrderRepository extends BaseRepository<OrderHeaders> {
  constructor(@InjectRepository(OrderHeaders) repository: Repository<OrderHeaders>, private readonly dataSource: DataSource,
    private readonly gateway: NotificationsGateway,
  ) {
    super(repository);
  }
  async getAllOrders(): Promise<OrderHeaders[]> {
    const orders = await this.repository.find({
      relations: [
        'orderDetails',
        'orderDetails.item',
        'orderDetails.item.unit',
        'orderHeaderStatusHistories',
        'orderHeaderStatusHistories.user',
        'network',
        'request',
        'workhouse',
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return orders;
  }

  async getAllOrderByWorkhouse(workhouseId: number): Promise<OrderHeaders[]> {
    const orders = await this.repository.find({
      where: {
        workhouse: { id: workhouseId },
      },
      relations: [
        'orderDetails',
        'orderDetails.item',
        'orderDetails.item.unit',
        'orderHeaderStatusHistories',
        'orderHeaderStatusHistories.user',
        'network',
        'request',
        'workhouse',
      ],
      order: {
        createAt: 'DESC',
      },
    });

    return orders;
  }
  async getOrderById(id: number): Promise<OrderHeaders> {
    const order = await this.repository.findOne({
      where: { id },
      relations: [
        'orderDetails',
        'orderDetails.item',
        'orderDetails.item.unit',
        'orderHeaderStatusHistories',
        'orderHeaderStatusHistories.user',
        'network',
        'request',
      ],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async createOrder(orderDto: CreateOrderDto, userId: string): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      var order = new OrderHeaders();
      order.docDate = orderDto.docDate;
      order.status = orderStatus.Pending;
      order.createAt = new Date();
      order.recordStatus = recordStatus.Active;
      if (orderDto.networkId)
        order.network = { id: orderDto.networkId } as Networks;
      if (orderDto.workhouseId)
        order.workhouse = { id: orderDto.workhouseId } as Workhouses;
      order.description = orderDto.description;
      if (orderDto.requestId)
        order.request = { id: orderDto.requestId } as Requests;
      order.user = { id: userId } as Users;


      if (orderDto.orderDetails && orderDto.orderDetails.length > 0) {
        order.orderDetails = orderDto.orderDetails.map(dt => {
          const details = new OrderDetails();
          details.item = { id: dt.itemId } as Items;
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          details.orderHeader = order; // Set the orderHeader reference
          return details;
        });
      }

      const savedOrder = await manager.getRepository(OrderHeaders).save(order);
      var orderStatusHistory = new OrderHeaderStatusHistories();
      orderStatusHistory.orderHeader = savedOrder;
      orderStatusHistory.status = savedOrder.status;
      orderStatusHistory.createAt = new Date();
      orderStatusHistory.recordStatus = recordStatus.Active;
      orderStatusHistory.user = { id: userId } as Users;
      await manager.getRepository(OrderHeaderStatusHistories).save(orderStatusHistory);
      // Notify admins about the new order
      this.gateway.notifyRole(['admin'], 'new-notify', {
        id: order.id,
        createdAt: order.createAt,
        type: 'order',
      });
    });
  }

  async updateOrder(orderDto: UpdateOrderDto, userId: string): Promise<void> {


    await this.dataSource.transaction(async (manager: EntityManager) => {
      const order = await manager.getRepository(OrderHeaders).findOne({
        where: { id: orderDto.id },
        relations: ['orderDetails', 'orderHeaderStatusHistories'], // تا جزئیات رو هم بیاره
      });

      if (!order) throw new NotFoundException('Order not found');
       if (order.status != orderStatus.Pending) throw new NotFoundException('Only pending orders can be updated');

      order.docDate = orderDto.docDate ?? order.docDate;
      order.description = orderDto.description ?? order.description;

      if (orderDto.networkId) order.network = { id: orderDto.networkId } as Networks;
      if (orderDto.workhouseId) order.workhouse = { id: orderDto.workhouseId } as Workhouses;
      if (orderDto.requestId) order.request = { id: orderDto.requestId } as Requests;

      // حذف جزئیات قبلی
      await manager.getRepository(OrderDetails).delete({
        orderHeader: { id: order.id },
      });

      // درج جزئیات جدید
      if (orderDto.orderDetails && orderDto.orderDetails.length > 0) {
        order.orderDetails = orderDto.orderDetails.map(dt => {
          const details = new OrderDetails();
          details.item = { id: dt.itemId } as Items;
          details.quantity = dt.quantity;
          details.price = dt.price;
          details.description = dt.description;
          details.createAt = new Date();
          details.recordStatus = recordStatus.Active;
          details.user = { id: userId } as Users;
          return details;
        });
      }


      await manager.getRepository(OrderHeaders).save(order);
    });
  }

  async deleteOrder(orderId: number): Promise<void> {
    await this.dataSource.transaction(async (manager: EntityManager) => {
      const order = await manager.getRepository(OrderHeaders).findOne({
        where: { id: orderId },
        relations: ['orderDetails', 'orderHeaderStatusHistories'],
      });

      if (!order) throw new NotFoundException('Order not found');
      if (order.status != orderStatus.Pending) throw new NotFoundException('Only pending orders can be deleted');
      await manager.getRepository(OrderHeaderStatusHistories).delete({
        orderHeader: { id: order.id },
      });
      await manager.getRepository(OrderDetails).delete({
        orderHeader: { id: order.id },
      });

      await manager.getRepository(OrderHeaders).delete(order.id);
    });
  }


}

