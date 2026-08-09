import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Leaves } from 'src/domain/entities/Leaves';
import { LeavesRepository } from 'src/infrastructure/repositories/hr/leaves.repository';
import { LeaveDaysDto } from 'src/presentation/dtos/hr/leaves-dto';
import { Teachers } from 'src/domain/entities/Teachers';
import { TeacherRepository } from 'src/infrastructure/repositories/education/teacher.repository';

@Injectable()
export class TeacherService extends BaseService<Teachers> {
  constructor(

    private readonly techertRepository: TeacherRepository,
  ) {
    super(techertRepository);
  }

}