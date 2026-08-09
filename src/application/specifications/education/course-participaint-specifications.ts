import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { CourseParticipants } from 'src/domain/entities/CourseParticipants';
import { Courses } from 'src/domain/entities/Courses';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CourseParticipantByIdSpecification extends Specification<CourseParticipants> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CourseParticipants): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof CourseParticipants, any>> {
    return { id: this.id };
  }
}

export class CourseParticipantByCourseIdSpecification extends Specification<CourseParticipants> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CourseParticipants): boolean {
    return entity.courseDateTime.course.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof CourseParticipants, any>> {
    return { courseDateTime: { course: { id: this.id } } };
  }
}










