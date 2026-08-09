// notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { SystemNotificationsService } from './systemNotifications.service';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { SystemNotificationsRepository } from 'src/infrastructure/repositories/notification/system-notifications.repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { UserRoles } from 'src/domain/entities/UserRoles';

@Module({
  imports: [TypeOrmModule.forFeature([SystemNotifications, NotificationLists, RoleNotificationLists, UserNotificationLists, UserRoles])],
  providers: [NotificationsGateway,SystemNotificationsService,SystemNotificationsRepository],
  exports: [NotificationsGateway,SystemNotificationsService,SystemNotificationsRepository],
})
export class NotificationsModule {}
