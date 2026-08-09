import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from 'socket.io';
import { NotificationLists } from 'src/domain/entities/NotificationLists';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';
import { SystemNotifications } from 'src/domain/entities/SystemNotifications';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';
import { UserRoles } from 'src/domain/entities/UserRoles';
import { recordStatus } from 'src/domain/enums/recordstatus.enum';
import { Repository } from 'typeorm';
import { SystemNotificationsService } from './systemNotifications.service';

@WebSocketGateway({
  cors: { origin: ['http://localhost:5173'], credentials: false },
  path: '/socket.io',
  transports: ['websocket', 'polling'],
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly systemNotificationsService: SystemNotificationsService,
    @InjectRepository(NotificationLists)
    private readonly notificationListRepository: Repository<NotificationLists>,
    @InjectRepository(RoleNotificationLists)
    private readonly roleNotificationListRepository: Repository<RoleNotificationLists>,
    @InjectRepository(UserNotificationLists)
    private readonly userNotificationListRepository: Repository<UserNotificationLists>,
    @InjectRepository(UserRoles)
    private readonly userRoleRepository: Repository<UserRoles>,
  ) {}

  async notifyRole(roles: string | string[], event: string, data: any): Promise<void> {
    const roleList = Array.isArray(roles) ? roles : [roles];
    const notificationList = await this.notificationListRepository.findOne({
      where: { name: data.type },
    });

    if (!notificationList) {
      return;
    }

    const roleAssignments = await this.roleNotificationListRepository.find({
      where: {
        notificationList: { id: notificationList.id },
      },
      relations: {
        role: true,
      },
    });

    const allowedRoleNames = roleAssignments
      .map((item) => item.role?.name)
      .filter((roleName) => roleName && roleList.includes(roleName));

    const userAssignments = await this.userNotificationListRepository.find({
      where: {
        notificationList: { id: notificationList.id },
      },
      relations: {
        assignedUser: true,
      },
    });

    const userRoleAssignments = allowedRoleNames.length
      ? await this.userRoleRepository.find({
          where: allowedRoleNames.map((roleName) => ({
            role: { name: roleName },
          })),
          relations: {
            assigendUser: true,
            role: true,
          },
        })
      : [];

    const targets = new Map<string, { userId: string; roles: Set<string> }>();

    for (const item of userAssignments) {
      if (!item.assignedUser?.id) {
        continue;
      }

      targets.set(item.assignedUser.id, {
        userId: item.assignedUser.id,
        roles: new Set<string>(),
      });
    }

    for (const item of userRoleAssignments) {
      if (!item.assigendUser?.id || !item.role?.name) {
        continue;
      }

      const target = targets.get(item.assigendUser.id) || {
        userId: item.assigendUser.id,
        roles: new Set<string>(),
      };
      target.roles.add(item.role.name);
      targets.set(item.assigendUser.id, target);
    }

    const notifications: SystemNotifications[] = [];
    const createdAt = data.createdAt || new Date();

    for (const target of targets.values()) {
      const roleNames = Array.from(target.roles);
      const notification = new SystemNotifications();
      notification.role = roleNames.length ? roleNames.join(',') : '';
      notification.userId = target.userId;
      notification.type = data.type;
      notification.idValue = data.id;
      notification.recordStatus = recordStatus.Active;
      notification.createAt = createdAt;
      notification.warehouseId = data.warehouseId || null;
      notification.storeId = data.storeId || null;
      notification.projectId = data.projectId || null;
      notifications.push(notification);

      this.server.to(`user:${target.userId}`).emit(event, data);
    }

    if (notifications.length) {
      await this.systemNotificationsService.addMany(notifications);
    }
  }

  async notifyUsers(userIds: string | string[], event: string, data: any): Promise<void> {
    const userIdList = Array.isArray(userIds) ? userIds : [userIds];
    const createdAt = data.createdAt || new Date();
    const notifications: SystemNotifications[] = [];

    for (const userId of userIdList) {
      const notification = new SystemNotifications();
      notification.role = data.role || '';
      notification.userId = userId;
      notification.type = data.type;
      notification.idValue = data.id;
      notification.recordStatus = recordStatus.Active;
      notification.createAt = createdAt;
      notification.warehouseId = data.warehouseId || null;
      notification.storeId = data.storeId || null;
      notification.projectId = data.projectId || null;
      notifications.push(notification);

      this.server.to(`user:${userId}`).emit(event, {
        ...data,
        createdAt,
        recordStatus: recordStatus.Active,
      });
    }

    if (notifications.length) {
      await this.systemNotificationsService.addMany(notifications);
    }
  }

  handleConnection(client: any) {
    let roles = client.handshake.query.role;
    const userId = client.handshake.query.userId;

    if (userId && typeof userId === 'string') {
      client.join(`user:${userId}`);
    }

    if (!roles) {
      return;
    }

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    roles.forEach((role) => {
      client.join(role);
    });
  }

  handleDisconnect(client: any) {
  }
}
