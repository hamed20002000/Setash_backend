import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { Categories } from 'src/domain/entities/Categories';
import { CategoryRepository } from 'src/infrastructure/repositories/admin/category.repository';
import { CategoryListDto } from 'src/presentation/dtos/baseinfo/category-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService extends BaseService<Categories> {
    constructor(

        private readonly categoryRepository: CategoryRepository,
    ) {
        super(categoryRepository);
    }

    async findAllTrees(): Promise<CategoryListDto[]> {
        const trees = await this.categoryRepository.findAllTrees();
        return plainToInstance(CategoryListDto, trees, { excludeExtraneousValues: true });
    }

    async findDescendants(id: number): Promise<CategoryListDto> {
        const node = await this.categoryRepository.findById(id);
        if (!node) throw new Error('Not Found');
        const tree = await this.categoryRepository.findDescendants(id);
        return plainToInstance(CategoryListDto, tree, { excludeExtraneousValues: true });
    }

    async updateChildrenDepth(id: number): Promise<void> {
        await this.categoryRepository.updateChildrenDepth(id);
    }
}