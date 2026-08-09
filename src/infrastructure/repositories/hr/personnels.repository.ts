import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Providers } from 'src/domain/entities/Providers';
import { Positions } from 'src/domain/entities/Positions';
import { Personnels } from 'src/domain/entities/Personnels';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { PersonnelSalary } from 'src/domain/entities/PersonnelSalary';
import { PersonnelWorkPlaces } from 'src/domain/entities/PersonnelWorkPlaces';

@Injectable()
export class PersonnelsRepository extends BaseRepository<Personnels> {
  constructor(@InjectRepository(Personnels) repository: Repository<Personnels>) {
    super(repository);
  }

  async delete(id: number): Promise<void> {
    await this.repository.manager.transaction(async (manager) => {
      const workPlaceCount = await manager
        .getRepository(PersonnelWorkPlaces)
        .createQueryBuilder('personnelWorkPlace')
        .where(`personnelWorkPlace."PersonnelId" = :id`, { id })
        .getCount();

      if (workPlaceCount === 0) {
        await manager
          .createQueryBuilder()
          .delete()
          .from(PersonnelSalary)
          .where(`"PersonnelId" = :id`, { id })
          .execute();
      }

      await manager.getRepository(Personnels).delete(id);
    });
  }

  async getPersonnelCourses(personnelId: number) {
    return await this.repository.manager
      .getRepository(CourseParticipants)
      .createQueryBuilder("cp")
      .leftJoin("cp.courseDateTime", "cdt")
      .leftJoin("cdt.course", "c")
      .where("cp.personnel.id = :personnelId", { personnelId })
      .andWhere("cp.isParticipated = true")
      .select("c.id", "courseId")
      .addSelect("c.title", "courseTitle")
      .addSelect("c.Hours", "courseHours")
      .addSelect("SUM(EXTRACT(EPOCH FROM (cdt.endDateTime - cdt.startDateTime)) / 3600)", "totalHours")
      .groupBy("c.id")
      .addGroupBy("c.title")
      .getRawMany();
  }
  async getPersonnelsWithoutActiveWorkplace() {
    return await this.repository.manager
      .getRepository(Personnels)
      .createQueryBuilder("p")
      // Join کردن position
      .leftJoinAndSelect("p.position", "pos")
      // Join کردن workplace
      .leftJoin(
        "p.personnelWorkPlaces",
        "wp",
        `"wp"."EndDate" IS NULL`
      )
      .where(`"wp"."Id" IS NULL`)
      .getMany();
  }
}
