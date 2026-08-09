import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { NotificationListRepository } from 'src/infrastructure/repositories/notification/notification-list.repository';

@Injectable()
export class NotificationListService extends BaseService<NotificationLists> {
  constructor(private readonly notificationListRepository: NotificationListRepository) {
    super(notificationListRepository);
  }
}
