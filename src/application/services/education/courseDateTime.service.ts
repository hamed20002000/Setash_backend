import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeavesRepository } from 'src/infrastructure/repositories/hr/leaves.repository';
import { LeaveDaysDto } from 'src/presentation/dtos/hr/leaves-dto';
import { Teachers } from 'src/domain/entities/Teachers';
import { TeacherRepository } from 'src/infrastructure/repositories/education/teacher.repository';
import { Courses } from 'src/domain/entities/Courses';
import { CourseRepository } from 'src/infrastructure/repositories/education/course.repository';
import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { CourseDateTimeRepository } from 'src/infrastructure/repositories/education/courseDateTime.repository';

@Injectable()
export class CourseDateTimeService extends BaseService<CourseDateTimes> {
  constructor(

    private readonly courseDateTimeRepository: CourseDateTimeRepository,
  ) {
    super(courseDateTimeRepository);
  }

}