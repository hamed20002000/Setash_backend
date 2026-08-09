import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { RoleNotificationLists } from 'src/domain/entities/RoleNotificationLists';

@Injectable()
export class RoleNotificationListRepository extends BaseRepository<RoleNotificationLists> {
  constructor(@InjectRepository(RoleNotificationLists) repository: Repository<RoleNotificationLists>) {
    super(repository);
  }

  async findByRoleIdAndNotificationListIds(roleId: number, notificationListIds: number[]): Promise<RoleNotificationLists[]> {
    if (notificationListIds.length === 0) {
      return [];
    }

    return this.repository.find({
      where: {
        role: { id: roleId },
        notificationList: { id: In(notificationListIds) },
      },
      relations: {
        role: true,
        notificationList: true,
      },
    });
  }

  async deleteByRoleIdAndNotificationListIds(roleId: number, notificationListIds: number[]): Promise<void> {
    if (notificationListIds.length === 0) {
      await this.repository.delete({ role: { id: roleId } } as any);
      return;
    }

    const items = await this.findByRoleIdAndNotificationListIds(roleId, notificationListIds);
    await this.repository.remove(items);
  }
}
