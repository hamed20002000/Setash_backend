import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { SystemOperationRepository } from 'src/infrastructure/repositories/admin/system-operation.repository';
import { ProductTypes } from 'src/domain/entities/ProductTypes';
import { ProductTypeRepository } from 'src/infrastructure/repositories/admin/product-type.repository';

@Injectable()
export class ProductTypeService extends BaseService<ProductTypes> {
  constructor(

    private readonly productTypeRepository: ProductTypeRepository,
  ) {
    super(productTypeRepository);
  } 
 
}