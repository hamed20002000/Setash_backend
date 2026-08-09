import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { CarWarehouses } from 'src/domain/entities/CarWarehouses';
import { ConsignedCars } from 'src/domain/entities/ConsignedCars';
import { CarWarehouseDetails } from 'src/domain/entities/CarWarehouseDetails';

@Injectable()
export class ConsignedCarRepository extends BaseRepository<ConsignedCars> {
  constructor(@InjectRepository(ConsignedCars) repository: Repository<ConsignedCars>) {
    super(repository);
  }

  async getCurrentCarForPersonnel(personnelId: number) {
    return await this.repository.findOne({
      where: {
        personnel: { id: personnelId },
        consigned: true,
      },
      relations: {
        carWarehouseDetail: {
          carWarehouse: true,
        },
      },
      order: {
        date: "DESC",
      },
    });
  }

  async getCarsConsignedToWorkhouse(workhouseId: number) {
    return await this.repository.manager
      .getRepository(ConsignedCars)
      .createQueryBuilder("cc")
      .leftJoinAndSelect("cc.carWarhouseDetail", "car")
      .leftJoinAndSelect("car.carWarehouse", "warehouse")
      .leftJoinAndSelect("cc.personnel", "p")
      .where("cc.WorkhouseId = :wid", { wid: workhouseId })
      .andWhere("cc.consigned = true")
      .getMany();
  }

  async getAllConsignedCars() {
    const operations = await this.repository.manager
      .getRepository(ConsignedCars)
      .createQueryBuilder('cc')
      // relations
      .leftJoinAndSelect('cc.personnel', 'personnel')
      .leftJoinAndSelect('cc.workhouse', 'workhouse')
      .leftJoinAndSelect('cc.carWarehouseDetail', 'cwd')
      .leftJoinAndSelect('cwd.carWarehouse', 'cw')
      .leftJoinAndSelect('cw.region', 'region')

      // فقط رکوردهای فعال
      .where('cc.recordStatus = :status', { status: 0 })

      // فقط آخرین وضعیت هر ماشین
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('MAX(cc2."Date")')
          .from('ConsignedCars', 'cc2')
          .where(
            'cc2."CarWarehouseDetailId" = cc."CarWarehouseDetailId"',
          )
          .getQuery();

        return 'cc."Date" = ' + subQuery;
      })

      // هنوز امانت است
      .andWhere('cc.consigned = true')

      .getMany();
    return operations;
  }

  async getAllAvailableCars() {
    const operations = await this.repository.manager
      .getRepository(ConsignedCars)
      .createQueryBuilder('cc')
      // relations
      .leftJoinAndSelect('cc.personnel', 'personnel')
      .leftJoinAndSelect('cc.workhouse', 'workhouse')
      .leftJoinAndSelect('cc.carWarehouseDetail', 'cwd')
      .leftJoinAndSelect('cwd.carWarehouse', 'cw')
      .leftJoinAndSelect('cw.region', 'region')

      // فقط رکوردهای فعال
      .where('cc.recordStatus = :status', { status: 0 })

      // فقط آخرین وضعیت هر ماشین
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('MAX(cc2."Date")')
          .from('ConsignedCars', 'cc2')
          .where(
            'cc2."CarWarehouseDetailId" = cc."CarWarehouseDetailId"',
          )
          .getQuery();

        return 'cc."Date" = ' + subQuery;
      })

      // هنوز امانت است
      .andWhere('cc.consigned = false')
      .andWhere('cwd.available = true')
      .getMany();

    const neverConsignedCars = await this.repository.manager
      .getRepository(CarWarehouseDetails)
      .createQueryBuilder('cwd')
      .leftJoinAndSelect('cwd.carWarehouse', 'cw')
      .leftJoinAndSelect('cw.region', 'region')
      .leftJoin('cwd.consignedCars', 'cc', 'cc.recordStatus = :status', {
        status: 0,
      })
      .where('cwd.recordStatus = :status', { status: 0 })
      .andWhere('cwd.available = true')
      .andWhere('cc.id IS NULL')
      .getMany();

    const mappedNeverConsignedCars = neverConsignedCars.map(
      (carWarehouseDetail) =>
        ({
          recordStatus: 0,
          consigned: false,
          carWarehouseDetail,
        }) as ConsignedCars,
    );

    return [...operations, ...mappedNeverConsignedCars];
  }
}
