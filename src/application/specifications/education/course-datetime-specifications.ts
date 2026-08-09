import { CourseDateTimes } from 'src/domain/entities/CourseDateTimes';
import { Courses } from 'src/domain/entities/Courses';
import { DriverVehicles } from 'src/domain/entities/DriverVehicles';
import { Leaves } from 'src/domain/entities/Leaves';
import { Roles } from 'src/domain/entities/Roles';
import { SystemOperations } from 'src/domain/entities/SystemOperations';
import { Workhouses } from 'src/domain/entities/Workhouses';
import { Specification } from 'src/domain/specifications/base.specification';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { In } from 'typeorm/find-options/operator/In';
export class CourseDateTimeByIdSpecification extends Specification<CourseDateTimes> {
  constructor(
    private readonly id: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CourseDateTimes): boolean {
    return entity.id === this.id;
  }

  toWhereClause(): Partial<Record<keyof CourseDateTimes, any>> {
    return { id: this.id };
  }
}

export class CourseDateTimeByCourseIdSpecification extends Specification<CourseDateTimes> {
  constructor(
    private readonly courseId: number,
  ) {
    super();
  }

  isSatisfiedBy(entity: CourseDateTimes): boolean {
    return entity.course.id === this.courseId;
  }

  toWhereClause(): Partial<Record<keyof CourseDateTimes, any>> {
    return { course: { id: this.courseId } };
  }
}










