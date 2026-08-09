import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { UserNotificationListRepository } from 'src/infrastructure/repositories/notification/user-notification-list.repository';

@Injectable()
export class UserNotificationListService extends BaseService<UserNotificationLists> {
  constructor(private readonly userNotificationListRepository: UserNotificationListRepository) {
    super(userNotificationListRepository);
  }

  async getAssigned(userId: string, notificationListIds: number[]): Promise<UserNotificationLists[]> {
    return this.userNotificationListRepository.findByUserIdAndNotificationListIds(userId, notificationListIds);
  }

  async unassign(userId: string, notificationListIds: number[]): Promise<void> {
    await this.userNotificationListRepository.deleteByUserIdAndNotificationListIds(userId, notificationListIds);
  }
}
