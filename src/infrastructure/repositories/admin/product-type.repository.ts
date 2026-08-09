import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { ProductTypes } from 'src/domain/entities/ProductTypes';

@Injectable()
export class ProductTypeRepository extends BaseRepository<ProductTypes> {
  constructor(@InjectRepository(ProductTypes) repository: Repository<ProductTypes>) {
    super(repository);
  }
  
}
