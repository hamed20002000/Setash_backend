import { FindManyOptions, FindOptionsRelations, FindOptionsSelect } from "typeorm";
import { Specification } from "../specifications/base.specification";

export interface IService<T> {
  getById(id: number): Promise<T | null>;
   getByStringId(id: string): Promise<T | null>;
  getAllRecords(): Promise<T[]>;
  add(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
    updateMany(entities: T[]): Promise<T[]>;
  delete(id: number): Promise<void>;
  getWithSpecification(
    specification?: Specification<T> | null,
    options?: FindManyOptions<T>,
    select?: FindOptionsSelect<T>,
    relations?: FindOptionsRelations<T>
  ): Promise<T[]>;
}