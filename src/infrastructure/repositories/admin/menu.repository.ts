import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ItemUnits } from 'src/domain/entities/ItemUnits';
import { Items } from 'src/domain/entities/Items';
import { Menus } from 'src/domain/entities/Menus';

@Injectable()
export class MenuRepository extends BaseRepository<Menus> {
  private readonly treeRepository: TreeRepository<Menus>;


  constructor(private readonly dataSource: DataSource) {
    const treeRepo = dataSource.getTreeRepository(Menus);
    super(treeRepo);
    this.treeRepository = treeRepo;
    
  }



  async findAllTrees(): Promise<Menus[]> {
    return this.treeRepository.findTrees();
  }
  async findAllTreesWithOperations(): Promise<Menus[]> {
    return this.treeRepository.findTrees({
      relations: [
        'parent',
        'menuOperations',
        'menuOperations.systemOperation'
      ]
    } as any); 
  }

  async findDescendants(id: number): Promise<Menus> {
    const node = await this.treeRepository.findOneBy({ id: id });
    if (!node) {
      throw new Error('menu not found');
    }
    return this.treeRepository.findDescendantsTree(node);
  }
  async findDescendantsWithOperations(id: number): Promise<Menus> {
    const node = await this.treeRepository.findOneBy({ id: id });
    if (!node) {
      throw new Error('menu not found');
    }
    return this.treeRepository.findDescendantsTree(node,{
      relations: [
        'parent',
        'menuOperations',
        'menuOperations.systemOperation'
      ]
    } as any);
  }
  async updateChildrenDepth(id: number): Promise<void> {
    const parent = await this.treeRepository.findOneBy({ id });
    if (!parent) {
      throw new Error('Category not found');
    }
    const tree = await this.treeRepository.findDescendantsTree(parent);

    const updateDepth = async (node: Menus, parentDepth: number) => {
      if (node.menus && node.menus.length > 0) {
        for (const child of node.menus) {
          child.depth = parentDepth + 1;
          await this.treeRepository.save(child);
          await updateDepth(child, child.depth);
        }
      }
    };

    await updateDepth(tree, parent.depth ?? 0);
  }

  async getMenuWithOperations(menuId: number): Promise<Menus> {
    return this.repository.findOne({
      where: { id: menuId },
      relations: ['menuOperations', 'menuOperations.systemOperation'],
    } as any); // اضافه کردن as any برای رفع خطای تایپ اسکریپت
  }
}
