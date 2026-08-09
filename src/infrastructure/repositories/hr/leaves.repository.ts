import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { Positions } from 'src/domain/entities/Positions';
import { Personnels } from 'src/domain/entities/Personnels';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeaveHistories } from 'src/domain/entities/LeaveHistories';
import { LeaveDaysDto } from 'src/presentation/dtos/hr/leaves-dto';
import { leaveType } from 'src/domain/enums/leaveType.enum';
import { leaveStatus } from 'src/domain/enums/leaveStatus.enum';

@Injectable()
export class LeavesRepository extends BaseRepository<Leaves> {
  constructor(@InjectRepository(Leaves) repository: Repository<Leaves>, private readonly dataSource: DataSource) {
    super(repository);
  }

  async calculateLeaveDays(personnelId: number): Promise<LeaveDaysDto> {
    const result = await this.dataSource.transaction(async (manager: EntityManager) => {
      const personel = await manager.getRepository(Personnels).findOne({ where: { id: personnelId } });
      if (!personel || !personel.workStartDate) {
        return { official: 0, remaining: 0 } as LeaveDaysDto;
      }
      var leavesDate = await manager.getRepository(Leaves).find({ where: { personnel: { id: personnelId }, type: leaveType.yillik ,status:leaveStatus.Approved} });
      var sumOfLeaveDays = 0;
      leavesDate.forEach(leave => {
        // Process each leave if needed
        sumOfLeaveDays += Math.ceil((leave.endDate.getTime() - leave.startDate.getTime()) / (1000 * 3600 * 24));
      }

      );

      var age = personel.birthDate ? new Date().getFullYear() - new Date(personel.birthDate).getFullYear() : 0;
      


      // Ensure we subtract numeric timestamps (milliseconds)
      const workStartMs = new Date(personel.workStartDate).getTime();
      const nowMs = Date.now();
      // time worked in milliseconds (ensure non-negative) and in whole days
      const timeOfWorkMs = Math.max(0, nowMs - workStartMs);
      const daysOfWork = Math.floor(timeOfWorkMs / (1000 * 60 * 60 * 24));

      var officialLeaves = 0;
      /*  if (daysOfWork < 365) { */
      // less than 1 year -> no entitlement
      {
        // helper: full calendar years between start and end (handles Feb 29 correctly)
        const fullYearsBetween = (startDate: Date, endDate: Date): number => {
          let years = endDate.getFullYear() - startDate.getFullYear();
          const anniversary = new Date(startDate);
          anniversary.setFullYear(startDate.getFullYear() + years);
          if (endDate < anniversary) years--;
          return Math.max(0, years);
        };

        const start = new Date(personel.workStartDate);
        const now = new Date();
        // use function-scoped var so later code can read yearsOfWork
        var yearsOfWork = fullYearsBetween(start, now);
        if (age < 18) {
          officialLeaves = 20;
          var remainingLeaves = officialLeaves - sumOfLeaveDays;
          return { official: officialLeaves, remaining: Math.max(0, remainingLeaves), age, yearOfWork: yearsOfWork } as LeaveDaysDto;
        } else if (age >= 50 && yearsOfWork <= 15) {
          officialLeaves = 20;
          var remainingLeaves = officialLeaves - sumOfLeaveDays;
          return { official: officialLeaves, remaining: Math.max(0, remainingLeaves), age, yearOfWork: yearsOfWork } as LeaveDaysDto;
        } else if (age >= 50 && yearsOfWork > 15) {
          officialLeaves = 26;
          var remainingLeaves = officialLeaves - sumOfLeaveDays;
          return { official: officialLeaves, remaining: Math.max(0, remainingLeaves), age, yearOfWork: yearsOfWork } as LeaveDaysDto;
        }

        if (yearsOfWork < 1) {
          // کمتر از 1 سال -> بدون حق مرخصی
          officialLeaves = 0;
        } else if (yearsOfWork >= 1 && yearsOfWork <= 5) {
          // بین 1 تا کمتر از 5 سال -> حق 1 روز (برحسب منطق شما)
          officialLeaves = 14;
        } else if (yearsOfWork > 5 && yearsOfWork < 15) {
          // بین 5 تا کمتر از 10 سال -> حق 18 روز (برحسب منطق شما)
          officialLeaves = 20;
        } else if (yearsOfWork >= 15) {
          // 15 سال و بیشتر -> حق 24 روز (برحسب منطق شما)
          officialLeaves = 26;
        }
      }

      var remainingLeaves = officialLeaves - sumOfLeaveDays;

      const diffYMD = (startDate: Date, endDate: Date) => {
        if (endDate < startDate) {
          return { years: 0, months: 0, days: 0 };
        }

        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        let days = endDate.getDate() - startDate.getDate();

        // اصلاح روز
        if (days < 0) {
          const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
          days += prevMonth.getDate();
          months--;
        }

        // اصلاح ماه
        if (months < 0) {
          months += 12;
          years--;
        }

        return {
          years: Math.max(0, years),
          months: Math.max(0, months),
          days: Math.max(0, days),
        };
      };
      
var personnelWorkYearsAndMonths = diffYMD(new Date(personel.workStartDate), new Date());
      return { official: officialLeaves, remaining: Math.max(0, remainingLeaves), age, yearOfWork: yearsOfWork,personnelWorkYearsAndMonths } as LeaveDaysDto;


      //}
      /* return { official: 0, remaining: 0, age: 0 } as LeaveDaysDto; */

    });
    return result;
  }
}