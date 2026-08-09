import { Injectable } from '@nestjs/common';
import { DataSource, TreeRepository } from 'typeorm';
import { BaseRepository } from '../base.repository';
import { Categories } from 'src/domain/entities/Categories';
import { Regions } from 'src/domain/entities/Regions';

@Injectable()
export class RegionRepository extends BaseRepository<Regions> {
    private readonly treeRepository: TreeRepository<Regions>;

    constructor(private readonly dataSource: DataSource) {
        const treeRepo = dataSource.getTreeRepository(Regions);
        super(treeRepo);
        this.treeRepository = treeRepo;
    }


    async findAllTrees(): Promise<Regions[]> {
        return this.treeRepository.findTrees();
    }

    async findDescendants(id: number): Promise<Regions> {
        const node = await this.treeRepository.findOneBy({ id: id });
        if (!node) {
            throw new Error('Region not found');
        }
        return this.treeRepository.findDescendantsTree(node);
    }
    async updateChildrenDepth(id: number): Promise<void> {
        const parent = await this.treeRepository.findOneBy({ id });
        if (!parent) {
            throw new Error('Region not found');
        }
        const tree = await this.treeRepository.findDescendantsTree(parent);

        const updateDepth = async (node: Regions, parentDepth: number) => {
            if (node.regions && node.regions.length > 0) {
                for (const child of node.regions) {
                    child.depth = parentDepth + 1;
                    await this.treeRepository.save(child);
                    await updateDepth(child, child.depth);
                }
            }
        };

        await updateDepth(tree, parent.depth ?? 0);
    }
   }
