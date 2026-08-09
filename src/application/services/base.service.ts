
import { IRepository } from '../../domain/interfaces/repository.interface';
import { Specification } from 'src/domain/specifications/base.specification';
import { IService } from 'src/domain/interfaces/service.interface';
import { FindManyOptions, FindOptionsRelations, FindOptionsSelect } from 'typeorm';


export class BaseService<T> implements IService<T> {
  constructor(private readonly repository: IRepository<T>) { }
  async getById(id: number): Promise<T> {
    return await this.repository.findById(id);
  }
  async getByStringId(id: string): Promise<T> {
    return await this.repository.findByStringId(id);
  }
  async getWithSpecification(specification: Specification<T>, options?: FindManyOptions<T>, select?: FindOptionsSelect<T>,relations?: FindOptionsRelations<T>): Promise<T[]> {
    return await this.repository.findWithSpecification(specification,options,select,relations);
  }


  async getAllRecords(): Promise<T[]> {


    return await this.repository.findAllRecords();
  }

  async add(entity: T): Promise<T> {
    return await this.repository.add(entity);
  }

  async addMany(entities: T[]): Promise<T[]> {
    return await this.repository.addMany(entities);
  }

  async update(entity: T): Promise<T> {
    return await this.repository.update(entity);
  }

   async updateMany(entities: T[]): Promise<T[]> {
    return await this.repository.updateMany(entities);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

 

}
