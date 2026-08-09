import { plainToInstance, ClassTransformOptions } from 'class-transformer';

export class GenericMapper {
  static toEntity<T, U>(entityClass: new () => T, dto: U, options?: ClassTransformOptions): T {
    return plainToInstance(entityClass, dto, options);
  }

  static toDto<T, U>(dtoClass: new () => T, entity: U, options?: ClassTransformOptions): T {
    return plainToInstance(dtoClass, entity, options);
  }

    // Mapping a list of entities to DTOs
    static toEntityList<T, U>(entityClass: new () => T, dtoList: U[], options?: ClassTransformOptions): T[] {
      return dtoList.map(dto => plainToInstance(entityClass, dto, options));
    }
  
    // Mapping a list of DTOs to entities
    static toDtoList<T, U>(dtoClass: new () => T, entityList: U[], options?: ClassTransformOptions): T[] {
      return entityList.map(entity => plainToInstance(dtoClass, entity, options));
    }
}
