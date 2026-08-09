import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { UserNotificationLists } from 'src/domain/entities/UserNotificationLists';

@Injectable()
export class UserNotificationListRepository extends BaseRepository<UserNotificationLists> {
  constructor(@InjectRepository(UserNotificationLists) repository: Repository<UserNotificationLists>) {
    super(repository);
  }

  async findByUserIdAndNotificationListIds(userId: string, notificationListIds: number[]): Promise<UserNotificationLists[]> {
    if (notificationListIds.length === 0) {
      return [];
    }

    return this.repository.find({
      where: {
        assignedUser: { id: userId },
        notificationList: { id: In(notificationListIds) },
      },
      relations: {
        assignedUser: true,
        notificationList: true,
      },
    });
  }

  async deleteByUserIdAndNotificationListIds(userId: string, notificationListIds: number[]): Promise<void> {
    if (notificationListIds.length === 0) {
      await this.repository.delete({ assignedUser: { id: userId } } as any);
      return;
    }

    const items = await this.findByUserIdAndNotificationListIds(userId, notificationListIds);
    await this.repository.remove(items);
  }
}
