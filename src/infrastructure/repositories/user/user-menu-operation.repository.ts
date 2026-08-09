import {  Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { UserMenuOperations } from 'src/domain/entities/UserMenuOperations';




@Injectable()
export class UserMenuOperationRepository extends BaseRepository<UserMenuOperations> {
  constructor(@InjectRepository(UserMenuOperations) repository: Repository<UserMenuOperations>) {
    super(repository);
  }
  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ mainUser: { id: userId } });
  }


}
