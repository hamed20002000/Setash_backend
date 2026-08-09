import {  Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';

import { UserRoles } from 'src/domain/entities/UserRoles';



@Injectable()
export class UserRoleRepository extends BaseRepository<UserRoles> {
  constructor(@InjectRepository(UserRoles) repository: Repository<UserRoles>) {
    super(repository);
  }
  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ assigendUser: { id: userId } });
  }
async userRoles(userId: string): Promise<UserRoles[]> {
    return this.repository.find({
      where: { assigendUser: { id: userId } },
      relations: ['role', 'assigendUser'],
    });
  }

}
