import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Categories } from 'src/domain/entities/Categories';
import { CategoryRepository } from 'src/infrastructure/repositories/admin/category.repository';
import { CategoryListDto } from 'src/presentation/dtos/baseinfo/category-dto';
import { plainToInstance } from 'class-transformer';
import { Regions } from 'src/domain/entities/Regions';
import { RegionRepository } from 'src/infrastructure/repositories/admin/region.repository';
import { RegionListDto } from 'src/presentation/dtos/baseinfo/region-dto';

@Injectable()
export class RegionService extends BaseService<Regions> {
    constructor(

        private readonly regionRepository: RegionRepository,
    ) {
        super(regionRepository);
    }

    async findAllTrees(): Promise<RegionListDto[]> {
        const trees = await this.regionRepository.findAllTrees();
        return plainToInstance(RegionListDto, trees, { excludeExtraneousValues: true });
    }

    async findDescendants(id: number): Promise<RegionListDto> {
        const node = await this.regionRepository.findById(id);
        if (!node) throw new Error('Not Found');
        const tree = await this.regionRepository.findDescendants(id);
        return plainToInstance(RegionListDto, tree, { excludeExtraneousValues: true });
    }

    async updateChildrenDepth(id: number): Promise<void> {
        await this.regionRepository.updateChildrenDepth(id);
    }
}