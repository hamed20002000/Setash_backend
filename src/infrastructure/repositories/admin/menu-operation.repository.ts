import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { MenuOperations } from 'src/domain/entities/MenuOperations';

@Injectable()
export class MenuOperationRepository extends BaseRepository<MenuOperations> {
  constructor(@InjectRepository(MenuOperations) repository: Repository<MenuOperations>) {
    super(repository);
  }
  async deleteByMenuId(menuId: number): Promise<void> {
    await this.repository.delete({ menu: { id: menuId } });
  }

}
