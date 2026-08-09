import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { NotificationLists } from 'src/domain/entities/NotificationLists';

@Injectable()
export class NotificationListRepository extends BaseRepository<NotificationLists> {
  constructor(@InjectRepository(NotificationLists) repository: Repository<NotificationLists>) {
    super(repository);
  }
}
