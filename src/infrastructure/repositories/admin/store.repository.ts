import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { WorkhouseDetails } from 'src/domain/entities/WorkhouseDetails';
import { Warehouses } from 'src/domain/entities/Warehouses';
import { WarehouseOperations } from 'src/domain/enums/warehouse-op.enum';
import { WarehouseTransactions } from 'src/domain/entities/WarehouseTransactions';
import { InjectRepository as InjectTypeOrmRepository } from '@nestjs/typeorm';
import { Stores } from 'src/domain/entities/Stores';
import { StoreTransactions } from 'src/domain/entities/StoreTransactions';
@Injectable()
export class StoreRepository extends BaseRepository<Stores> {
  constructor(@InjectRepository(Stores) repository: Repository<Stores>,
    @InjectTypeOrmRepository(StoreTransactions) private readonly storeTransactionsRepository: Repository<StoreTransactions>
  ) {
    super(repository);
  }
  async getItemBalances(storeId: number, itemId: number) {
    const result = await this.storeTransactionsRepository
      .createQueryBuilder("wt")
      .select('"wt"."ItemId"', "itemId")
      .addSelect('"i"."Code"', "code")
      .addSelect('"i"."Name"', "name")
      .addSelect(
        `
      SUM(
        CASE 
          WHEN "wt"."Operation" = :inOperation THEN "wt"."Quantity"
          WHEN "wt"."Operation" = :outOperation THEN -"wt"."Quantity"
          ELSE 0
        END
      )
    `,
        "balance"
      )
      .innerJoin("wt.item", "i") // join به جدول Items
      .where('"wt"."StoreId" = :storeId', { storeId })
      .andWhere('"wt"."ItemId" = :itemId', { itemId })
      .setParameters({
        inOperation: WarehouseOperations.In,
        outOperation: WarehouseOperations.Out,
      })
      .groupBy('"wt"."ItemId"')
      .addGroupBy('"i"."Code"')
      .addGroupBy('"i"."Name"')
      .getRawOne();

    return result;
  }

  async getStoreAllItemsBalances(storeId: number) {
    const result = await this.storeTransactionsRepository
      .createQueryBuilder("wt")
      .select('"wt"."ItemId"', "itemId")
      .addSelect('"i"."Code"', "code")
      .addSelect('"i"."Name"', "name")
      .addSelect(
        `
      SUM(
        CASE 
          WHEN "wt"."Operation" = :inOperation THEN "wt"."Quantity"
          WHEN "wt"."Operation" = :outOperation THEN -"wt"."Quantity"
          ELSE 0
        END
      )
    `,
        "balance"
      )
      .innerJoin("wt.item", "i") // join به جدول Items
      .where('"wt"."StoreId" = :storeId', { storeId })
      .setParameters({
        inOperation: WarehouseOperations.In,
        outOperation: WarehouseOperations.Out,
      })
      .groupBy('"wt"."ItemId"')
      .addGroupBy('"i"."Code"')
      .addGroupBy('"i"."Name"')
      .getRawMany();

    return result;
  }


}
