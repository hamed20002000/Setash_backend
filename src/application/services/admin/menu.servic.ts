import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { ItemUnitRepository } from 'src/infrastructure/repositories/admin/item-unit.repository';
import { Items } from 'src/domain/entities/Items';
import { ItemRepository } from 'src/infrastructure/repositories/admin/item.repository';
import { Menus } from 'src/domain/entities/Menus';
import { MenuRepository } from 'src/infrastructure/repositories/admin/menu.repository';
import { MenuListDto } from 'src/presentation/dtos/baseinfo/menu-dto';
import { plainToInstance } from 'class-transformer';
import { RoleMenuOperations } from 'src/domain/entities/RoleMenuOperations';
import { MenuOperationRepository } from 'src/infrastructure/repositories/admin/menu-operation.repository';
import { MenuOperations } from 'src/domain/entities/MenuOperations';

@Injectable()
export class MenuService extends BaseService<Menus> {
  constructor(

    private readonly menuRepository: MenuRepository,
    private readonly menuOperationRepository: MenuOperationRepository,
  ) {
    super(menuRepository);
  }

  async findAllTrees(): Promise<MenuListDto[]> {
    const trees = await this.menuRepository.findAllTrees();
    return plainToInstance(MenuListDto, trees, { excludeExtraneousValues: true });
  }
  async findAllTreesWithOperations(): Promise<Menus[]> {
    const trees = await this.menuRepository.findAllTreesWithOperations();
    return trees;
  }
  async findDescendants(id: number): Promise<MenuListDto> {
    const node = await this.menuRepository.findById(id);
    if (!node) throw new Error('Not Found');
    const tree = await this.menuRepository.findDescendants(id);
    return plainToInstance(MenuListDto, tree, { excludeExtraneousValues: true });
  }
  async findDescendantsWithOperations(id: number): Promise<Menus> {
    const node = await this.menuRepository.findById(id);
    if (!node) throw new Error('Not Found');
    const tree = await this.menuRepository.findDescendantsWithOperations(id);
    return tree;
  }


  async updateChildrenDepth(id: number): Promise<void> {
    await this.menuRepository.updateChildrenDepth(id);
  }

  async assignOperationsToMenu(roleId: number, items: MenuOperations[]): Promise<void> {
    // حذف عملیات قبلی مرتبط با این Role
    await this.menuOperationRepository.deleteByMenuId(roleId);
    // ذخیره عملیات جدید
    await this.menuOperationRepository.addMany(items);
  }

  async getMenuWithOperations(menuId: number): Promise<Menus> {
    return this.menuRepository.getMenuWithOperations(menuId);
  }

}