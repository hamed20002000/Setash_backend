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

@Injectable()
export class OrderService extends BaseService<OrderHeaders> {
  constructor(

    private readonly orderRepository: OrderRepository,
  ) {
    super(orderRepository);
  }

  async getAllOrders(): Promise<OrderHeaders[]> {
    return this.orderRepository.getAllOrders();
  }

  async getAllOrderByWorkhouse(workhouseId: number): Promise<OrderHeaders[]> {
    return this.orderRepository.getAllOrderByWorkhouse(workhouseId);
  }
  async getOrderById(id: number): Promise<OrderHeaders> {
    return this.orderRepository.getOrderById(id);
  }
  async createOrder(orderDto: CreateOrderDto, userId: string): Promise<void> {
    return this.orderRepository.createOrder(orderDto, userId);
  }

  async updateOrder(orderDto: UpdateOrderDto, userId: string): Promise<void> {
    return this.orderRepository.updateOrder(orderDto, userId);
  }
  async deleteOrder(orderId: number): Promise<void> {
    return this.orderRepository.deleteOrder(orderId);
  }
}