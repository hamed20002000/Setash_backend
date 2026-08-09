import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../base.repository';
import { Repository } from 'typeorm';
import { Teachers } from 'src/domain/entities/Teachers';
import { Courses } from 'src/domain/entities/Courses';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { Personnels } from 'src/domain/entities/Personnels';

@Injectable()
export class CourseParticipantRepository extends BaseRepository<CourseParticipants> {
  constructor(@InjectRepository(CourseParticipants) repository: Repository<CourseParticipants>) {
    super(repository);
  }
  async getQualifiedParticipants(courseId: number): Promise<Personnels[]> {
    return await this.repository.manager
      .getRepository(Personnels)
      .createQueryBuilder("p")
      .innerJoin("p.courseParticipants", "cp")
      .innerJoin("cp.courseDateTime", "cdt")
      .innerJoin("cdt.course", "c")
      .where("c.id = :courseId", { courseId })
      .andWhere("cp.isParticipated = true")
      .groupBy("p.id")
      .having("COUNT(cp.id) >= 1")
      .getMany();
  }
}
