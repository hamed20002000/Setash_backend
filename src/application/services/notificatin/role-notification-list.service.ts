import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { RoleNotificationListRepository } from 'src/infrastructure/repositories/notification/role-notification-list.repository';

@Injectable()
export class RoleNotificationListService extends BaseService<RoleNotificationLists> {
  constructor(private readonly roleNotificationListRepository: RoleNotificationListRepository) {
    super(roleNotificationListRepository);
  }

  async getAssigned(roleId: number, notificationListIds: number[]): Promise<RoleNotificationLists[]> {
    return this.roleNotificationListRepository.findByRoleIdAndNotificationListIds(roleId, notificationListIds);
  }

  async unassign(roleId: number, notificationListIds: number[]): Promise<void> {
    await this.roleNotificationListRepository.deleteByRoleIdAndNotificationListIds(roleId, notificationListIds);
  }
}
