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
@Injectable()
export class WarehouseRepository extends BaseRepository<Warehouses> {
  constructor(@InjectRepository(Warehouses) repository: Repository<Warehouses>,
    @InjectTypeOrmRepository(WarehouseTransactions) private readonly warehouseTransactionsRepository: Repository<WarehouseTransactions>
  ) {
    super(repository);
  }
  async getItemBalances(warehouseId: number,itemId: number) {
    const result = await this.warehouseTransactionsRepository
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
      .where('"wt"."WarehouseId" = :warehouseId', { warehouseId })
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

  async getWarehouseAllItemsBalances(warehouseId: number) {
    const result = await this.warehouseTransactionsRepository
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
      .where('"wt"."WarehouseId" = :warehouseId', { warehouseId })
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
