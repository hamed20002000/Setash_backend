import { Repository, FindOptionsWhere, FindManyOptions, FindOptionsSelect, FindOptionsRelations, DeepPartial, Long } from 'typeorm';


import { IRepository } from '../../domain/interfaces/repository.interface';
import { Specification } from 'src/domain/specifications/base.specification';


export class BaseRepository<T> implements IRepository<T> {
  constructor(readonly repository: Repository<T>) { }

  findById(id: number): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>, // Explicit cast
    });
  }

  findByStringId(id: string): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>, // Explicit cast
    });
  }

  async findWithSpecification(
    specification?: Specification<T> | null,
    options?: FindManyOptions<T>,
    select?: FindOptionsSelect<T>,
    relations?: FindOptionsRelations<T> // Optional relations parameter
  ): Promise<T[]> {
    const whereClause = specification
      ? (specification.toWhereClause() as FindOptionsWhere<T>)
      : undefined;

    // Merge options for select and relations
    const queryOptions: FindManyOptions<T> = {
      ...options,
      where: whereClause,
      select: select || undefined,  // Use the provided select, or undefined if not provided
      relations: relations || undefined,  // Include the relations if provided
    };

    return this.repository.find(queryOptions);
  }

  findAllRecords(): Promise<T[]> {
    return this.repository.find();
  }

  add(entity: T): Promise<T> {
    
    return this.repository.save(entity);
  }
  async addMany(entities: T[]): Promise<T[]> {
    return this.repository.save(entities);
  }
  update(entity: T): Promise<T> {
    return this.repository.save(entity);
  }
 async updateMany(entities: T[]): Promise<T[]> {
    return this.repository.save(entities);
  }
  async findAndUpdate(id: any, updateData: DeepPartial<T>): Promise<void> {
    await this.repository.update(id, updateData as any);
  }

  async saveOrUpdateArray(entities: T[]): Promise<T[]> {
    return await this.repository.save(entities);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }



 
}
